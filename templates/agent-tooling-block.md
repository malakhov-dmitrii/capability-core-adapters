# Agent tooling block

Use this block in `AGENTS.md`, `CLAUDE.md`, or equivalent project guidance when
the project uses `context-mode`, `CodeGraph`, or similar retrieval tools.

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
```

Tool output supports the loop. It does not replace capability contracts, tests,
or source-of-truth decisions.
