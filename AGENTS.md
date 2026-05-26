# Agent protocol: Capability Core + Adapters

This file is for coding agents applying Capability Core + Adapters in a project.
It is intentionally procedural.

## Prime directive

Do not organize by file type when ownership is product-specific.

Organize by owned capability, keep adapters thin, keep durable truth in domain,
and route infrastructure access through platform adapters.

This framework is a default, not an override. If the project already has a
coherent architecture, map these responsibilities onto the existing architecture
instead of renaming folders.

## Before editing

1. Inspect the existing architecture and naming conventions.
2. Decide whether Capability Core + Adapters should be applied directly, mapped
   onto existing names, or not used for this task.
3. Identify the user-visible or operator-visible capability.
4. Identify every entrypoint involved:
   - route/page/server action/loader;
   - API handler;
   - bot handler;
   - job/cron/queue handler;
   - CLI/script;
   - desktop/mobile bridge;
   - MCP tool.
5. Identify durable state and authority:
   - database rows;
   - external APIs;
   - sessions;
   - money;
   - permissions;
   - jobs/events;
   - generated recommendations or derived statuses.
6. Identify the current source of truth before moving code.

If the source of truth is unclear, stop broad refactoring. Make the slice
narrower or write a capability contract first.

If the only change would be folder renaming, do not proceed.

## Agent operating loop

For behavior changes, follow:

```txt
discover -> classify -> contract -> change -> verify -> record
```

### Discover

Find current references before editing:

- root and local `README.md`, `AGENTS.md`, `CLAUDE.md`;
- architecture docs;
- `docs/capabilities/*`;
- existing commands, queries, workflows, modules, services, contexts;
- all entrypoints touching the behavior;
- tests and fixtures for the behavior;
- source-of-truth and platform adapters.

### Classify

Map the task to the project's existing names. Do not force folder names when the
project already has clear equivalents.

### Contract

Create or update a capability contract when entrypoints, authority, source of
truth, lifecycle, degraded states, commands, queries, jobs, or public boundaries
change.

If the user request changes product behavior, update the contract and tests that
describe the old behavior. Do not patch one entrypoint around a stale contract.
When docs, tests, code, and the request disagree, record the conflict instead of
hiding it.

### Change

Make the smallest useful intervention. Prefer reusing or extracting one
command/query over copying behavior into another entrypoint.

### Verify

Prove the shared behavior and at least one touched adapter path.

### Record

Leave the updated contract, test evidence, remaining bypass paths, and known
risks in the final report.

## Layer rules

### Apps / inbound adapters

Allowed:

- parse request/input;
- validate boundary payload shape;
- authenticate and authorize at the boundary;
- call one command/query/workflow;
- map result to HTTP, UI, bot, job, CLI, or MCP response.

Not allowed:

- duplicate business decisions;
- directly mutate durable state when a command exists;
- calculate authoritative status;
- call external SDKs directly unless the app is itself the platform adapter.

### Capabilities

Allowed:

- commands;
- queries;
- workflows;
- view models;
- local UI behavior;
- capability-specific validation;
- capability tests.

Not allowed:

- direct framework request/response coupling;
- scattered concrete SDK calls;
- durable rules that need to be shared across clients but are hidden in UI.

### Domain

Allowed:

- business policies;
- state machines;
- invariants;
- calculations;
- domain errors;
- domain events;
- pure or dependency-light logic.

Not allowed:

- React;
- Next/TanStack/Remix request objects;
- bot SDK objects;
- Prisma clients as hidden globals;
- concrete external API clients;
- UI wording that belongs only to one screen.

### Contracts

Allowed:

- API schemas;
- event schemas;
- job payload schemas;
- command/query input and output contracts that cross deployables.

Not allowed:

- implementation logic;
- framework-specific objects;
- product behavior hidden behind type aliases.

### Platform

Allowed:

- database repositories;
- external API clients;
- queue/scheduler adapters;
- auth provider clients;
- telemetry clients;
- file/email/SMS/AI SDKs.

Not allowed:

- business decisions that should be tested without the infrastructure.

### Shared

Allowed:

- primitive UI;
- design system;
- generic helpers;
- generic config.

Not allowed:

- product semantics;
- unclear business status components;
- helper functions that only one capability truly owns.

## Import direction

Default direction:

```txt
app -> capabilities -> domain
app -> capabilities -> platform
capabilities -> contracts
platform -> contracts
shared -> no project-specific layer
```

Avoid:

```txt
domain -> app
domain -> platform concrete clients
shared -> capabilities
capability A -> capability B internal files
bot handler -> web route internals
job -> UI code
```

If one capability needs another, prefer one of:

- app-level composition;
- a public capability command/query;
- a domain service/policy;
- an event or job contract;
- a shared platform adapter.

## Placement decision tree

Use this exact order.

1. Is this code only request/response, route, bot, job, or script glue?
   - Put it in the app adapter.
2. Does it implement a user/operator/business workflow?
   - Put it in the capability.
3. Does it define truth, authority, lifecycle, reconciliation, or invariant?
   - Put it in domain.
4. Does it define a boundary between deployables or async systems?
   - Put it in contracts.
5. Does it call infrastructure or external SDKs?
   - Put it in platform.
6. Is it a primitive with no product meaning?
   - Put it in shared.
7. Still unclear?
   - Keep it local to the capability that needs it first. Do not promote early.

## Reuse decision tree

1. Same visual shape, different semantics:
   - share only the visual shell.
   - keep semantic wrappers local.
2. Same business rule, different UI:
   - move rule to domain.
   - keep UI local.
3. Same workflow from several entrypoints:
   - move workflow to capability command/query.
4. Same external system from several call sites:
   - move concrete SDK access to platform.
5. Same data crossing deployables:
   - move schema/type to contracts.
6. Similar but different reason to change:
   - duplicate intentionally.

## Capability contract trigger

Create or update a capability contract when any of these are true:

- more than one entrypoint uses the behavior;
- durable state is changed;
- money, permissions, sessions, booking, external state, or automation authority
  is involved;
- a background job, cron, or script touches the same data as UI;
- a public API, bot, MCP, mobile, or desktop client is added;
- status/provenance/degraded states are user-visible;
- the agent is unsure where ownership belongs.

Use `templates/capability-contract.md`.

## Implementation protocol

1. Map current state.
2. Write or update tests around current behavior.
3. Thin the adapter.
4. Extract command/query/workflow.
5. Move durable rules to domain.
6. Move concrete SDK/database calls to platform.
7. Add or update contracts if boundaries cross deployables.
8. Verify every entrypoint still calls the same behavior.

## Verification checklist

Before claiming completion:

- relevant unit tests pass;
- command/query tests cover shared behavior;
- adapter tests or smoke tests prove entrypoint wiring;
- no business logic was duplicated across entrypoints;
- no route/bot/job bypasses the command/query path;
- no product-specific logic was moved into generic shared;
- no domain code imports framework or SDK objects;
- degraded/stale/error states are tested when relevant.
- capability contracts reflect changed entrypoints and authority;
- remaining direct route/job/bot/script bypass paths are listed.

## Red flags

- "This is just a route handler."
- "The bot can update the DB directly."
- "The job is only temporary."
- "These cards look the same, so make one generic component."
- "Put it in utils for now."
- "Server action is backend enough."
- "We will extract later" with no boundary.
- "This status is only UI" when it affects user trust or authority.
- "This repo already has an architecture, but I will replace it anyway."
- "The framework says this folder must exist."
- "I only need to fix this one handler."
- "I could not find the command, so I made another one."
- "The script is temporary, so it can bypass the workflow."

When a red flag appears, pause and re-run the placement decision tree.
