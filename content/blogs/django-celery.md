---
title: "Django Celery + Redis: Architecting Reliable Background Job Pipelines"
excerpt: "Task retries, dead-letter queues, ETA scheduling, and chord/chord-error handling — the patterns that keep our async pipelines processing millions of jobs without silent failures."
author: "Tech Yugantar — Backend Team"
date: "2025-06-27"
tags: ["django"]
image: "/images/blog/blog-django-celery.jpg"
---

Celery is easy to get running and easy to get quietly wrong. A task that fails silently, or retries forever against a permanently broken dependency, doesn't show up as an error until someone notices the downstream effect days later — a customer who never got their invoice, a webhook that was never processed, a report that stopped updating last Tuesday.

This post is the checklist we now apply to every Django project that uses Celery with Redis. None of it is exotic. All of it came from an incident.

## Enqueue only after the transaction commits

The first bug almost every team hits: a view creates an `Order`, then calls `process_order.delay(order.id)`. The worker picks the task up in a few milliseconds — before the request's database transaction has committed — and fails with `Order.DoesNotExist`. It works fine on your laptop and fails intermittently in production, which is the worst kind of bug.

Django has a built-in fix. Defer the enqueue until the commit actually happens:

```python
from django.db import transaction

def create_order(request):
    order = Order.objects.create(user=request.user, total=cart.total)
    transaction.on_commit(lambda: process_order.delay(order.id))
    return redirect("order-detail", pk=order.pk)
```

If the transaction rolls back, the task is never sent. If it commits, the row is guaranteed to exist when the worker reads it. We treat a bare `.delay()` inside a view as a code-review smell.

## Retries need a ceiling and a reason

The default Celery footgun is a task decorated with `autoretry_for` and no sensible limit, retrying an operation that will never succeed — a malformed payload, say — quietly consuming worker capacity. Every task in our pipelines does three things:

- Sets an explicit `max_retries`.
- Uses exponential backoff with jitter, so a struggling downstream service isn't hammered by every worker retrying at the same instant.
- Distinguishes **retryable** failures (a timeout, a 503, a dropped connection) from **terminal** ones (a validation error, a 404 for a deleted record), so we're not retrying something that is certain to fail again.

```python
@app.task(
    bind=True,
    max_retries=5,
    retry_backoff=True,      # 1s, 2s, 4s, 8s ...
    retry_backoff_max=600,   # never wait more than 10 minutes
    retry_jitter=True,
    acks_late=True,
)
def send_notification(self, user_id, payload):
    try:
        client.send(user_id, payload)
    except TransientAPIError as exc:
        raise self.retry(exc=exc)
    except ValidationError as exc:
        # Terminal: record it for a human and stop.
        record_dead_letter(self.name, self.request.id, payload, reason=str(exc))
        return {"status": "dead_lettered"}
```

Note the terminal branch returns an explicit result rather than silently falling through. When you look at the task in Flower or your logs, "dead-lettered" and "succeeded" should never look the same.

## Make every task idempotent

With `acks_late=True`, a task is acknowledged only after it finishes, so a worker that crashes mid-task causes the message to be redelivered. That's what you want for reliability — but it means **every task can run more than once**. Network retries, deploys that restart workers, and Redis visibility timeouts all produce duplicates too.

So we design tasks to be safe to repeat:

- Charge a card or send an email only after checking a record that says it hasn't been done yet, inside the same transaction that marks it done.
- Use a unique idempotency key for external APIs that support one (most payment gateways do).
- For cheap de-duplication, take a short-lived lock in Redis with `SET key value NX EX 300` before doing the work.

```python
@app.task(bind=True, acks_late=True)
def charge_invoice(self, invoice_id):
    with transaction.atomic():
        invoice = Invoice.objects.select_for_update().get(pk=invoice_id)
        if invoice.status == Invoice.PAID:
            return "already paid"
        gateway.charge(invoice.amount, idempotency_key=f"inv-{invoice.pk}")
        invoice.status = Invoice.PAID
        invoice.save(update_fields=["status"])
```

The `select_for_update()` row lock means two copies of the same task can't both pass the "already paid" check.

## Dead-letter queues, not silent drops

A task that exhausts its retries and just stops, with no record anywhere, is how a failed notification or an unprocessed payment webhook disappears without anyone noticing. Every pipeline we build routes exhausted-retry and terminal failures into a dead-letter table with:

- the task name and ID,
- the original arguments,
- the exception class and message,
- the number of attempts and a timestamp.

That table is visible in an internal admin view with a **Retry** button. "Silent failure" becomes "flagged for a human to look at", and once the root cause is fixed, replaying the failed jobs is one click instead of a one-off script.

A simple way to catch exhausted retries globally is Celery's `task_failure` signal, which fires once a task has failed for good:

```python
from celery.signals import task_failure

@task_failure.connect
def store_failure(sender=None, task_id=None, exception=None, args=None, kwargs=None, **_):
    DeadLetter.objects.create(
        task_name=sender.name,
        task_id=task_id,
        args=args,
        kwargs=kwargs,
        error=repr(exception),
    )
```

## Chords and the error case nobody handles

A `chord` — run N tasks in parallel, then a callback once they've all finished — is one of Celery's most useful primitives and also the one where error handling gets skipped most often. If any task in the chord's header fails, the callback never runs. Without an error handler, the pipeline just hangs waiting for a step that already gave up.

```python
from celery import chord

job = chord(
    (resize_image.s(image_id, size) for size in SIZES),
    publish_gallery.s(gallery_id),
)
job.apply_async(link_error=alert_gallery_failed.s(gallery_id))
```

Two things matter here. First, the error callback turns a partial failure into an explicit alert and a status change on the gallery, so the UI can say "processing failed" instead of spinning forever. Second, chords need a result backend to count completed header tasks — if you've disabled results globally to save Redis memory, enable them for the tasks that participate in chords.

## ETA scheduling at volume

For scheduled tasks — a reminder that should fire in exactly three days — Celery's `eta` and `countdown` parameters look like the obvious answer. At volume they have two problems with a Redis broker:

1. **The worker holds the message.** ETA tasks are fetched immediately and kept in worker memory until they're due, which inflates memory and the unacknowledged-message set.
2. **The visibility timeout.** Redis redelivers any unacknowledged message after `visibility_timeout` (one hour by default). A task scheduled further out than that can be delivered to a second worker and run twice.

Past a few hundred thousand scheduled jobs, we switch to a dedicated scheduler pattern: store the intent in a `ScheduledJob` table with a `run_at` column, and have a Celery Beat task that runs every minute, selects anything due in the next window, and enqueues it just-in-time.

```python
@app.task
def dispatch_due_jobs():
    now = timezone.now()
    due = (ScheduledJob.objects
           .select_for_update(skip_locked=True)
           .filter(run_at__lte=now, dispatched_at__isnull=True)[:500])
    with transaction.atomic():
        for job in due:
            app.send_task(job.task_name, kwargs=job.kwargs)
            job.dispatched_at = now
            job.save(update_fields=["dispatched_at"])
```

`skip_locked=True` lets several dispatchers run safely in parallel. Redis's working set stays small no matter how far in the future work is scheduled, and the schedule itself is queryable, editable and cancellable — which product teams always end up asking for.

## Separate queues for separate workloads

One slow task type should never starve a fast one. A PDF export that takes 40 seconds and a password-reset email that should take 200 milliseconds don't belong in the same queue. We route by workload:

```python
app.conf.task_routes = {
    "notifications.*": {"queue": "fast"},
    "reports.*": {"queue": "slow"},
    "media.*": {"queue": "media"},
}
```

Each queue gets its own worker pool with its own concurrency. For long-running queues we also set `worker_prefetch_multiplier = 1`, so a worker doesn't reserve a batch of slow tasks while its siblings sit idle.

## Time limits on everything

A task that hangs on a socket with no timeout holds a worker slot forever. Every task gets a `soft_time_limit`, which raises `SoftTimeLimitExceeded` so the task can clean up, and a hard `time_limit` a little higher as a backstop. Every outbound HTTP call inside a task gets its own explicit timeout too — the library default is often "wait forever".

## What we monitor

You can't fix what you can't see. The minimum we put on a dashboard for any Celery deployment:

- **Queue depth per queue** — alert when it grows steadily for more than a few minutes.
- **Task failure rate** by task name.
- **Dead-letter count** — any new entry pings the team channel.
- **Task runtime p95** — a sudden jump usually means a downstream dependency is degrading.

Flower is fine for ad-hoc inspection; for alerting we export the same numbers to whatever metrics stack the project already uses.

## The checklist

Before a Celery task ships, we ask:

1. Is it enqueued with `transaction.on_commit`?
2. Is it safe to run twice?
3. Does it have a retry ceiling, backoff, and a terminal-failure path?
4. Where does it go when it fails for good?
5. Does it have time limits, and do its network calls have timeouts?
6. Is it on the right queue?

None of these patterns are exotic — they're the difference between a pipeline that fails loudly enough to fix and one that fails quietly enough to become a production incident three weeks later.
