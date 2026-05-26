# Adoption Playbook

Use this playbook to introduce Capability Core + Adapters into an existing
project without a disruptive rewrite.

## Adoption Modes

### Mode 1: New Project

Start with the small layout:

```txt
src/
  app/
  capabilities/
  domain/
  platform/
  shared/
```

Add `contracts/` only when there is a second deployable, public API, async job
payload, or external consumer.

### Mode 2: Existing Frontend / Full-Stack App

Do not rename everything.

1. Pick one active feature.
2. Create a capability folder for new work.
3. Move only files touched by the current change.
4. Keep framework routing where it is.
5. Extract command/query logic from route handlers or server actions.
6. Leave unrelated legacy folders alone.

### Mode 3: Existing Monorepo

Keep app-specific code in each app. Move only shared behavior into packages.

Suggested direction:

```txt
apps/web/src/capabilities/*
apps/bot/src/handlers/*
apps/worker/src/jobs/*
packages/domain/*
packages/contracts/*
packages/platform/*
packages/capabilities/*
```

Move a capability into `packages/capabilities` only when several apps need the
same workflow.

### Mode 4: Backend-Heavy System

Use modules or bounded contexts:

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

Treat service extraction as a deployment decision, not a folder decision.

## First Slice Procedure

1. Choose one capability that is currently changing.
2. Write a capability contract.
3. List all entrypoints that touch it.
4. Add regression tests for existing behavior.
5. Extract the main command/query.
6. Make every entrypoint call that command/query.
7. Move durable rules into domain.
8. Keep UI-specific view models in capability.
9. Keep concrete infrastructure calls in platform.
10. Run verification through each relevant entrypoint.

## Refactor Boundaries

Do not refactor by aesthetics. Refactor when one of these triggers appears:

- the same business rule exists in two entrypoints;
- a job/script bypasses UI behavior;
- a route handler contains durable decisions;
- a UI component computes authoritative status;
- a shared component has product-specific flags;
- the same external API is called from several capabilities;
- a second client appears.

## Naming Guidance

Use product language:

- `booking-link`
- `telegram-session`
- `capital-allocation`
- `workspace-invitation`
- `agent-comment-flow`

Avoid technical buckets:

- `api`
- `utils`
- `components`
- `hooks`
- `services`
- `helpers`

Technical folders can exist inside a capability, but should not define the
top-level ownership.

## When To Duplicate

Duplicate intentionally when:

- two things look the same but mean different things;
- two flows are likely to change for different reasons;
- the abstraction would require product-specific flags;
- the shared module would not have a clear owner;
- reuse is speculative.

Duplication is cheaper than a false abstraction that hides authority.

## When To Promote

Promote code when:

- multiple entrypoints need the same workflow;
- multiple clients need the same contract;
- multiple capabilities need the same domain rule;
- multiple adapters need the same platform client;
- multiple screens need the same primitive UI with no product meaning.

Promotion should include tests at the new layer.

## Suggested Project Docs

Add these files to projects adopting the framework:

```txt
docs/architecture/capability-core-adapters.md
docs/architecture/capability-contract-template.md
AGENTS.md or .codex/agents/capability-core-adapters.md
```

For large projects, add capability-specific contracts:

```txt
docs/capabilities/booking-link.md
docs/capabilities/telegram-session.md
docs/capabilities/capital-allocation.md
```

## Rollout Checklist

- framework document added;
- agent protocol added;
- first capability contract written;
- one real slice migrated or created;
- tests cover command/query behavior;
- one adapter is proven thin;
- no global folder reshuffle happened;
- remaining risks are documented.

