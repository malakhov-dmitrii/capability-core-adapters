# Capability Contract: <name>

## Summary

What user, operator, or business ability does this capability provide?

## Entry Points

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

## Authority

Who or what can create, approve, execute, reconcile, retry, cancel, or delete
state in this capability?

## Lifecycle

```txt
state A -> state B because <real event>
state B -> state C because <real event>
```

## Commands

- `commandName(input) -> output`

## Queries

- `queryName(input) -> output`

## Domain Rules

- invariant:
- calculation:
- permission:
- reconciliation:
- stale-data behavior:

## Contracts

- API:
- event:
- job payload:
- public command/query:

## Platform Dependencies

- database/repository:
- external API:
- queue/scheduler:
- auth:
- telemetry:
- file/storage:

## UI / View Model

- loading:
- ready:
- stale:
- missing data:
- low confidence:
- blocked/review required:
- error:

## Degraded States

What happens when data is missing, stale, contradictory, or low-confidence?

## Reuse Decision

- local to capability:
- domain:
- contract:
- platform:
- shared UI:

## Tests

- command/query unit tests:
- domain tests:
- adapter/wiring tests:
- integration tests:
- manual/UAT proof:

## Known Risks

What can still go wrong?

## Non-Goals

What this capability explicitly does not own.

