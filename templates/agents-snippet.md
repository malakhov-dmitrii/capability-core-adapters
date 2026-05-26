# Agent Instructions Snippet

Use this snippet in `AGENTS.md`, `CLAUDE.md`, or equivalent project guidance.

## Capability Core + Adapters

Organize product behavior around owned capabilities.

Core rule:

```txt
Many entrypoints. One capability core. Domain owns truth. Adapters stay thin.
Contracts define boundaries. Platform owns infrastructure.
```

Placement:

- app/routes/handlers/jobs/scripts are inbound adapters;
- capabilities own commands, queries, workflows, and view models;
- domain owns durable truth, authority, lifecycle, reconciliation, and
  invariants;
- contracts own schemas crossing deployables or async systems;
- platform owns database, SDKs, queues, auth, telemetry, and external APIs;
- shared owns primitives only.

Before implementing or refactoring behavior:

1. Name the capability in product language.
2. List every entrypoint that touches it.
3. Identify source of truth and authority.
4. Keep adapters thin.
5. Reuse existing command/query/domain behavior instead of duplicating logic.
6. Keep visual reuse separate from semantic reuse.
7. Write or update a capability contract when ownership is ambiguous or durable
   state is involved.

Do not perform global folder reshuffles. Migrate one active capability at a time.

