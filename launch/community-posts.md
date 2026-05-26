# Community Post Drafts

## Short Post

I published Capability Core + Adapters, a practical architecture framework for
apps that start as one full-stack product and later grow APIs, bots, jobs,
workers, MCP tools, scripts, mobile, or desktop clients.

Core idea:

```txt
Many entrypoints. One capability core.
Domain owns truth. Adapters stay thin.
Contracts define boundaries. Platform owns infrastructure.
```

It is not a folder religion and not a microservices pitch. It is a decision
framework for keeping behavior consistent as entrypoints multiply.

## Developer Community Post

Frontend feature slicing is helpful until your app stops being just a frontend.

What happens when the same behavior is used by:

- a Next server action;
- a Telegram bot;
- a Trigger.dev job;
- a public API;
- an MCP tool;
- a one-off repair script?

Capability Core + Adapters is my attempt to make that transition explicit:
entrypoints are adapters, capabilities own workflows, domain owns truth, and
platform owns infrastructure.

The repo includes docs, examples, templates, and optional agent skills.

## Agent Community Post

I made a small architecture framework plus optional `SKILL.md` packages for
coding agents.

The goal is to stop agents from putting business logic into whatever file they
happen to touch first: route handlers, server actions, bot handlers, jobs, or
random scripts.

The skill asks the agent to identify:

- capability;
- entrypoints;
- source of truth;
- authority;
- domain rules;
- contracts;
- platform dependencies;
- degraded states.

Then it pushes implementation toward thin adapters and shared command/query
behavior.

