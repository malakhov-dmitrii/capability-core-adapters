# Capability Contract: <name>

## Summary

What user, operator, or business ability does this capability provide?

## Current Entry Points

List every way this capability is invoked:

- web route/page/server action/loader:
- API handler:
- bot handler:
- job/cron/queue:
- CLI/script:
- desktop/mobile bridge:
- MCP/public tool:
- other:

## Owner

Who owns product behavior and future changes?

## Source Of Truth

What data or external system is authoritative?

Examples:

- database table:
- external API:
- ledger/accounting system:
- session store:
- third-party admin config:
- event stream:

## Authority

Who or what can create, approve, execute, reconcile, retry, cancel, or delete
state in this capability?

## Lifecycle

List states and transitions.

```txt
state A -> state B because <real event>
state B -> state C because <real event>
```

## Commands

Mutations/use cases exposed by the capability:

- `commandName(input) -> output`

## Queries

Reads exposed by the capability:

- `queryName(input) -> output`

## Domain Rules

Rules that must be consistent across all entrypoints:

- invariant:
- calculation:
- permission:
- reconciliation:
- stale-data behavior:

## Contracts

Schemas or types that cross deployables:

- API:
- event:
- job payload:
- public command/query:

## Platform Dependencies

Concrete infrastructure required:

- database/repository:
- external API:
- queue/scheduler:
- auth:
- telemetry:
- file/storage:

## UI / View Model

What does the UI show, and how does it explain provenance?

Important states:

- loading:
- ready:
- stale:
- missing data:
- low confidence:
- blocked/review required:
- error:

## Degraded States

What happens when data is missing, stale, contradictory, or low-confidence?

Prefer suppress/review/blocked states over fake precision.

## Reuse Decision

What is local, shared, domain, platform, or contract?

- local to capability:
- domain:
- contract:
- platform:
- shared UI:

## Tests

Required verification:

- command/query unit tests:
- domain tests:
- adapter/wiring tests:
- integration tests:
- manual/UAT proof:

## Known Risks

What can still go wrong?

## Non-Goals

What this capability explicitly does not own.

