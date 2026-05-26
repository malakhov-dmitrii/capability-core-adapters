# Problem map

This page explains the problem Capability Core + Adapters is trying to solve.

It is not a new name for feature folders. It is a way to stop the same behavior
from being implemented separately in routes, APIs, bots, jobs, and scripts.

## How the problem appears

The first version of a feature usually has one path:

```txt
web route -> validate input -> update database -> call provider -> return result
```

Then the product gets another way to do the same thing:

```txt
bot command -> parse message -> update database -> call provider -> return reply
```

Then operations add repair or retry code:

```txt
cron job -> load failed rows -> update database -> call provider -> mark status
```

Each path looks reasonable when written. The problem is the combined system:

```txt
web route     -> rule copy A
bot command   -> rule copy B
cron job      -> rule copy C
public API    -> rule copy D
repair script -> rule copy E
```

When the rule changes, every copy must change. If one path is missed, behavior
drifts.

## What the framework changes

The framework does not start by moving folders. It starts by naming the behavior
that all entrypoints need.

```txt
web route     \
bot command    \
cron job        -> capability command/query -> domain rule -> platform adapter
public API     /
repair script /
```

Entry points stay thin. The capability owns the workflow. The domain owns the
rule. Platform adapters own concrete infrastructure calls.

## What each layer answers

| Layer | Question it answers |
| --- | --- |
| App / adapter | How does this entrypoint receive and return data? |
| Capability | What user, operator, or business workflow is happening? |
| Domain | What rule, lifecycle, status, or authority must stay consistent? |
| Contract | What schema crosses a deployable or async boundary? |
| Platform | Which database, provider, queue, SDK, or auth system is used? |
| Shared | Which primitive has no product meaning? |

## Example drift

Before:

```txt
web action:
  validates room id
  calls provider
  stores status = "ready"

bot command:
  skips room validation
  calls provider
  stores status = "created"

retry job:
  retries all failed rows
  stores status = "ready"
```

After:

```txt
createBookingLink:
  validates room id once
  calls provider through platform adapter
  returns one status model

web action:
  calls createBookingLink

bot command:
  calls createBookingLink

retry job:
  calls retryBookingLink
```

## What not to do

Do not use the framework to:

- rename every folder;
- create empty layers;
- split services before ownership is clear;
- put all repeated code in `shared`;
- hide business meaning inside generic UI components;
- replace an existing architecture that already answers these questions.

Use it when the current project does not have a better answer for ownership.
