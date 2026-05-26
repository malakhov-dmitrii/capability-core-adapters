# Framework

Capability Core + Adapters is a project-structure and ownership framework for
software products that can start as one full-stack application and later grow
into a multi-client, backend-heavy system.

It deliberately avoids two failure modes:

- frontend-only feature slicing that ignores backend authority;
- heavyweight architecture ceremony before the product needs it.

It is meant to be a sane default when a project has no better architecture. It
is not meant to replace a coherent architecture that already answers the ownership question.

## Operating rule

Use this as the operating rule for projects that adopt the framework:

- entrypoints are adapters;
- capabilities own commands, queries, workflows, and view models;
- domain owns durable truth, lifecycle, authority, reconciliation, and
  invariants;
- contracts define deployable, public API, and async boundaries;
- platform owns database, SDK, queue, auth, telemetry, and provider calls;
- shared owns primitives with no product meaning.

Agents should apply this rule after discovering the existing architecture. If
the project already uses different names for the same responsibilities, keep the
project names and map this rule onto them.

## Responsibility map

### Apps / inbound adapters

Apps are ways into the system:

- Next.js routes, route handlers, and server actions;
- TanStack Start routes, server functions, and server routes;
- Remix loaders and actions;
- REST, GraphQL, tRPC, RPC, and MCP handlers;
- Telegram bots and other chat bots;
- Trigger.dev jobs, workers, queues, cron, and scripts;
- desktop IPC and mobile bridges;
- CLI and operational scripts.

Adapters should be thin:

1. parse input;
2. authenticate and authorize at the boundary;
3. validate boundary payloads;
4. call one capability command, query, or workflow;
5. format the response.

Adapters should not contain durable business decisions.

### Capabilities

Capabilities are product abilities. They own application behavior:

- commands for mutations and use cases;
- queries for reads;
- workflows for multi-step orchestration;
- view models for UI-ready representations;
- local validation and capability-specific policy;
- behavior tests.

Good capability names:

- `booking-link`
- `telegram-session`
- `capital-allocation-review`
- `workspace-invitation`
- `browser-agent-comment-flow`

Bad capability names:

- `buttons`
- `hooks`
- `api`
- `utils`
- `modals`
- `services`

Capabilities are named for what the product does, not what file type they
contain.

### Domain

Domain owns durable truth:

- business invariants;
- state machines;
- lifecycle transitions;
- reconciliation;
- authority rules;
- calculations that must stay consistent across clients;
- domain errors and events.

Domain should not import React, Next, TanStack, Remix, bot SDKs, concrete
database clients, or external API clients.

### Contracts

Contracts define boundaries between deployables and asynchronous systems:

- API schemas;
- event schemas;
- job payload schemas;
- command/query input and output contracts used across apps;
- versioned public integration types.

Contracts appear when the boundary matters. Do not create them speculatively.

### Platform

Platform owns infrastructure:

- database repositories;
- external API clients;
- queue and scheduler adapters;
- auth provider clients;
- telemetry;
- file storage;
- email, SMS, payments, AI, Telegram, and other SDK integrations.

Platform code adapts the real world to ports the domain and capabilities can
use.

### Shared

Shared owns primitives:

- design-system components;
- primitive UI shells;
- generic formatting helpers;
- generic config;
- product-free types.

Shared must not become a hiding place for unclear product semantics.

## Adoption principle

Adopt the framework by strengthening ownership, not by renaming folders.

Good adoption:

- a route becomes thinner;
- a bot and a web route call the same command;
- a job stops bypassing a domain invariant;
- a shared component is split into visual shell and semantic wrappers;
- a capability contract clarifies source of truth.

Bad adoption:

- folders are renamed without behavior moving;
- empty layers are created;
- existing coherent architecture is replaced without a concrete pain;
- every small UI piece becomes a capability.

## Default flow

```txt
inbound adapter -> capability command/query/workflow -> domain -> platform
```

Examples:

```txt
Next server action -> createBookingLink -> booking policy -> eviivo client
Telegram handler   -> createBookingLink -> booking policy -> eviivo client
Trigger.dev job    -> recoverBookingLink -> booking policy -> eviivo client
```

The entrypoints differ. The capability and domain stay consistent.

## Minimal layout

```txt
src/
  app/
  capabilities/
  domain/
  platform/
  shared/
```

Use this for one deployable. Do not add empty folders just to satisfy the
framework.

## Monorepo layout

```txt
apps/
  web/
  admin/
  telegram-bot/
  public-api/
  worker/
  desktop/
  scripts/

packages/
  capabilities/
  domain/
  contracts/
  platform/
  ui/
```

Move code into `packages/` only when multiple deployables need it.

## Backend-heavy layout

When the product becomes mostly backend behavior, organize by bounded context or
module:

```txt
modules/
  booking/
    capabilities/
    domain/
    contracts/
    platform/
  billing/
  telegram-session/
```

A bounded context does not have to become a microservice. Start with modules.
Extract services only when deployment, scaling, ownership, or security require
it.

## Source-of-truth rule

Every capability that displays or mutates important derived state must answer:

- what is the source of truth;
- who is allowed to create, approve, execute, reconcile, retry, cancel, or
  delete it;
- what happens when the source changes;
- whether it can be stale;
- how degraded or missing data is shown;
- how the UI explains provenance.

If this cannot be answered, keep implementation narrow or write a capability
contract first.

## Default, not mandate

Use this framework as:

- a starting point for projects with no structure;
- a review lens for messy full-stack boundaries;
- a migration target for one active capability at a time;
- an agent instruction set for safer default behavior.

For agent-assisted work, use the routine in
[agent-operating-model.md](agent-operating-model.md): discover, classify,
contract, change, verify, and record. This routine is part of the framework, not
an optional appendix.

Do not use it as:

- a universal folder tree;
- a reason to rewrite stable code;
- a microservices strategy;
- a substitute for domain discovery;
- a way to avoid stack-specific best practices.

## Anti-patterns

- route handlers containing business rules;
- server actions treated as the whole backend;
- bot handlers mutating durable state directly;
- jobs or scripts bypassing commands;
- UI calculating authoritative status;
- generic components with business flags for unrelated meanings;
- `shared` folders full of product logic;
- platform SDK calls scattered through capabilities;
- backend modules shaped only around one frontend screen.

## Done criteria

A slice follows this framework when:

- entrypoints are thin;
- product behavior lives in a capability;
- durable truth lives in domain;
- infrastructure calls are contained in platform;
- cross-deployable schemas live in contracts;
- shared code is genuinely primitive;
- tests exercise command/query/domain behavior directly;
- user-visible status can explain its source and degraded states.
