# Agent tooling

Capability Core + Adapters can be used without any special tools. The method is
the ownership model: adapters, capabilities, domain, contracts, platform, and
shared primitives.

Add a retrieval layer when a project has at least one of these conditions:

- three or more packages or apps;
- long agent sessions with compaction;
- command, test, or log output that is too long to inspect directly in chat;
- several entrypoints touching the same behavior;
- backend-heavy modules with workflows, jobs, events, and platform adapters.

Those conditions make it easier for agents to miss existing commands,
contracts, tests, routes, jobs, or platform adapters.

This page describes two optional tool families that fit the framework:

- [context-mode](https://github.com/mksglu/context-mode) for high-output
  retrieval, indexed session continuity, and compact analysis results;
- [CodeGraph](https://github.com/colbymchenry/codegraph) for structural code
  navigation, symbol lookup, callers, callees, and impact checks.

They are helpers, not authority. A tool can make discovery cheaper, but it
cannot decide ownership by itself.

Installation and platform setup belong to the upstream docs. This repository
only describes how the tools fit the Capability Core + Adapters operating loop.
Do not copy version-sensitive install commands into project architecture docs.

## What each tool is for

| Tool | Use it for | Do not use it for |
| --- | --- | --- |
| `context-mode` | Large searches, noisy command output, external docs, web references, long-session continuity. | Replacing exact file inspection before edits. |
| `CodeGraph` | Structural questions: where a symbol is defined, what calls it, what it calls, what a change affects. | Reading prose docs, generated files, or files outside the graph. |

Use both when the task is broad:

```txt
context-mode -> gather and summarize large project/doc context
CodeGraph    -> map code structure and impact radius
CCA          -> decide ownership and update contracts
```

## Fit with the agent loop

### Discover

Use `context-mode` when discovery would produce too much raw output:

- repo-wide file lists;
- broad `rg` searches;
- long logs;
- large docs;
- fetched external references;
- previous session state.

Use `CodeGraph` when discovery is structural:

- find a command, query, workflow, handler, or domain rule by name;
- map callers and callees;
- locate route handlers and framework entrypoints;
- understand an existing capability before editing it.

### Classify

Use tool output to answer the placement questions:

- Is this an adapter?
- Is this capability behavior?
- Is this durable domain truth?
- Is this a contract boundary?
- Is this platform infrastructure?
- Is this truly shared?

Do not let a tool result override the source-of-truth question. A symbol can be
popular and still be in the wrong layer.

### Contract

Use `context-mode` to search docs, old decisions, and capability contracts.
Use `CodeGraph` to check whether the contract matches current code paths.

Update the contract when the tools reveal:

- a hidden entrypoint;
- a direct database or SDK bypass;
- a stale command/query path;
- tests that cover only one adapter while behavior is shared;
- a source-of-truth conflict between docs, code, and tests.

### Change

Use tools to choose the smallest intervention. Then edit normal files directly.

Do not let a retrieval tool become an implementation layer. Code changes still
need normal review, tests, and contract updates.

### Verify

Use `CodeGraph` before or after edits to check impact radius for shared
commands, domain rules, platform adapters, and contracts.

Use `context-mode` for noisy verification output, such as long test runs or
static analysis, when the exact full log is not needed in the conversation.

The final report should still name the exact commands, tests, and gaps.

### Record

Record what the tools found only when it changes project memory:

- new entrypoint discovered;
- stale contract corrected;
- bypass path left for later;
- impact radius broader than expected;
- missing test path.

## Recommended project guidance block

Copy this into `AGENTS.md`, `CLAUDE.md`, or equivalent project guidance when the
project uses these tools.

````md
## Optional agent tooling

Use Capability Core + Adapters as the ownership model. Use retrieval tools only
to make the model easier to apply.

When `context-mode` tools are available:

- use `ctx_batch_execute` for broad repo inspection and noisy command batches;
- use `ctx_execute` or `ctx_execute_file` for counting, filtering, summarizing,
  or parsing large outputs;
- use `ctx_search` for follow-up questions against indexed session or project
  context;
- use `ctx_fetch_and_index` before asking questions about large external docs;
- keep raw file reads for exact inspection before editing.

When `CodeGraph` tools are available and the project is indexed:

- use `codegraph_context` first for architecture, trace, or feature-area
  questions;
- use `codegraph_search` for symbol lookup;
- use `codegraph_callers` and `codegraph_callees` for one-hop flow checks;
- use `codegraph_impact` before editing shared commands, domain rules,
  platform adapters, or contracts;
- use `codegraph_explore` to inspect several related symbols in one pass;
- check `codegraph_status` when results look stale.

Do not skip the Capability Core + Adapters loop:

```txt
discover -> classify -> contract -> change -> verify -> record
````

Tool output supports the loop. It does not replace capability contracts, tests,
or source-of-truth decisions.
```

## Scale guidance

### Small project

The block is optional. Use normal search and tests unless discovery already
hurts.

Use `CodeGraph` if the project has enough code that symbol lookup and impact
checks save time.

### Growing full-stack app

Use both tools when the app gains a second entrypoint: API, bot, worker, cron,
script, MCP, desktop, or mobile.

The agent should use tools to find every path into the behavior before moving
logic into a command/query.

### Monorepo

Use `context-mode` for repo-wide inspection and package-level summaries.

Use `CodeGraph` to prevent cross-app imports, hidden callers, and accidental
changes to shared packages.

### Backend-heavy system

Use `CodeGraph` for impact checks around domain rules, workflows, repositories,
events, and platform adapters.

Use `context-mode` for long logs, migrations, jobs, operational scripts, and
external integration docs.

## Failure modes

| Failure | What happens | Countermeasure |
| --- | --- | --- |
| Tool-as-authority | Agent trusts an index instead of checking source of truth. | Treat tools as discovery aids, not ownership decisions. |
| Stale graph | Agent follows old structure after edits or branch changes. | Check index health or fall back to direct inspection. |
| Context dump | Agent reads huge output into the conversation. | Use compact execution/search tools for large outputs. |
| Hidden files | Generated, ignored, or external files are not indexed. | Confirm whether the relevant file class is indexed. |
| Local-only setup | Docs assume tools exist everywhere. | Keep tooling optional and provide a no-tool fallback. |
| Over-instrumentation | Small project gets tool ceremony before it has discovery pain. | Add tools when search, impact, or session continuity becomes a real cost. |

## Minimal adoption

Add this only after the project has the base framework docs:

```txt
AGENTS.md
docs/architecture/capability-core-adapters.md
docs/architecture/agent-operating-model.md
docs/architecture/agent-tooling.md
```

Then decide per project whether to install the tools or only keep the guidance
for agents that already have them.
