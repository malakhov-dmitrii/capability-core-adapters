# Capability Core + Adapters Cheatsheet

## Sentence

Apps are adapters. Capabilities are workflows. Domain is truth. Contracts are
boundaries. Platform is infrastructure. Shared is primitives.

## Minimal Layout

```txt
src/
  app/
  capabilities/
  domain/
  platform/
  shared/
```

## Monorepo Layout

```txt
apps/
  web/
  bot/
  api/
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

## Default Flow

```txt
inbound adapter -> command/query/workflow -> domain -> platform
```

## Backend Growth Rule

Start as one deployable if that is enough. As the system grows, add entrypoints
as adapters and share behavior through commands, queries, domain, contracts, and
platform adapters.

## Red Flags

- route handler contains business rules;
- server action becomes the only backend;
- bot handler updates durable state directly;
- cron script bypasses capability commands;
- UI computes authoritative status;
- shared component has product-specific flags;
- SDK calls are scattered through features;
- public API bypasses the same rules as web.

## Promotion Rule

Start local. Promote only when the reason to change is shared.

```txt
local -> capability public API -> domain / contract / platform / shared
```

