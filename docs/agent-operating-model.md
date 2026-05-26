# Agent operating model

Capability Core + Adapters is also an operating model for coding agents.

Agents fail differently from humans. Without a retrieval routine, an agent can
work from the file in front of it instead of the system boundary. The usual
failure is local correctness with system drift: code is added to the nearest
route, helper, job, or component, and the next agent inherits a weaker boundary.

This document defines the agent routine the framework expects.

For projects that need stronger retrieval, pair this routine with
[agent-tooling.md](agent-tooling.md). Tooling is optional. The ownership model
must still work when no special tools are installed.

## The agent problem

Typical drift:

```txt
request: "make Telegram booking link work too"

agent opens bot handler
agent copies web behavior into bot handler
agent calls provider directly
agent writes status differently
agent does not update docs or tests
```

The feature appears done, but the system now has two behavior paths.

The same drift happens with:

- route handlers;
- server actions;
- background jobs;
- cron scripts;
- MCP tools;
- one-off repair scripts;
- shared UI components;
- generic helpers.

## Agent operating loop

Every agent task that changes product behavior should follow this loop.

```txt
discover -> classify -> contract -> change -> verify -> record
```

## 1. Discover

Before editing, the agent must find the current structure.

Search for:

- `README.md`, `AGENTS.md`, `CLAUDE.md`, architecture docs;
- `docs/capabilities/*`;
- existing feature, module, use-case, command, query, workflow folders;
- route handlers, bot handlers, jobs, scripts, MCP tools that touch the same
  behavior;
- tests for the behavior;
- domain or platform adapters related to the same source of truth.

The agent should not assume the framework names are present. Existing projects
may call the same responsibilities `modules`, `use-cases`, `services`,
`contexts`, `application`, `infra`, or `adapters`.

## 2. Classify

Classify the task before writing code:

| Question | If yes |
| --- | --- |
| Is this input/output glue? | Keep it in the adapter. |
| Is this product workflow? | Put it in a capability command/query/workflow. |
| Is this source of truth, lifecycle, authority, or invariant? | Put it in domain. |
| Does it cross deployables or async systems? | Put it in contracts. |
| Does it call a database, SDK, provider, queue, or auth system? | Put it in platform. |
| Is it a primitive with no product meaning? | Put it in shared. |

If classification is unclear, the agent should narrow the change or write a
capability contract first.

## 3. Contract

The agent must create or update a capability contract when:

- a second entrypoint starts using the behavior;
- durable state is changed;
- a job, script, bot, public API, MCP tool, mobile, or desktop client is added;
- source of truth or authority is unclear;
- the UI shows user-visible status, provenance, or degraded state;
- the implementation changes lifecycle or reconciliation behavior.

The contract is the project memory for future agents. It should answer:

- capability name;
- entrypoints;
- source of truth;
- authority;
- commands and queries;
- domain rules;
- platform dependencies;
- degraded states;
- tests;
- non-goals.

## 4. Change

The smallest useful change is preferred.

Good agent moves:

```txt
route handler -> existing command
bot handler   -> existing command
job           -> existing workflow
UI status     -> domain/view model result
provider call -> platform adapter
```

Bad agent moves:

```txt
route handler -> new copy of business rule
bot handler   -> direct database mutation
job           -> direct provider call with different status logic
shared helper -> product-specific authority rule
UI component  -> authoritative lifecycle calculation
```

## 5. Verify

The agent should verify the boundary it changed:

- command/query tests for behavior;
- domain tests for durable rules;
- adapter smoke tests for route, bot, job, or API wiring;
- regression tests for copied or divergent logic;
- link and skill validation for docs/agent changes.

If the behavior crosses multiple entrypoints, test at least one shared core path
and one adapter path.

## 6. Record

Before finishing, the agent should leave durable evidence:

- capability contract updated;
- tests named in the final report;
- remaining entrypoints or bypass paths listed;
- known risks stated;
- no global reshuffle hidden inside the change.

## When requirements change

Agents should not treat old contracts as sacred. A contract is project memory,
not permanent law.

When a new requirement changes behavior, the agent should:

1. find the current contract, tests, entrypoints, and source-of-truth code;
2. identify what changed: source of truth, authority, lifecycle, status,
   degraded state, integration, or entrypoint;
3. update the contract before or alongside the implementation;
4. update tests that describe the old behavior;
5. list compatibility or migration work when old entrypoints still exist.

If code, tests, docs, and the new request disagree, do not silently choose the
nearest file. Mark the conflict in the capability contract or final report, make
the smallest safe change, and leave the unresolved boundary visible.

## Scale modes

### Small full-stack app

Use local folders:

```txt
src/app
src/capabilities
src/domain
src/platform
src/shared
```

The agent should avoid creating packages until there is a second deployable or
real shared behavior.

### Monorepo

Use app-local adapters and shared packages:

```txt
apps/web
apps/bot
apps/worker
packages/capabilities
packages/domain
packages/contracts
packages/platform
```

The agent should not import app internals across apps. Use contracts or shared
capability commands instead.

### Backend-heavy system

Use modules or bounded contexts:

```txt
modules/booking
modules/telegram-session
modules/billing
```

The agent should preserve module boundaries and avoid turning every module into
a service. Service extraction is an operations decision, not a folder decision.

## Agent failure modes

| Failure | What it looks like | Countermeasure |
| --- | --- | --- |
| Reference blindness | Agent edits nearest file without reading docs or existing commands. | Discover step is mandatory. |
| Route gravity | Business logic accumulates in server actions or handlers. | Extract or reuse command/query. |
| Fake shared | Agent moves product-specific behavior into `shared`. | Share primitives only; keep semantics local or domain-owned. |
| Job bypass | Cron or queue code writes state directly. | Jobs call workflows or commands. |
| Contract drift | Docs say one thing; code does another. | Update capability contract with behavior changes. |
| Scale mismatch | Agent creates packages/services too early. | Use the smallest layout that fits current deployables. |
| Context amnesia | New agent repeats an old decision. | Record non-goals, rejected paths, and tests. |
| One-entrypoint tunnel vision | Agent fixes web but misses bot/API/job. | Entrypoint map before implementation. |

## What agents should not do

- Do not start by renaming folders.
- Do not create a new abstraction before finding existing behavior.
- Do not patch one entrypoint when the behavior is shared.
- Do not put durable truth in UI, route, bot, or job code.
- Do not promote code to shared because it looks similar.
- Do not ignore an existing architecture that already answers ownership.
- Do not treat `context-mode`, `CodeGraph`, grep, or any index as the source of
  truth.
- Do not finish without verification evidence.

## Agent prompt

```txt
Use Capability Core + Adapters as a placement and verification routine.

First discover existing architecture, capability docs, entrypoints, tests, and
source of truth. Map this framework onto existing project names instead of
renaming folders.

Choose the smallest useful intervention. Reuse or extract a command/query path
when behavior crosses entrypoints. Keep durable rules in domain and concrete
SDK/database calls in platform adapters.

Update the capability contract if entrypoints, authority, source of truth,
lifecycle, degraded states, or commands/queries change.

Verify the shared behavior and at least one touched adapter. Report remaining
bypass paths and risks.
```
