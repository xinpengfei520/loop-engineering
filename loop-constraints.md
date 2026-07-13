# Loop Constraints

> Add rules below with `/constraints <rule>` in your agent.
> The `loop-constraints` skill reads this file at the start of every run.
> Constraints here are **binding** — the agent MUST follow them.

## Push & Merge
- Don't push before telling me
- Never auto-merge to main without human approval
- Always create a draft PR first; let me review before marking ready

## Paths
- Never edit .env, .env.*, auth/, payments/, secrets/, credentials/
- Never edit infrastructure configs without human approval

## Code
- Always run tests before proposing a fix
- Never disable tests to make CI green
- Never refactor unrelated code — one fix per run
- Max 3 fix attempts per item; escalate after

## Communication
- Always tell me what you're about to do before doing it
- Never close an issue or PR without my approval

## Budget
- If token spend hits 80% of daily cap, switch to report-only
- If loop-pause-all is active, exit immediately

## Bookkeeping (loop self-tracking)
- Loops MAY `git commit` their own bookkeeping at the end of a run — **only** `STATE.md` and `loop-run-log.md`. This is the sole autonomous git write allowed at L1.
- Never `git push` as part of it — push stays human-gated (see Push & Merge).
- Never include any other path (business code, configs, skills, docs) in a bookkeeping commit — bookkeeping files only. If other files are staged, do NOT commit; escalate.
- Use a `docs(loop): …` commit message.

---
<!-- Add your own rules below. Use plain English. The loop reads this verbatim. -->
