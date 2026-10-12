---
title: "Building Multi-Tenant SaaS Architectures with Django & PostgreSQL"
excerpt: "Schema-per-tenant vs. row-level isolation — we break down the real trade-offs, connection pooling pitfalls, and the exact migration strategy we used to serve 10,000+ tenants without downtime."
author: "Tech Yugantar — Engineering Team"
date: "2025-11-18"
tags: ["django"]
image: "/images/blog/blog-django-multitenant.jpg"
---

Every multi-tenant Django project eventually asks the same question: **shared schema with a `tenant_id` column, or a separate PostgreSQL schema per tenant?** Both are legitimate, and the right answer depends less on "best practice" and more on your isolation requirements, your tenant count, and which failure mode your team is better equipped to prevent.

This is how we think about the decision, the code we use for each approach, and the operational details that only show up once real customers are on the system.

## Step zero: resolve the tenant once, early

Whatever isolation model you choose, every request needs to answer "which tenant is this?" exactly once, as early as possible, and make the answer available everywhere downstream. Most SaaS products we build use a subdomain (`acme.app.example.com`); some use a custom domain or a header for API clients.

We resolve it in middleware and store it in a `contextvars.ContextVar` rather than a thread-local. Context variables are isolated per request even under async views and ASGI servers, where a thread-local can leak between concurrent requests sharing a thread.

```python
# tenancy/context.py
from contextvars import ContextVar

current_tenant: ContextVar["Tenant | None"] = ContextVar("current_tenant", default=None)

# tenancy/middleware.py
class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host().split(":")[0]
        tenant = Tenant.objects.filter(domain=host, is_active=True).first()
        if tenant is None:
            raise Http404("Unknown workspace")
        token = current_tenant.set(tenant)
        request.tenant = tenant
        try:
            return self.get_response(request)
        finally:
            current_tenant.reset(token)
```

Cache the domain-to-tenant lookup — it runs on every request — and invalidate it when a tenant's domain changes.

## Option 1: Row-level isolation

A single schema with a `tenant` foreign key on every tenant-owned table is the simplest to reason about. Migrations run once, connection pooling is trivial, and cross-tenant analytics for your own admin dashboards is a single query.

The cost shows up later: every queryset needs a tenant filter, and a missing `.filter(tenant=request.tenant)` is a data leak, not a bug report. So we make the safe path the default path with a manager that scopes automatically:

```python
class TenantManager(models.Manager):
    def get_queryset(self):
        tenant = current_tenant.get()
        qs = super().get_queryset()
        if tenant is None:
            # Fail closed: no tenant in context means no rows.
            return qs.none()
        return qs.filter(tenant=tenant)

class TenantModel(models.Model):
    tenant = models.ForeignKey("tenancy.Tenant", on_delete=models.CASCADE, db_index=True)

    objects = TenantManager()       # scoped — used everywhere in app code
    all_tenants = models.Manager()  # unscoped — explicit, greppable, admin only

    class Meta:
        abstract = True
```

The important design choice is **fail closed**. If code runs outside a request — a management command, a Celery task that forgot to set the tenant — the scoped manager returns nothing instead of everything. An empty page is a bug; another customer's data is an incident.

A few more rules we enforce:

- **Unique constraints include the tenant.** An invoice number is unique per tenant, not globally: `UniqueConstraint(fields=["tenant", "number"], name="uniq_invoice_number_per_tenant")`.
- **Composite indexes start with `tenant_id`.** Almost every query filters on it first.
- **A CI check** greps for `all_tenants` and raw SQL outside an allow-listed set of admin modules.

## Option 2: Schema-per-tenant

Tools like `django-tenants` give each tenant a real PostgreSQL schema, switched via `search_path` per request. Isolation becomes a database guarantee instead of an application convention: a forgotten filter can't leak tenant B's rows into tenant A's response, because the connection literally isn't looking at tenant B's tables.

The trade-offs are operational:

- **Migrations run once per schema.** 500 tenants means 500 migration runs. A slow migration multiplied by every tenant turns a two-minute deploy into an hour.
- **Connection pooling needs care.** `search_path` is a session-level setting. With PgBouncer in transaction-pooling mode, the next transaction on the same server connection may belong to a different tenant, so the schema must be set at the start of every transaction (`SET LOCAL search_path` inside the transaction), never assumed to persist.
- **Catalog bloat.** Thousands of schemas each with dozens of tables means hundreds of thousands of relations in PostgreSQL's system catalogs. Backups, `pg_dump`, and some monitoring queries slow down noticeably at that scale.

## Option 3: Row-Level Security as a safety net

There's a middle path we increasingly reach for: keep the shared schema, but have PostgreSQL itself enforce the tenant filter with Row-Level Security (RLS). Each request sets a session variable; a policy on every tenant table compares against it.

```sql
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON invoices
  USING (tenant_id = current_setting('app.tenant_id')::bigint);
```

And in Django, at the start of each request's transaction:

```python
with connection.cursor() as cursor:
    cursor.execute("SELECT set_config('app.tenant_id', %s, true)", [str(tenant.id)])
```

The third argument `true` makes the setting local to the current transaction, which plays well with transaction-mode pooling. Now even raw SQL that forgets a `WHERE tenant_id = ...` clause can't read another tenant's rows. Two caveats: the application's database role must not be the table owner or a superuser (both bypass RLS by default), and you need `ATOMIC_REQUESTS` or explicit transactions so the setting is always present.

RLS doesn't replace the scoped manager — it backs it up. Defence in depth is cheap here.

## Everything that isn't the database

Tenant isolation leaks through more than querysets. The checklist we run on every project:

- **Background tasks.** Pass `tenant_id` explicitly to every Celery task and set the context at the top of the task. Never rely on whatever happened to be in context when the task was enqueued.
- **Cache keys.** Prefix every key with the tenant: `f"t{tenant.id}:dashboard:stats"`. A shared cache key is a shared data leak.
- **File storage.** Store uploads under `tenants/<id>/...` and generate signed URLs that check the tenant on access.
- **Search indexes.** Elasticsearch or Postgres full-text queries need the tenant filter too.
- **Logs and error reports.** Tag every log line and Sentry event with the tenant ID. When something breaks for one customer, you want to find it in seconds.

## What we actually run

For most client projects under a few hundred tenants, row-level isolation with a fail-closed manager, tenant-aware constraints, and RLS as a safety net wins on operational simplicity. Past that scale — or when a client's compliance requirements demand hard data separation, or a few very large tenants need independent backup and restore — we move those tenants to schema-per-tenant or even a dedicated database, and accept the migration overhead as the price of a stronger guarantee.

Hybrids are normal. Plenty of mature SaaS products keep the long tail of small customers in a shared schema and give enterprise customers their own.

## Zero-downtime migrations across tenants

Whichever model you pick, the migration story has to handle partial failure.

1. **Expand, then contract.** Add new columns as nullable (or with a database-level default), deploy code that writes to both old and new shapes, backfill in a background job, and only then tighten the constraint in a follow-up migration once the backfill is confirmed complete.
2. **Batch the backfill.** Update in chunks of a few thousand rows with a short pause between batches so you never hold long locks on a busy table.
3. **Tenant-by-tenant for schemas.** We run schema migrations tenant-by-tenant behind a feature flag, so a bad migration on tenant #340 doesn't block the other 900. A migration status table records which schemas are on which version.
4. **Create indexes concurrently.** `AddIndexConcurrently` from `django.contrib.postgres.operations` avoids locking writes while the index builds — it just has to run in a non-atomic migration.

## Test for leaks, not just features

Our test suite has a dedicated class of tests whose only job is to try to break isolation: create two tenants with overlapping data, authenticate as tenant A, and assert that every list endpoint, detail endpoint, export, and search returns nothing belonging to tenant B. These tests are boring to write and have caught real bugs every single time a new endpoint was added without them.

Neither isolation model is "correct" in the abstract. The right one is whichever failure mode you can live with — a disciplined-code failure in row-level isolation, or an operational-complexity failure in schema-per-tenant — plus enough automated guard rails that the failure never reaches a customer.
