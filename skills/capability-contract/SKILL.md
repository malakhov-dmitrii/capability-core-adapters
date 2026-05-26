---
name: capability-contract
description: Use when writing, reviewing, or tightening a capability contract, source-of-truth map, authority model, lifecycle, command/query boundary, degraded-state behavior, or cross-entrypoint ownership document for Capability Core + Adapters.
---

# Capability Contract

Use this skill to create or review a capability contract before implementation
or before a risky refactor.

The contract exists to prevent confident wrongness: duplicated business logic,
unclear source of truth, UI-owned authority, jobs that bypass rules, or shared
components that hide different semantics.

## Workflow

1. Name the capability in product language.
2. List every current or planned entrypoint.
3. Identify source of truth and authority.
4. Define lifecycle states and real events that move state.
5. Define commands and queries.
6. Separate domain rules from UI/view-model concerns.
7. Identify contracts crossing deployables or async systems.
8. Identify platform dependencies.
9. Define degraded, stale, missing, contradictory, and low-confidence states.
10. List required tests and manual/UAT proof.
11. Mark non-goals so the capability does not absorb adjacent concerns.

## Review Lenses

Check these before accepting the contract:

- Authority: who can create, approve, execute, reconcile, retry, cancel, delete?
- Provenance: can user-visible status explain why it exists?
- Staleness: what happens when source data changes?
- Double-counting: can money, work, sessions, or state be counted twice?
- Lifecycle: are transitions tied to real events?
- Reconciliation: what happens when planned and actual state differ?
- Degradation: does the product suppress/review/block instead of faking certainty?
- Entry points: do web, bot, API, job, MCP, and script paths use the same core?
- Platform: are concrete SDK/database calls contained?
- Shared UI: are visual shells separated from business semantics?

## Output

Write or update a contract using `assets/capability-contract.md`.

If the project already has a docs location, place it near existing architecture
or capability docs. If not, use:

```txt
docs/capabilities/<capability-name>.md
```

Do not leave the contract only in chat when implementation depends on it.

## Reference

Load `references/contract-review-checklist.md` for a compact review checklist.

