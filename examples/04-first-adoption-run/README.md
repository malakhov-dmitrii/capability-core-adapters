# Example 04: First Adoption Run

This fictional example shows how to try the framework without committing to a
full architecture migration.

The scenario is synthetic. It exists to demonstrate the first adoption workflow,
not to document a specific production system.

## Scenario

A project has:

- a web page where users create booking links;
- a Telegram bot command that should create the same links;
- a background job that retries failed link creation;
- an external booking provider;
- a database row tracking link status.

The current code works, but each entrypoint owns part of the behavior.

## Before

```txt
apps/web/app/bookings/actions.ts
  validates input
  calls provider
  writes db
  calculates status

apps/telegram-bot/src/handlers/booking.ts
  validates input differently
  calls provider directly
  writes db differently

apps/worker/src/jobs/retry-booking-link.ts
  reads failed rows
  calls provider directly
  writes db directly
```

## First Capability Contract

```txt
docs/capabilities/booking-link.md
```

Minimum answers:

```txt
Capability: booking-link

Entry points:
- web server action
- Telegram bot command
- retry job

Source of truth:
- local booking_link row for internal state
- external booking provider for actual URL validity

Authority:
- user/operator can request a link
- provider creates the actual URL
- retry job can retry failed provider calls

Commands:
- createBookingLink(input)
- retryBookingLink(input)

Queries:
- getBookingLinkStatus(input)

Non-goals:
- full booking management
- payment lifecycle
- provider admin configuration
```

## Smallest Useful Change

Extract one command:

```txt
packages/capabilities/booking-link/commands/create-booking-link.ts
```

Then make web and bot call it:

```txt
web action       -> createBookingLink()
telegram handler -> createBookingLink()
```

The retry job can stay unchanged for the first PR if that keeps the slice small,
but the contract should name it as a remaining entrypoint.

## After First PR

```txt
apps/web/app/bookings/actions.ts
  parses form
  calls createBookingLink()
  maps result to UI response

apps/telegram-bot/src/handlers/booking.ts
  parses message
  calls createBookingLink()
  maps result to Telegram reply

packages/capabilities/booking-link/commands/create-booking-link.ts
  owns workflow

packages/domain/booking/booking-link-policy.ts
  owns lifecycle/status rules

packages/platform/booking-provider/client.ts
  owns provider SDK/API calls
```

## Verification

```txt
createBookingLink command test:
- creates a link through provider
- stores status consistently
- returns the same result shape for web and bot

domain policy test:
- provider success -> ready
- provider failure -> retryable failure
- missing provider URL -> blocked/degraded

adapter smoke:
- web action calls command
- bot handler calls command
```

## What Not To Do

Do not:

- move every booking file in one PR;
- create packages before a second entrypoint needs shared behavior;
- make a generic `StatusCard` own booking semantics;
- let the retry job keep a permanent direct-write path;
- rename framework folders just to match this repo.

## Result

The first adoption run is successful if:

- web and bot share the command;
- source of truth is documented;
- retry job risk is explicit;
- tests cover the command and domain rule;
- no unrelated code moved.
