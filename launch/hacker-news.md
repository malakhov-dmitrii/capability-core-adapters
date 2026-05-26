# Hacker news launch draft

## Title options

- Capability Core + Adapters: feature slicing for systems that outgrow one UI
- Show HN: Capability Core + Adapters, a practical architecture guide for growing apps
- A small architecture framework for apps that become APIs, bots, jobs, and workers
- A sane default architecture for apps before they have a better one

## Post

I put together a small architecture framework called Capability Core + Adapters.

It came out of a problem I kept running into: a product starts as a simple
full-stack app, then adds a Telegram bot, background jobs, public APIs, MCP
tools, scripts, desktop/mobile clients, and external integrations. The original
feature folders or framework routes no longer explain ownership, but jumping
straight to heavyweight Clean Architecture or microservices is usually too much.

This is not meant to be a universal architecture or a replacement for a system
that already works. It is a sane default for projects that do not yet have clear
ownership rules, plus a checklist for deciding when not to apply it.

The operating rule in the repo is:

- entrypoints are adapters;
- capability commands and queries own workflow behavior;
- domain modules own durable rules;
- contracts define deployable and async boundaries;
- platform modules own infrastructure calls.

The repo includes:

- human-facing docs;
- decision guides;
- limits and failure modes;
- method-fit checklist;
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
- where does the "sane default" become overreach?
