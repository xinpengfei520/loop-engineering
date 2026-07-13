# Pattern: Freshness Watch

**Cadence:** `1d` · **Level:** L1 (report-only) · **Tool:** Claude Code

A once-a-day meta-loop that keeps the loop workspace itself tidy. Where
[Daily Triage](daily-triage.md) watches the *codebase*, Freshness Watch watches the loop's
own **bookkeeping** — `STATE.md`, `loop-run-log.md`, and the working tree — and reports drift
into `STATE.md`. It changes nothing else. Pure observation, same L1 safety gate as triage.

## What it does each run

1. **`loop-constraints`** — load `loop-constraints.md`, enforce every rule, honor `loop-pause-all`.
2. **`loop-budget`** — check spend vs `loop-budget.md`; over budget → report-only / exit.
3. **`loop-freshness`** — check STATE.md staleness, uncommitted report-only diffs piling up,
   run-log entries >30d, and stuck (>14d) High-Priority items; write `F-`-prefixed findings
   into the `STATE.md` Watch List.
4. Append one entry to `loop-run-log.md` (`pattern: freshness-watch`).

## Inputs

`STATE.md` "Last run" date · `loop-run-log.md` oldest entry · `git status --porcelain` ·
today's date. When nothing trips, the loop records a one-line no-op rather than inventing signal.

## Output

`STATE.md` Watch List, with freshness findings prefixed `F-`. Nothing is committed, pruned, or
deleted — those remain **human decisions** flagged for confirmation.

## Guardrails

- No code changes, no `git push`, no deletions at L1. May commit **only** its own bookkeeping
  (`STATE.md` + `loop-run-log.md`) at end of run — see the Bookkeeping rule in `loop-constraints.md`.
- Never prunes the run log or commits non-bookkeeping files on its own — it only *names* stale
  bookkeeping and suggests the action.
- Does not duplicate `loop-triage`'s codebase findings; scope is the loop's own hygiene.

## Scheduling

```
/loop 1d Run $loop-constraints, then $loop-freshness.
```

Session-local via `CronCreate` (registered here at **18:23 local**, after the 10:00 triage
sweep so it sees that run's writes). Durable via `/schedule` (cloud). Recurring session jobs
auto-expire after 7 days.

## Cost

Cheap by design — mostly reads three small files. Registered at **1 run/day**, cap **2/day**
in `loop-budget.md`. Estimate with `npm run loop:cost`.
