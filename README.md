# Capability Core + Adapters

**A practical architecture framework for products that start small and grow into
multi-client, backend-heavy systems without tearing themselves apart.**

Capability Core + Adapters takes the useful part of feature slicing and extends
it past the frontend. It gives teams and coding agents a shared way to organize
Next.js, TanStack Start, Remix, API, bot, worker, MCP, CLI, mobile, and desktop
code around durable product behavior.

```txt
Many entrypoints.
One capability core.
Domain owns truth.
Adapters stay thin.
Contracts define boundaries.
Platform owns infrastructure.
```

## The Problem

Most projects begin simply:

```txt
one web app + a few route handlers + a database
```

Then reality arrives:

- a Telegram bot needs the same behavior as the web UI;
- server actions grow into a backend-for-frontend;
- Trigger.dev, cron, queues, and scripts start touching the same data;
- a mobile app, desktop app, MCP server, or public API appears;
- UI components look identical while their business semantics differ;
- "shared" becomes a junk drawer for code nobody owns.

The usual choices are bad:

- keep everything in framework routes until it becomes unextractable;
- introduce heavyweight Clean Architecture ceremony too early;
- apply frontend-only feature slicing to backend authority problems;
- split services before the domain is stable.

Capability Core + Adapters is the middle path.

## Philosophy

This is a sane default, not a universal law.

Use it when a project has no clear architecture, when entrypoints are starting
to multiply, or when agents and humans need a shared decision framework. If a
team already has a coherent architecture that explains ownership, source of
truth, and boundaries, keep it. Borrow only the parts that clarify the work.

The framework should make systems easier to change. If it creates ceremony
without improving ownership, it is being applied incorrectly.

## The Model

```txt
apps / inbound adapters
  Next routes, TanStack server functions, Remix actions, REST, bot handlers,
  MCP tools, Trigger.dev jobs, cron, CLI, desktop IPC, mobile bridges

capabilities
  product workflows: commands, queries, view models, use cases

domain
  durable truth: policies, invariants, lifecycle, reconciliation, authority

contracts
  API, event, job, and cross-deployable schemas

platform
  database, external APIs, SDKs, queues, auth, telemetry, file storage

shared
  primitives: design system, generic helpers, boring utilities
```

Default flow:

```txt
inbound adapter -> capability command/query -> domain -> platform
```

The web app, bot, public API, and worker may all call the same capability
command. They should not each invent their own business logic.

## Quick Start

For a small full-stack app:

```txt
src/
  app/              # routes, pages, server actions, loaders, handlers
  capabilities/     # product workflows
  domain/           # truth and invariants
  platform/         # db, SDKs, queues, external APIs
  shared/           # primitives
```

For a monorepo:

```txt
apps/
  web/
  api/
  bot/
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

Start local. Promote only when the reason to change is genuinely shared.

## What Makes This Different

Capability Core + Adapters is not "Feature-Sliced Design for the backend" and
not a strict Clean Architecture template.

It is an ownership framework:

- framework routes own entrypoints;
- capabilities own behavior;
- domain owns truth;
- contracts own boundaries;
- platform owns infrastructure;
- shared owns primitives.

That distinction matters when a project grows from one UI into several clients,
jobs, scripts, APIs, and external integrations.

## When To Use It

Use it when:

- adding a second entrypoint to existing behavior;
- building a full-stack app that may later grow beyond one UI;
- refactoring route handlers, server actions, bot handlers, or jobs with
  duplicated business logic;
- designing public APIs, MCP tools, background workers, or scripts that touch
  existing state;
- reviewing ambiguous "shared" UI or utility code;
- preparing a project for agent-assisted development.

Do not use it as an excuse for a global folder reshuffle. Apply it one
capability at a time.

## When Not To Use It

Do not force this framework when:

- the project already has a clear architecture with working boundaries;
- the codebase is a small throwaway script or prototype;
- the real problem is domain discovery, not code organization;
- the team needs a specialized architecture for safety, regulation,
  performance, or distributed systems;
- applying the framework would only rename folders without changing ownership.

## Documentation

- [Framework](docs/framework.md)
- [Full-stack boundaries](docs/full-stack-boundaries.md)
- [Decision guide](docs/decision-guide.md)
- [Adoption playbook](docs/adoption-playbook.md)
- [Limits and failure modes](docs/limits-and-failure-modes.md)
- [Method fit checklist](docs/method-fit-checklist.md)
- [Agent skill pack](docs/skill-pack.md)
- [Comparison with related patterns](docs/comparison.md)

## Examples

- [Next BFF to multi-entrypoint](examples/01-next-bff-to-multi-entrypoint/README.md)
- [Shared UI, different semantics](examples/02-shared-ui-different-semantics/README.md)
- [Backend-heavy service](examples/03-backend-heavy-service/README.md)

## Templates

- [Capability contract](templates/capability-contract.md)
- [Adoption checklist](templates/adoption-checklist.md)
- [Agent instructions snippet](templates/agents-snippet.md)
- [Architecture decision record](templates/adr.md)

## Optional Agent Skills

This repository includes optional `SKILL.md` packages for Claude Code, Codex,
and compatible coding agents:

```txt
skills/
  capability-core-adapters/
  capability-contract/
```

The docs are the source of truth. Skills are thin entrypoints that help agents
apply the framework consistently.

## One-Sentence Rule

Every new entrypoint is an adapter. It may call existing capability commands and
queries, but it does not get to invent a new copy of the business logic.

## License

MIT. Use it, fork it, adapt it, and improve it.
