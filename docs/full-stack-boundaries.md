# Full-stack boundaries

Full-stack frameworks make it easy to put server behavior next to UI. That is
useful, but location is not ownership.

Capability Core + Adapters separates:

- framework entrypoints;
- product workflows;
- durable domain truth;
- infrastructure adapters;
- cross-deployable contracts.

## Next.js, TanStack start, remix, SvelteKit

These frameworks provide server-side entrypoints:

- server actions;
- route handlers;
- loaders and actions;
- server functions;
- server routes.

In this framework they are inbound adapters.

They may:

- parse input;
- validate boundary data;
- perform boundary auth;
- call commands and queries;
- format the result.

They should not:

- own business rules;
- duplicate mutations;
- calculate authoritative status;
- directly orchestrate several external systems when a capability command should
  own that workflow.

## BFF mode

When the web app is the only client, a full-stack app can act as a
backend-for-frontend.

```txt
web route/action -> capability -> domain -> platform
```

This is fine. The important part is that route/action code stays thin.

## Second entrypoint rule

When a second entrypoint appears, extract shared behavior immediately.

Examples:

- Telegram bot needs the same booking flow as web;
- Trigger.dev job retries work started by web;
- public API exposes the same mutation;
- CLI script repairs the same state.

Bad:

```txt
web action       -> db update + external API + status rule
telegram handler -> another db update + another status rule
cron             -> direct repair update
```

Good:

```txt
web action       -> createBookingLink()
telegram handler -> createBookingLink()
cron             -> recoverBookingLink()
```

## Monorepo boundary

In a monorepo, prefer conceptual symmetry over identical folders.

```txt
apps/web/src/capabilities/booking-link
apps/bot/src/handlers/booking
apps/worker/src/jobs/booking
packages/capabilities/booking
packages/domain/booking
packages/contracts/booking
packages/platform/eviivo
```

Frontend capabilities own UX. Backend modules own durable behavior. Contracts
own boundaries between deployables.

## Service boundary

Do not split services because folders look separate. Split services when one of
these is true:

- independent deployment is necessary;
- scaling characteristics diverge;
- security boundaries differ;
- ownership differs;
- data ownership is clear;
- operational isolation is worth the overhead.

Until then, use a modular monolith.

## Background jobs

Jobs are adapters. They should call the same commands and domain rules as other
entrypoints.

```txt
Trigger.dev task -> capability workflow -> domain -> platform
cron script      -> capability workflow -> domain -> platform
queue consumer   -> capability workflow -> domain -> platform
```

Jobs should not silently bypass UI-visible rules.

## Public API and MCP

Public API and MCP tools are also adapters.

They need contracts because external consumers may depend on them:

```txt
public route / MCP tool -> contract validation -> capability command/query
```

Do not expose internal capability file shapes as public contracts.

## Desktop and mobile

Desktop and mobile clients are separate apps. They should use contracts or
public command/query APIs rather than importing backend internals.

If a desktop app has a local backend process, that process is another adapter
or deployable. Keep its business behavior aligned through shared capabilities,
domain, and contracts.

## Boundary formula

```txt
Capability-first inside one deployable.
Contract-first between deployables.
Domain-first for truth.
Adapter-thin everywhere.
```

