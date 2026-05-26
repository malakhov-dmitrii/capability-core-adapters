# Hacker News launch plan

## Ground rules

Use Hacker News for critique, not promotion.

Official constraints to respect:

- [Show HN](https://news.ycombinator.com/showhn.html) is for work people can
  try and discuss. Reading material should be a regular submission, not Show HN.
- The same page says not to ask friends to upvote or comment.
- [HN guidelines](https://news.ycombinator.com/newsguidelines.html) say not to
  use HN primarily for promotion.
- HN guidelines also say not to post generated or AI-edited comments.

That means the repo needs a try path before posting:

1. open the repo;
2. copy the agent snippet or workflow block;
3. write one capability contract;
4. run the first adoption checklist on one behavior.

If the README does not make that path obvious, submit as a regular link or wait.

## Recommended format

Use `Show HN` only if the repo feels like a usable toolkit, not only an essay.

Submit the GitHub repo directly.

Preferred title:

```txt
Show HN: Capability Core + Adapters for agent-friendly app structure
```

Other acceptable titles:

```txt
Show HN: Capability Core + Adapters for apps with routes, bots, jobs, and APIs
Show HN: Project structure for apps that outgrow one UI
Show HN: Agent-friendly structure for multi-entrypoint apps
```

Avoid:

```txt
A sane default architecture for every growing app
The future of agentic software architecture
Feature-Sliced Design is not enough anymore
```

Those titles overclaim or start a fight before people open the repo.

## Positioning

Lead with the failure mode:

```txt
An app starts as one full-stack UI. Then it grows a bot, background jobs,
public APIs, scripts, MCP tools, and maybe mobile or desktop clients.
Humans and coding agents start patching the nearest route, handler, job, or
helper. The same behavior now has several paths.
```

Then name the repo's answer:

```txt
Capability Core + Adapters tries to make ownership explicit:
entrypoints are adapters, capabilities own workflows, domain owns durable truth,
contracts define public/async/deployable boundaries, platform owns
infrastructure, and shared owns primitives.
```

Then name what people can inspect:

- docs;
- examples;
- capability contract template;
- adoption checklist;
- `AGENTS.md` snippet;
- optional `SKILL.md` packages;
- agent workflow and tooling guidance.

## First comment structure

Do not paste an AI-written comment into HN. Write it manually from this outline.

1. One sentence: why this repo exists.
2. One short paragraph: the concrete drift problem.
3. One list: the ownership model.
4. One list: what is in the repo.
5. One sentence: what the repo is not.
6. Four critique questions.

Use this as a checklist, not as copy:

```txt
- I built this after seeing route/job/bot/API paths diverge.
- The agent angle matters because agents often edit the closest file.
- The repo is a default for projects with no better boundary system.
- It is not a microservices pitch and not a replacement for a working architecture.
- I want criticism on failure modes, ceremony, capability contracts, and missing examples.
```

## Expected objections

### clean architecture

Answer:

```txt
It borrows the adapter/core distinction, but the repo is not trying to enforce a
full Clean Architecture template. The narrower goal is a default placement and
verification routine for apps that add bots, jobs, APIs, scripts, and agents.
```

### vertical slices

Answer:

```txt
It is close in spirit. The difference is that the slice is not just a UI feature
or route. The docs focus on shared behavior across entrypoints, source of truth,
contracts, platform adapters, and agent instructions.
```

### ceremony

Answer:

```txt
That is a valid failure mode. The repo says to use one active capability, avoid
global reshuffles, skip contracts until a real boundary exists, and stop if the
method does not clarify ownership.
```

### mostly docs

Answer:

```txt
Fair pushback. The repo includes templates, examples, adoption checklist,
AGENTS snippets, and optional skills that can be copied into a project. If that
still reads as only an essay, a regular submission is a better fit.
```

## Pre-flight checklist

- README has a visible try path.
- The repo link opens without signup.
- The first adoption example is easy to find.
- The HN title does not overclaim.
- The maintainer can answer comments for the next few hours.
- No one is asked to upvote or comment.
- First comment is written manually by the maintainer.

## What not to do

- Do not call it universal.
- Do not frame it as a replacement for Clean Architecture, FSD, vertical slices,
  or modular monoliths.
- Do not use "AI agents" as a hype hook without explaining the file-placement
  failure mode.
- Do not argue with every objection.
- Do not delete and repost because the first attempt was slow.
