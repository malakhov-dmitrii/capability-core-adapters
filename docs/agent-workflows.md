# Agent workflows

Capability Core + Adapters defines where product behavior belongs. It also needs
an operating process for agents that change that behavior.

This page describes workflow patterns that fit the framework. They are inspired
by three agent workflow projects:

- [Superpowers](https://github.com/obra/superpowers), which presents a
  skills-based software development methodology with brainstorming, planning,
  TDD, code review, and finishing steps;
- [oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode), which
  provides staged multi-agent orchestration and session observability for Claude
  Code;
- [oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent), which
  provides an OpenCode-oriented harness with agent roles, background agents,
  session tools, AST/LSP tools, and model routing.

These projects are references, not dependencies. Use their ideas when they fit
the project and agent harness. Keep Capability Core + Adapters as the ownership
model.

## Process levels

Use the lightest process that protects the work.

| Level | Use when | Process |
| --- | --- | --- |
| Direct slice | Small, local, low-risk change. | `discover -> classify -> change -> verify -> record` |
| Planned slice | Behavior change touches contracts, domain rules, jobs, or several entrypoints. | `discover -> clarify -> contract -> plan -> implement -> review -> finish` |
| TDD slice | Bug fix or rule change where behavior must be locked. | `reproduce -> failing test -> fix -> refactor -> verify` |
| Team slice | Broad work with independent research, implementation, or review tracks. | `plan -> delegate -> integrate -> verify -> finish` |
| Recovery slice | Broken build, failed migration, stale contract, or drift across entrypoints. | `triage -> isolate -> repair -> regression test -> record` |

Do not promote a task to team mode because it feels important. Use team mode
when parallel work reduces risk or time.

## Default single-agent workflow

Use this for most changes:

```txt
discover -> classify -> contract -> change -> verify -> record
```

The output of each step should be concrete:

| Step | Required output |
| --- | --- |
| Discover | Existing docs, entrypoints, commands, tests, source of truth. |
| Classify | Adapter, capability, domain, contract, platform, or shared. |
| Contract | New, updated, or explicitly unchanged capability contract. |
| Change | Smallest code/doc change that preserves ownership. |
| Verify | Commands, tests, and manual checks that prove the changed boundary. |
| Record | Final report with changed files, bypass paths, risks, and gaps. |

## Planned workflow

Use a planned workflow when the agent is about to change durable behavior.

```txt
clarify -> write acceptance criteria -> map current state -> plan -> execute -> review -> finish
```

Minimum artifacts:

- short problem statement;
- capability name;
- affected entrypoints;
- source of truth and authority;
- acceptance criteria;
- test or reproduction plan;
- implementation tasks;
- verification commands;
- known non-goals.

The plan should mention file paths or modules when they are known. If the plan
cannot name the source of truth, do not start broad implementation.

## TDD workflow

Use TDD when a bug, policy, lifecycle rule, reconciliation rule, or command/query
contract is being changed.

```txt
1. Write or run a failing reproduction.
2. Add the smallest failing test through a public boundary.
3. Make the test pass with the smallest useful change.
4. Refactor only while tests are green.
5. Run the relevant verification suite.
6. Record what behavior the test now protects.
```

Good test targets:

- capability command/query;
- domain rule or state transition;
- adapter wiring for route, bot, API, job, or script;
- platform adapter contract when infrastructure behavior is mocked or faked.

Avoid tests that only prove one adapter when the behavior is shared.

## Team workflow

Use team or subagent workflows when work can be split without losing ownership.

Good subagent lanes:

- exploration: map files, entrypoints, tests, and existing commands;
- architecture critique: source of truth, authority, contract boundaries;
- implementation: one bounded task with exact files and verification steps;
- review: spec compliance, behavior risk, code quality, missing tests;
- verification: run tests, inspect failures, collect evidence.

Bad subagent lanes:

- two agents editing the same capability without coordination;
- one agent changing contracts while another changes code against the old
  contract;
- broad "clean up the architecture" tasks with no capability boundary;
- speculative service extraction.

For team work, assign one owner to integration. The owner reconciles contracts,
tests, and final reporting.

## Review workflow

Every non-trivial agent change should get a review pass before completion.

Review questions:

- Did the change keep adapters thin?
- Did shared behavior move to a capability command/query/workflow?
- Did durable truth move to domain?
- Did infrastructure calls stay in platform?
- Did contracts change when deployable, async, or public boundaries changed?
- Do tests cover the shared path and at least one touched adapter?
- Did the agent record remaining bypass paths or stale contracts?

Critical review findings block completion. Minor style findings do not block if
the behavior is correct and the project formatter/linter can handle them.

## Finish workflow

Finishing is not a summary. It is a verification gate.

Before finishing, the agent should have:

- no untracked accidental files;
- relevant tests, lint, typecheck, or docs validation run;
- capability contracts updated or explicitly unchanged;
- stale docs noted or fixed;
- known gaps listed;
- final report written in project terms, not agent-process terms.

When using a branch or worktree, finishing should also state whether the work is
ready to merge, needs review, or should remain as an experiment.

## Workflow fit by project scale

### Small app

Default to direct slice or TDD slice.

Do not introduce team orchestration or detailed planning for small text edits,
single-file fixes, or UI copy.

### Growing full-stack app

Use planned slices when a route, server action, bot, job, or API starts sharing
behavior.

Use TDD for command/query extraction and domain rule moves.

### Monorepo

Use team slices when exploration, implementation, and verification can happen in
separate packages or apps.

Require an integration owner. Cross-package work should not finish without
contract and affected-test evidence.

### Backend-heavy system

Use planned and review workflows for workflows, events, jobs, migrations,
platform adapters, and public contracts.

Use team mode when one lane can inspect operational behavior while another lane
works on implementation or tests.

## Workflow failure modes

| Failure | What happens | Countermeasure |
| --- | --- | --- |
| Process theater | Agent writes a plan that does not constrain code. | Plans must name capability, source of truth, tests, and files when known. |
| Infinite planning | Agent keeps refining instead of making a small verified change. | Timebox planning and move to one slice. |
| Team chaos | Multiple agents produce incompatible edits. | Assign one integration owner and contract authority. |
| Review as polish | Review catches wording but misses behavior drift. | Review ownership, source of truth, and tests first. |
| TDD bypass | Agent writes code first and adds tests after. | For bug/rule changes, require failing reproduction before fix. |
| Finish without evidence | Agent reports completion without commands or gaps. | Final report must name verification and remaining risk. |

## Reference mapping

| Reference | Useful idea for this framework |
| --- | --- |
| Superpowers | Spec before code, plan before execution, TDD, review, finish gate. |
| oh-my-claudecode | Staged multi-agent pipeline, advisor/critic artifacts, observability. |
| oh-my-openagent | Harness-level roles, background agents, session tools, model/category routing. |

Do not copy their command syntax into project docs unless the project actually
uses that harness. Link to upstream docs for installation and harness-specific
commands.
