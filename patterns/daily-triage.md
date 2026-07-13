# Pattern: Daily Triage

**Cadence:** `1d` · **Level:** L1 (report-only) · **Tool:** Claude Code

A once-a-day sweep that reads recent project signals, produces a prioritized findings
report into `STATE.md`, and changes nothing else. This is the safest possible loop — pure
observation — and the recommended starting point before any auto-fix (L2).

## What it does each run

1. **`loop-constraints`** — load `loop-constraints.md`, enforce every rule, honor `loop-pause-all`.
2. **`loop-budget`** — check spend vs `loop-budget.md`; over budget → report-only / exit.
3. **`loop-triage`** — read README, `package.json`, structure, recent `git diff`, `STATE.md`, `LOOP.md`; summarize the 3–5 most important issues into `STATE.md` (High Priority / Watch List / Done).
4. Append one entry to `loop-run-log.md`.

## Inputs

Recent CI/test failures · open issues · recent commits on `main` · the current `STATE.md`.
When an input is absent (e.g. no CI yet), the loop says so rather than inventing signal.

## Output

`STATE.md`, with findings ranked; anything needing a decision is flagged
**"需要人工确认 / needs human confirmation"** under High Priority.

## Guardrails

- No code changes, no `git push`, no deletions at L1. May commit **only** its own bookkeeping
  (`STATE.md` + `loop-run-log.md`) at end of run — see the Bookkeeping rule in `loop-constraints.md`.
- Only proposes; never acts on fixes until the L2 checklist in
  [`../docs/loop-design-checklist.md`](../docs/loop-design-checklist.md) is complete.

## Scheduling

```
/loop 1d Run $loop-constraints, then $loop-triage.
```

Session-local via `CronCreate`, or durable via `/schedule` (cloud). Recurring session jobs
auto-expire after 7 days.

## Cost

Estimate with `npm run loop:cost`. Blend depends on the no-op vs full-triage ratio; keep the
cadence honest (this pattern is registered at **1 run/day**, cap **2/day** in `loop-budget.md`).
