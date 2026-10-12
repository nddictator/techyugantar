---
title: "Django REST Framework to FastAPI: A Migration Playbook"
excerpt: "We migrated a 200-endpoint DRF API to FastAPI over 8 weeks — zero breaking changes, 3× throughput improvement. This is the exact branch strategy, Pydantic schema mapping, and auth refactor we used."
author: "Tech Yugantar — Backend Team"
date: "2025-09-08"
tags: ["django"]
image: "/images/blog/blog-fastapi-migration.jpg"
---

DRF is mature, batteries-included, and synchronous by default. FastAPI is async-first and considerably faster under I/O-bound load. The reason most teams consider the migration isn't "FastAPI is newer" — it's a specific throughput ceiling they've hit with sync workers under concurrent load.

This is the playbook we used to move a 200-endpoint DRF API to FastAPI over eight weeks without a single breaking change for the mobile and web clients that depended on it.

## First, make sure you actually need to migrate

A migration is expensive, and a surprising number of "DRF is slow" problems aren't DRF problems. Before proposing the move, we spent a week ruling out the cheaper fixes:

- **N+1 queries.** A list endpoint doing one query per row is slow in any framework. `select_related`, `prefetch_related`, and Django Debug Toolbar or `django-silk` fix more "performance problems" than any rewrite.
- **Worker configuration.** A Gunicorn deployment with too few sync workers will queue requests under load. More workers, or `gthread` workers for I/O-heavy endpoints, can buy a lot of headroom.
- **Caching.** Hot read endpoints that return the same data to every user belong behind a cache, not a faster framework.
- **Async Django.** Modern Django supports async views under ASGI. For a handful of endpoints that fan out to external APIs, that may be enough on its own.

We went ahead because the API was dominated by endpoints that called two or three external services per request, the client needed far more concurrency per server, and the team wanted typed request and response schemas with auto-generated OpenAPI docs anyway. If your bottleneck is the database or CPU, FastAPI won't save you.

## Strangle, don't rewrite

A full rewrite of a 200-endpoint API is how migrations die halfway through. We used the strangler-fig pattern: FastAPI and Django run side by side behind the same reverse proxy, and endpoints are routed over one at a time as each is verified.

```nginx
# Endpoints that have moved to FastAPI
location ~ ^/api/v1/(orders|catalog|search)/ {
    proxy_pass http://fastapi_upstream;
}

# Everything else still goes to Django
location /api/ {
    proxy_pass http://django_upstream;
}
```

Moving an endpoint is a one-line proxy change, and so is moving it back. That reversibility is what made it safe to ship weekly.

Django kept owning the database schema and migrations throughout. FastAPI talks to the same PostgreSQL database through SQLAlchemy Core — not the SQLAlchemy ORM, to avoid two systems both believing they own the schema. For read-heavy endpoints that weren't worth a full rewrite yet, FastAPI called Django's ORM through `sync_to_async`, which runs the call in a thread pool. That's a useful bridge, but keep it temporary: every `sync_to_async` call occupies a thread, and under heavy load you've just rebuilt the sync bottleneck with extra steps.

## Contract tests before the first endpoint moves

"Zero breaking changes" isn't a promise you can keep by being careful. You keep it by testing. Before migrating anything, we recorded real responses from the DRF API for every endpoint — successful responses, validation errors, 404s, permission errors — and stored them as golden files. Each migrated FastAPI endpoint had to reproduce them exactly.

```python
@pytest.mark.parametrize("case", load_golden_cases("orders"))
def test_orders_contract(case, fastapi_client):
    response = fastapi_client.request(case.method, case.path, json=case.body, headers=case.headers)
    assert response.status_code == case.expected_status
    assert response.json() == case.expected_json
```

These tests caught differences we would never have spotted by eye:

- **Decimal formatting.** DRF renders `DecimalField` as a string by default (`"149.00"`). Clients were parsing strings, so the Pydantic models had to emit the same format.
- **Datetime formatting.** Timezone suffixes and fractional seconds have to match what the clients expect.
- **Error shape.** DRF returns `{"detail": "..."}` for most errors and a field-to-messages mapping for validation errors. FastAPI's default 422 body looks different, so we added custom exception handlers to return DRF-shaped errors with the same status codes.
- **Pagination.** The `count`, `next`, `previous`, `results` envelope from DRF's pagination class had to be reproduced exactly, including absolute URLs in `next`.

## Serializers become Pydantic models, mostly mechanically

DRF serializers and Pydantic models solve the same problem — validate input, shape output — with different syntax. Most of the migration is mechanical:

```python
# DRF
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id", "status", "total"]

# FastAPI
class OrderOut(BaseModel):
    id: int
    status: str
    total: Decimal
    model_config = ConfigDict(from_attributes=True)
```

The parts that aren't mechanical: DRF's `SerializerMethodField` and nested writable serializers don't map one-to-one. Those became explicit computed fields or `field_validator`s, and separate read and write models — `OrderCreate`, `OrderUpdate`, `OrderOut` — instead of one serializer doing three jobs. More verbose, considerably easier to reason about once written, and the generated OpenAPI docs became genuinely useful to the frontend team.

## Auth is the riskiest part

We kept Django's auth as the single source of truth and had FastAPI validate the same credentials, rather than standing up a parallel auth system. In practice that meant a FastAPI dependency that validates the existing JWT (same signing key, same claims, same expiry rules) and loads the user from the shared `auth_user` table:

```python
async def current_user(authorization: str = Header(...)) -> User:
    token = authorization.removeprefix("Bearer ").strip()
    try:
        claims = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user = await users.get_active(claims["user_id"])
    if user is None:
        raise HTTPException(status_code=401, detail="User not found or inactive")
    return user
```

Permissions got the same treatment: every DRF permission class was ported to a dependency, and every endpoint's contract tests included unauthenticated, wrong-user, and wrong-role cases. This is the step we'd tell any team to over-invest in testing. An auth regression during a migration is the failure that erodes trust in the whole project, even if everything else goes smoothly.

## Make the async actually async

Rewriting a view as `async def` doesn't make it faster if everything inside it still blocks. The wins came from:

- **An async database driver** (`asyncpg` through SQLAlchemy's async engine) so queries don't block the event loop.
- **An async HTTP client** (`httpx.AsyncClient`, shared across requests) instead of `requests`.
- **Concurrency where calls are independent.** Three external calls that used to run one after another now run together:

```python
async def order_summary(order_id: int):
    order, shipping, payment = await asyncio.gather(
        orders.get(order_id),
        shipping_api.status(order_id),
        payments_api.status(order_id),
    )
    return OrderSummary.build(order, shipping, payment)
```

One blocking call inside an async endpoint — a sync SDK, a `time.sleep`, a CPU-heavy loop — stalls every other request on that worker. We added a lint rule against importing `requests` in the FastAPI codebase and pushed CPU-heavy work to background workers.

## Roll out gradually, with an exit

For the highest-traffic endpoints, we didn't flip routing all at once. The proxy sent a small percentage of traffic to FastAPI first, then more as error rates and latency held steady, with dashboards comparing both implementations side by side. Rolling back was always the same one-line change.

## What actually got faster

The throughput gain came almost entirely from I/O-bound endpoints — anything making multiple external API calls or database queries that could now run concurrently instead of blocking a sync worker. CPU-bound endpoints (heavy serialization, report generation) saw no meaningful change, which matches the theory: async doesn't make Python compute faster, it makes waiting cheaper.

## The playbook, condensed

1. Rule out N+1 queries, worker tuning and caching first.
2. Put both apps behind one proxy and move endpoints one at a time.
3. Keep one owner for the database schema.
4. Record golden responses and make every migrated endpoint pass them.
5. Reuse the existing auth; test it harder than anything else.
6. Go fully async inside the endpoint, or don't bother.
7. Roll out by traffic percentage, with rollback as a one-line change.

Eight weeks, zero downtime, and — critically — nobody outside the backend team noticed the migration happened until we told them. That's the real success metric for this kind of work.
