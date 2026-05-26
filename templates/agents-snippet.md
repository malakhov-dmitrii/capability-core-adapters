# Agent instructions snippet

Use this snippet in `AGENTS.md`, `CLAUDE.md`, or equivalent project guidance.

## Capability Core + Adapters

Organize product behavior around owned capabilities.

Core rule:

- treat routes, handlers, jobs, scripts, bots, MCP tools, and clients as
  adapters;
- put reusable product behavior in capability commands, queries, and workflows;
- put durable truth, lifecycle, authority, reconciliation, and invariants in
  domain;
- put deployable, public API, and async schemas in contracts;
- put database, SDK, queue, auth, telemetry, and provider calls in platform.

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

## Agent operating loop

For behavior changes, use:

```txt
discover -> classify -> contract -> change -> verify -> record
```

Discover existing docs, commands, queries, modules, handlers, jobs, scripts,
tests, and source-of-truth code before editing. Map this framework onto existing
project names instead of renaming folders.

Create or update a capability contract when entrypoints, source of truth,
authority, lifecycle, degraded states, commands, queries, public APIs, jobs, or
scripts change.

When a requirement changes, update the contract and tests that describe the old
behavior. If docs, tests, code, and the request disagree, record the conflict
instead of silently patching one entrypoint.

The default agent move is to reuse or extract a shared command/query path. Do
not copy business behavior into a new route, bot handler, job, MCP tool, or
script.
