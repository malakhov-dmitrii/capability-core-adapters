# Capability Contract Review Checklist

## Required

- Capability name is product-facing.
- Owner is explicit.
- Every entrypoint is listed.
- Source of truth is named.
- Authority is explicit.
- Lifecycle states and transitions are real.
- Commands and queries are named.
- Domain rules are separated from UI behavior.
- Contracts are listed when boundaries cross deployables.
- Platform dependencies are named.
- Degraded states are defined.
- Tests are listed.
- Non-goals are listed.

## Blockers

- source of truth unknown;
- UI owns durable truth;
- two entrypoints duplicate mutation logic;
- job or script bypasses command/query path;
- external API state has no reconciliation behavior;
- shared component hides different business meanings;
- status/provenance cannot be explained to the user;
- no test can prove the main invariant.

