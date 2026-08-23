---
title: "Django Celery + Redis: Architecting Reliable Background Job Pipelines"
excerpt: "Task retries, dead-letter queues, ETA scheduling, and chord/chord-error handling — the patterns that keep our async pipelines processing millions of jobs without silent failures."
author: "Tech Yugantar — Backend Team"
date: "2025-06-27"
tags: ["django"]
image: "/images/blog/blog-django-celery.jpg"
---

Celery is easy to get running and easy to get quietly wrong — a task that fails silently, or retries forever against a permanently broken dependency, doesn't show up as an error until someone notices the downstream effect days later.

## Retries need a ceiling and a reason

The default Celery footgun is a task decorated with `autoretry_for` and no `max_retries`, retrying an operation that will never succeed — a malformed payload, say — indefinitely, quietly consuming worker capacity. Every task in our pipelines sets an explicit `max_retries`, uses exponential backoff (`retry_backoff=True`) to avoid hammering a struggling downstream service, and — critically — distinguishes retryable failures (a timeout, a 503) from terminal ones (a validation error) so we're not retrying something that's mathematically certain to fail again.

```python
@app.task(bind=True, max_retries=5, retry_backoff=True)
def send_notification(self, user_id, payload):
    try:
        client.send(user_id, payload)
    except TransientAPIError as exc:
        raise self.retry(exc=exc)
    except ValidationError:
        # terminal — do not retry, route to dead-letter instead
        dead_letter_queue.push(self.request.id, payload)
```

## Dead-letter queues, not silent drops

A task that exhausts its retries and just... stops, with no record anywhere, is how a failed notification or an unprocessed payment webhook disappears without anyone noticing. Every task pipeline we build routes exhausted-retry and terminal failures into a dead-letter table with the original payload, the failure reason, and a timestamp — visible in an internal dashboard, so "silent failure" becomes "flagged for a human to look at."

## Chords and the error case nobody handles

A `chord` — run N tasks in parallel, then a callback once they've all finished — is one of Celery's most useful primitives and also the one where error handling gets skipped most often. If any task in the chord's group fails, the callback simply never fires by default, and a pipeline can hang indefinitely waiting for a step that already gave up. We always attach a `link_error` to chord callbacks, so a partial failure surfaces as an explicit alert rather than a job that silently never completes.

## ETA scheduling at volume

For scheduled tasks — a reminder to fire in exactly 3 days — using Celery's `eta` parameter directly at high volume can bloat the broker's unacknowledged-message set. Past a few hundred thousand scheduled tasks, we move to a dedicated scheduler pattern: a periodic task that queries a `scheduled_jobs` table for anything due in the next window and enqueues it just-in-time, keeping Redis's working set small regardless of how far in the future work is scheduled.

None of these patterns are exotic — they're the difference between a pipeline that fails loudly enough to fix and one that fails quietly enough to become a production incident three weeks later.
