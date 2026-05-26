# Hacker News Launch Draft

## Title Options

- Capability Core + Adapters: feature slicing for systems that outgrow one UI
- Show HN: Capability Core + Adapters, a practical architecture guide for growing apps
- A small architecture framework for apps that become APIs, bots, jobs, and workers

## Post

I put together a small architecture framework called Capability Core + Adapters.

It came out of a recurring problem: many products start as a simple full-stack
app, then grow a Telegram bot, background jobs, public APIs, MCP tools, scripts,
desktop/mobile clients, and external integrations. The original feature folders
or framework routes are no longer enough, but jumping straight to heavyweight
Clean Architecture or microservices is usually overkill.

The core rule is:

> Many entrypoints. One capability core. Domain owns truth. Adapters stay thin.
> Contracts define boundaries. Platform owns infrastructure.

The repo includes:

- human-facing docs;
- decision guides;
- capability contract templates;
- examples;
- optional SKILL.md packages for Claude Code/Codex-style agents.

The interesting part is not the folder tree. It is the ownership model:

- routes/jobs/bots/scripts are adapters;
- capabilities own workflows;
- domain owns durable truth;
- contracts own cross-deployable boundaries;
- platform owns SDKs, DB, queues, auth, telemetry;
- shared owns primitives only.

Feedback I am looking for:

- where does this break down in your stack?
- what edge cases should the decision guide cover?
- is the capability contract useful or too much ceremony?

