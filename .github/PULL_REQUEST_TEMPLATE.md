## Summary

<!-- What changed and why. Keep it to one fix / one concern per PR. -->

## Loop / safety checklist

- [ ] `npm test` passes locally
- [ ] `npm run lint` passes
- [ ] Scope is minimal — one fix per PR, no unrelated refactors
- [ ] No denylist paths touched (`.env*`, `auth/`, `payments/`, `secrets/`, `credentials/`, infra)
- [ ] Not auto-merged — a human will review and merge
- [ ] If loop-generated: links the `STATE.md` item and run-log `run_id`

## Notes for reviewer
