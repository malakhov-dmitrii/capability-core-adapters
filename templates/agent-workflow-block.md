# Agent workflow block

Use this block in `AGENTS.md`, `CLAUDE.md`, or equivalent project guidance when
the project wants a clear agent execution process.

## Agent workflow

Use Capability Core + Adapters as the ownership model. Use the lightest process
that protects the change.

Default loop:

```txt
discover -> classify -> contract -> change -> verify -> record
```

Use a planned slice when a change touches durable behavior, several entrypoints,
domain rules, jobs, public APIs, or contracts:

```txt
clarify -> acceptance criteria -> current state -> plan -> execute -> review -> finish
```

Use TDD for bug fixes and rule changes:

```txt
reproduce -> failing test -> fix -> refactor -> verify
```

Use team or subagent workflows only when lanes are independent:

- exploration;
- architecture critique;
- implementation;
- review;
- verification.

One owner must integrate team output. Do not let two agents change the same
capability contract or command path independently.

Before finishing, report:

- changed files;
- capability and entrypoints touched;
- contract changes or why no contract changed;
- verification commands and results;
- remaining bypass paths, stale docs, or risks.
