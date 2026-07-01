# Loop Design Checklist

Promotion gates for moving a loop up the autonomy ladder. Do **not** skip levels.
A box is checked only when a human has verified it.

## L1 — Report-only (observe & summarize)

- [x] `loop-constraints.md` exists and is loaded first each run
- [x] `loop-budget.md` defines run/token caps + `loop-pause-all` kill switch
- [x] `STATE.md` is the single source of truth for findings
- [x] `loop-run-log.md` gets one entry per run
- [x] `docs/safety.md` denylist + escalation policy written
- [x] Loop makes **zero** code changes; no commit/push/delete
- [ ] One week of clean report-only runs reviewed by a human

## L2 — Assisted fix (propose, human merges)

- [ ] A real, green test command exists (`npm test`) and runs in CI
- [ ] `loop-verifier` agent wired in — rejects unless tests pass & scope is minimal
- [ ] Fixes happen in an **isolated worktree**, one fix per run
- [ ] Every change lands as a **draft PR**; human marks ready & merges
- [ ] Connectors scoped read + comment only
- [ ] Escalation after 3 failed attempts is exercised and works
- [ ] Rollback path verified (revert PR / discard worktree)

## L3 — Trusted autonomy (explicit per-path gates)

- [ ] Per-path write gates enumerated in `LOOP.md`
- [ ] Budget tracked and alerting on 80% threshold
- [ ] Audit trail (run log + PRs) reviewed on a cadence
- [ ] Incident playbook: how to `loop-pause-all` and recover
- [ ] Still **no auto-merge to `main`** — L3 widens scope, not the merge gate

## Review cadence

- Read `STATE.md` daily during report-only.
- Re-run `npm run loop:audit` after any structural change.
- Prune `loop-run-log.md` entries older than 30 days.
