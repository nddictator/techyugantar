---
title: "Building Multi-Tenant SaaS Architectures with Django & PostgreSQL"
excerpt: "Schema-per-tenant vs. row-level isolation — we break down the real trade-offs, connection pooling pitfalls, and the exact migration strategy we used to serve 10,000+ tenants without downtime."
author: "Tech Yugantar — Engineering Team"
date: "2025-11-18"
tags: ["django"]
image: "/images/blog/blog-django-multitenant.jpg"
---

Every multi-tenant Django project eventually asks the same question: **shared schema with a `tenant_id` column, or a separate PostgreSQL schema per tenant?** Both are legitimate, and the right answer depends less on "best practice" and more on your isolation and scaling requirements.

## Row-level isolation

A single schema with a `tenant_id` foreign key on every table is the simplest to reason about. Migrations run once, connection pooling is trivial, and cross-tenant analytics are a single query away. The cost shows up later: every queryset needs a tenant filter, and a missing `.filter(tenant=request.tenant)` is a data leak, not a bug report. We enforce this with a custom manager and a middleware-set thread-local tenant, plus a CI check that flags any raw `Model.objects` usage outside the manager.

## Schema-per-tenant

Tools like `django-tenants` give each tenant a real PostgreSQL schema, switched via `search_path` per request. Isolation becomes a database guarantee instead of an application convention — a bug can't leak tenant B's rows into tenant A's response, because the connection literally isn't looking at tenant B's tables. The trade-off is operational: migrations run once per schema, so 500 tenants means 500 migration runs, and connection pooling tools like PgBouncer need transaction-mode pooling configured carefully since `search_path` is a per-session setting.

## What we actually run

For most client projects under a few hundred tenants, row-level isolation with disciplined middleware and a linter rule wins on operational simplicity. Past that scale — or when a client's compliance requirements demand hard data separation — we move to schema-per-tenant and accept the migration overhead as the price of a stronger guarantee.

```python
class TenantQuerySet(models.QuerySet):
    def for_tenant(self, tenant):
        return self.filter(tenant=tenant)

class TenantManager(models.Manager):
    def get_queryset(self):
        return TenantQuerySet(self.model, using=self._db)
```

## Zero-downtime migrations across tenants

Whichever model you pick, the migration story needs to handle partial failure. We run schema migrations tenant-by-tenant behind a feature flag, so a bad migration on tenant #340 doesn't block the other 900 — and we always add columns as nullable first, backfill in a background job, then tighten the constraint in a follow-up migration once the backfill is confirmed complete.

Neither approach is "correct" in the abstract. The right one is whichever failure mode you can live with: a disciplined-code failure in row-level isolation, or an operational-complexity failure in schema-per-tenant.
