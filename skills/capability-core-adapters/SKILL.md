---
name: capability-core-adapters
description: Use when designing, auditing, refactoring, or implementing project structure around capabilities, full-stack boundaries, thin adapters, domain truth, contracts, platform adapters, or migration from feature-sliced/frontend-only organization to multi-entrypoint architecture.
---

# Capability Core + Adapters

Use this skill to apply Capability Core + Adapters to a real project.

The goal is not to rename folders. The goal is to preserve ownership as a
product grows from one full-stack app into multiple entrypoints: web, API, bot,
worker, cron, MCP, desktop, mobile, and scripts.

Use this as a sane default when the project has no clearer architecture. If the
project already has coherent boundaries, map this framework onto the existing
terms instead of replacing them.

## Core rule

Use this placement rule when a project adopts the framework:

- entrypoints are adapters;
- capability commands, queries, and workflows own product behavior;
- domain modules own durable rules, lifecycle, authority, and invariants;
- contracts define deployable, public API, and async boundaries;
- platform modules own database, SDK, queue, auth, and provider calls.

## Workflow

1. Inspect existing architecture and naming conventions.
2. Search existing references before editing:
   - root and local `README.md`, `AGENTS.md`, `CLAUDE.md`;
   - architecture docs;
   - `docs/capabilities/*`;
   - commands, queries, workflows, modules, contexts;
   - routes, API handlers, bot handlers, jobs, scripts, MCP tools;
   - tests for the behavior.
3. Decide whether to apply directly, map onto existing names, or avoid using
   the framework for this task.
4. Identify the capability in product language.
5. Map every entrypoint that touches it:
   - route, page, server action, loader, API handler;
   - bot handler;
   - job, cron, queue, worker;
   - CLI, script, MCP, desktop, mobile bridge.
6. Identify durable truth:
   - money, permissions, sessions, booking, external state, generated status,
     reconciliation, automation authority, or shared lifecycle.
7. Classify code by responsibility:
   - app/inbound adapter;
   - capability command/query/workflow;
   - domain rule/invariant;
   - contract;
   - platform adapter;
   - shared primitive.
8. Keep behavior in commands/queries/workflows, not in entrypoints.
9. Keep durable truth in domain, not UI, route handlers, bot handlers, or jobs.
10. Keep SDK/database calls in platform adapters unless the app itself is the
   platform boundary.
11. Promote code upward only when the reason to change is genuinely shared.

## Placement decision tree

Ask in order:

1. Is this only input/output glue?
   - Put it in the app adapter.
2. Is this a user, operator, or business workflow?
   - Put it in a capability.
3. Is this truth, authority, lifecycle, reconciliation, or invariant?
   - Put it in domain.
4. Does this cross deployables or async boundaries?
   - Put it in contracts.
5. Does this talk to infrastructure or external SDKs?
   - Put it in platform.
6. Is this a primitive with no product meaning?
   - Put it in shared.
7. Still unclear?
   - Keep it local to the first capability and defer promotion.

## Reuse Rules

- Same visual shape, different semantics: share only the visual shell.
- Same business rule, different UI: move the rule to domain.
- Same workflow from several entrypoints: move it to a capability command/query.
- Same external system from several call sites: move SDK access to platform.
- Same data crosses deployables: put schema in contracts.
- Similar but different reason to change: duplicate intentionally.

## Refactoring Protocol

For existing projects:

1. Do not perform global folder reshuffles.
2. Preserve existing coherent architecture.
3. Choose one active capability.
4. Lock behavior with focused tests or an executable reproduction.
5. Thin the adapter first.
6. Extract command/query/workflow behavior.
7. Move durable rules to domain.
8. Move concrete infrastructure calls to platform.
9. Add contracts only when there is a second deployable, public API, async job
   payload, or external consumer.
10. Verify every relevant entrypoint still goes through the same path.

## Agent failure check

Before finishing, check for:

- route, bot, job, script, API, or MCP path still bypassing the command/query;
- product-specific logic placed in shared;
- domain rules left in UI or handler code;
- concrete SDK/database calls scattered across capabilities;
- capability contract missing or stale;
- tests that prove only one entrypoint while behavior is shared;
- new abstraction created without finding existing behavior first.

## When to create a capability contract

Create a contract when:

- more than one entrypoint touches the same behavior;
- durable state changes;
- background jobs or scripts touch UI-managed state;
- a bot, public API, MCP, mobile, desktop, or second app appears;
- status, provenance, stale data, or degraded states are user-visible;
- ownership is ambiguous.

Use the companion `capability-contract` skill when the task is specifically to
write or review the contract.

## Reference

Load `references/framework-cheatsheet.md` when you need compact terminology,
examples, or a summary to copy into project docs.

Read `docs/agent-operating-model.md` in the repository when the task involves
agent instructions, multi-entrypoint behavior, or preventing codebase drift.

Read `docs/agent-workflows.md` when the task needs staged planning, TDD,
subagents, review, recovery, or a finish gate.

Read `docs/agent-tooling.md` when the project uses `context-mode`, `CodeGraph`,
or similar retrieval tools. Use those tools for discovery and impact checks, not
as a replacement for ownership decisions, contracts, or tests.
