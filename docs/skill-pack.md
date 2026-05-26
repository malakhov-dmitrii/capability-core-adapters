# Agent skill pack

This repository includes optional skills for Claude Code, Codex, and agents that
understand `SKILL.md`-style packages.

The docs are the source of truth. Skills are thin procedural entrypoints.

## Included skills

```txt
skills/
  capability-core-adapters/
    SKILL.md
    references/framework-cheatsheet.md

  capability-contract/
    SKILL.md
    references/contract-review-checklist.md
    assets/capability-contract.md
```

## Capability-core-adapters

Use when:

- designing project structure;
- refactoring route/server-action/bot/job logic;
- reviewing capability boundaries;
- adapting an existing project;
- deciding whether code belongs in app, capability, domain, contracts, platform,
  or shared.

## Capability-contract

Use when:

- writing a capability contract;
- reviewing source of truth and authority;
- defining lifecycle and degraded states;
- checking cross-entrypoint behavior;
- preparing a risky capability for implementation.

## Installation

Copy a skill directory into the agent's local or project skill path.

Examples:

```txt
.claude/skills/capability-core-adapters/
.claude/skills/capability-contract/
```

or any equivalent skill directory supported by your agent.

## Project-level agent instructions

For agents that read `AGENTS.md`, use the root [AGENTS.md](../AGENTS.md) or copy
the relevant section from [templates/agents-snippet.md](../templates/agents-snippet.md).

For multi-agent or long-running work, also read
[Agent operating model](agent-operating-model.md). It explains the
`discover -> classify -> contract -> change -> verify -> record` loop and the
agent failure modes this framework is meant to prevent.

For projects using context-oriented or graph-oriented retrieval tools, also read
[Agent tooling](agent-tooling.md). It describes how `context-mode` and
`CodeGraph` support discovery and impact checks without becoming architecture
authority.

## Design principle

Keep skills concise. Put stable reference material in docs. Do not make the
skill pack the only place where the architecture is explained.
