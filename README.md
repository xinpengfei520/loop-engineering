# looper-engineering

A **loop-engineering workspace**: a repo that houses autonomous "loop" automations —
scheduled agents that triage, watch, and (eventually) fix a codebase under **binding
constraints, explicit budgets, and human safety gates**. Scaffolded with
[`@cobusgreyling/loop-init`](https://www.npmjs.com/package/@cobusgreyling/loop-init).

> **Current maturity: L1 (report-only).** Loops observe and report to `STATE.md`.
> They do **not** modify code, push, or delete; the only git write they may make is
> committing their own bookkeeping (`STATE.md` / `loop-run-log.md`) at end of run. Auto-fix
> (L2) is off until the checklist in [`docs/loop-design-checklist.md`](docs/loop-design-checklist.md) is complete.

## Repo layout

| Path | Purpose |
|------|---------|
| `LOOP.md` | Loop configuration — cadence, human gates, connectors, budget |
| `STATE.md` | Living state the loop reads/writes each run (High Priority / Watch / Done) |
| `loop-constraints.md` | **Binding** rules the loop must obey every run |
| `loop-budget.md` | Token/run caps and the `loop-pause-all` kill switch |
| `loop-run-log.md` | One appended entry per run (JSON) |
| `docs/safety.md` | Denylist, auto-merge policy, MCP scopes, escalation |
| `docs/loop-design-checklist.md` | L1 → L2 → L3 promotion gates |
| `patterns/` | Loop patterns: docs + machine-readable `registry.yaml` |
| `.claude/skills/` | `loop-constraints`, `loop-triage`, `loop-budget` skills |
| `.claude/agents/` | `loop-verifier` (independent maker/checker) |
| `.github/` | Issue/PR templates + CI workflow |
| `test/` | Smoke tests (so `npm test` is real before any auto-fix) |

## The loop model

1. **`loop-constraints`** runs first — loads `loop-constraints.md`, enforces every rule, and honors `loop-pause-all`.
2. **`loop-budget`** checks spend against `loop-budget.md`; over budget → report-only / exit.
3. **`loop-triage`** produces a prioritized findings report into `STATE.md`.
4. At L2+, a **`loop-verifier`** agent independently rejects any change unless tests pass and scope is minimal.

## Active loops

| Pattern | Cadence | Level | Command |
|---------|---------|-------|---------|
| [Daily Triage](patterns/daily-triage.md) | `1d` | L1 report-only | `/loop 1d Run $loop-constraints, then $loop-triage.` |
| [Freshness Watch](patterns/freshness-watch.md) | `1d` | L1 report-only | `/loop 1d Run $loop-constraints, then $loop-freshness.` |

## Local development

```bash
npm test        # node --test — runs the smoke suite
npm run lint    # placeholder until a linter is added
npm run loop:audit   # loop readiness audit
npm run loop:cost    # estimate loop token spend
```

Requires Node ≥ 18.

## Safety

All loop behavior is bounded by [`loop-constraints.md`](loop-constraints.md) and
[`docs/safety.md`](docs/safety.md). Highlights: **no auto-merge to `main`**, **never edit
secrets/auth/payment paths**, **always run tests before proposing a fix**, **one fix per
run**, **escalate after 3 attempts**. Kill switch: set `loop-pause-all` (see `loop-budget.md`).

## License

MIT
