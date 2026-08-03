# Loop Configuration — Minimal Triage (Claude Code)

## Active Loops

| Pattern | Cadence | Status | Command |
|---------|---------|--------|---------|
| Daily Triage | 1d | L1 report-only | `/loop 1d Run $loop-constraints, then $loop-triage.` |
| Freshness Watch | 1d (18:23) | L1 report-only | `/loop 1d Run $loop-constraints, then $loop-freshness.` |

## Scheduling

Loops are scheduled by **`.github/workflows/loop-daily.yml`** (GitHub Actions,
`cron: '3 2 * * *'` UTC = 10:03 Asia/Shanghai), not by session-only crons.

Session crons auto-expire after 7 days and die with the Claude session; relying on
them caused four silent stalls (STATE.md H-2/H-3/H-4/H-5, root cause W-E). Actions
schedules live in the repo and cannot lapse that way.

The workflow has two layers:

- **`heartbeat`** — always runs, no secrets. Tests plus the deterministic freshness
  checks (STATE.md staleness, run-log age, open High items); files/updates a GitHub
  Issue when something needs attention. This absorbs the Freshness Watch checks, so
  there is no separate evening run.
- **`claude-triage`** — full Claude-driven triage via `anthropics/claude-code-action`.
  **Skipped unless the `ANTHROPIC_API_KEY` repo secret is set** (it bills API usage).

The `/loop` commands above still work for running a loop by hand at any time.

> A scheduled workflow only takes effect once it is on the **default branch at
> `origin`** — committing locally is not enough.

## Human Gates

- No auto-fix until L2 checklist complete
- All high-risk paths: human review required (see docs/safety.md denylist)

## Worktrees

- Use `isolation: worktree` when spawning implementer sub-agents (L2+).
- One worktree per fix attempt; discard after verifier REJECT.

## Connectors (MCP)

- MCP optional for L1 report-only loops.
- For L2+: GitHub MCP to read CI/issues; scope connectors to read + comment only until trusted.

## Budget

- Max sub-agent spawns per run: 0 (L1)
- Review STATE.md daily

## Links

- Pattern: [daily-triage](../../patterns/daily-triage.md)
- Pattern: [freshness-watch](../../patterns/freshness-watch.md)
- Checklist: [loop-design-checklist](../../docs/loop-design-checklist.md)