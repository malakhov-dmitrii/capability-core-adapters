# Getting started

Use this guide when you want to try Capability Core + Adapters on a real project
without doing a rewrite.

The first run should take 30 to 60 minutes. The goal is not to reorganize the
project. The goal is to prove whether the framework clarifies one real behavior.

The first-run rules below are local heuristics for this framework. They follow
the same bias as small-step refactoring and avoid-hasty-abstraction guidance:
change one concrete behavior, preserve behavior with tests, and delay promotion
until reuse has a clear reason.

## 0. start with fit

Before moving files, answer:

- Does the project already have a clear architecture?
- Is there one behavior touched by more than one entrypoint?
- Is there durable state or external authority involved?
- Is current pain real: duplication, route-owned logic, job bypasses, unclear
  shared code, or agent drift?

If the answer is mostly no, do not adopt yet. Read
[method-fit-checklist.md](method-fit-checklist.md) and stop.

## 1. pick one capability

Choose one active behavior, not a whole project.

Good first candidates:

- a server action that a bot or job also needs;
- an API route and a UI flow that mutate the same state;
- a cron/script that repairs state created by the app;
- a shared UI component with product-specific flags;
- a feature agents keep editing in inconsistent places.

Bad first candidates:

- a global folder migration;
- a design-system rewrite;
- a new package layout without behavior changes;
- a speculative future service split.

## 2. name it in product language

Use a name a product person or operator would understand:

```txt
booking-link
telegram-session
workspace-invitation
capital-allocation-review
agent-comment-flow
```

Avoid:

```txt
api
components
hooks
utils
services
modals
```

## 3. map entrypoints

List every way the behavior is invoked:

```txt
web route/page/server action:
API handler:
bot handler:
job/cron/queue:
CLI/script:
desktop/mobile bridge:
MCP/public tool:
```

For a first trial, prefer a local change when there is only one entrypoint and
no durable truth to protect.

## 4. write a small capability contract

Copy the template:

```sh
mkdir -p docs/capabilities
cp templates/capability-contract.md docs/capabilities/<capability-name>.md
```

In the draft contract, write known facts and label unknowns explicitly.

Minimum required sections:

- Summary;
- Entry Points;
- Source Of Truth;
- Authority;
- Commands;
- Queries;
- Domain Rules;
- Platform Dependencies;
- Tests;
- Non-Goals.

If source of truth or authority is unclear, stop broad implementation. Clarify
the contract first.

## 5. choose one intervention

Pick the smallest useful change.

### Thin an adapter

Before:

```txt
route handler -> validate + calculate status + update db + call external API
```

After:

```txt
route handler -> command
command       -> domain rule -> platform adapter
```

### Share a workflow

Before:

```txt
web action -> one version of mutation
bot        -> another version of mutation
job        -> repair script with direct db writes
```

After:

```txt
web action -> createThing()
bot        -> createThing()
job        -> recoverThing()
```

### Split visual reuse from meaning

Before:

```txt
shared/StatusCard with product-specific flags
```

After:

```txt
shared/ui/StatusPanel
capabilities/<name>/ui/<MeaningfulStatus>
```

### Move durable truth to domain

Before:

```txt
UI or route calculates authoritative status
```

After:

```txt
domain policy calculates status
UI displays view model and provenance
```

## 6. test the boundary

At minimum:

- command/query test for behavior;
- domain test for durable rules;
- adapter smoke test or focused integration test for wiring;
- regression test for any bug or duplicate behavior being fixed.

Do not claim adoption because files moved. Claim it only when behavior is proven
through the new boundary.

## 7. commit the slice

For this method, a useful first adoption commit says:

- which capability was touched;
- which entrypoints now share behavior;
- which source of truth was clarified;
- what was tested;
- what was intentionally not migrated.

## Agent prompt

Use this prompt with a coding agent:

```txt
Apply Capability Core + Adapters to one active capability only.

Follow this loop: discover -> classify -> contract -> change -> verify -> record.

First inspect existing README/AGENTS/CLAUDE files, architecture docs,
capability contracts, commands, queries, workflows, entrypoints, tests, and
source-of-truth code. If the project already has coherent boundaries, map the
framework onto existing names instead of renaming folders.

Pick the smallest useful intervention:
- thin one adapter;
- extract one command/query;
- move one durable rule to domain;
- isolate one platform dependency;
- or split visual reuse from semantic reuse.

Write or update a capability contract before touching broad behavior.
Do not perform a global folder reshuffle.
Verify with focused tests, list remaining bypass paths, and report known risks.
```

## Success criteria

Treat the first run as useful when:

- one capability has a contract;
- one adapter is thinner;
- duplicated behavior is reduced or a source of truth is clearer;
- tests prove the behavior;
- no unrelated architecture churn happened.

If that does not happen, do not force the framework on this slice. Stop and
reassess the fit.

## Further reading

- [Martin Fowler: Refactoring](https://refactoring.com/)
- [Kent C. Dodds: AHA Programming](https://kentcdodds.com/blog/aha-programming)
- [Sandi Metz: The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)
