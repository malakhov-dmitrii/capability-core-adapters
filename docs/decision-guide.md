# Decision guide

Use this guide when it is unclear where code belongs.

First ask whether this project already has a clear architecture. If it does,
adapt the decision rules to that architecture instead of replacing it.

## Placement decision tree

Ask in order.

### 1. is this only input/output glue?

Examples:

- parse HTTP request;
- read route params;
- map Telegram message payload;
- format CLI output;
- return JSON response.

Put it in the app or inbound adapter.

### 2. is this a user, operator, or business workflow?

Examples:

- create booking link;
- invite workspace member;
- review capital allocation;
- reconnect Telegram session;
- publish agent comment.

Put it in a capability.

### 3. is this truth, authority, lifecycle, reconciliation, or invariant?

Examples:

- who can approve;
- when status changes;
- whether money is available;
- how planned and actual state reconcile;
- when a session is ready;
- how stale external data degrades output.

Put it in domain.

### 4. does this cross deployables or async boundaries?

Examples:

- public API schema;
- event payload;
- job payload;
- mobile/web shared command input;
- MCP tool input/output.

Put it in contracts.

### 5. does this talk to infrastructure or external sdks?

Examples:

- database client;
- Stripe, Eviivo, Telegram, OpenAI;
- queue client;
- auth provider;
- telemetry;
- file storage.

Put it in platform.

### 6. is this a primitive with no product meaning?

Examples:

- button;
- dialog shell;
- input;
- generic formatter;
- generic date helper.

Put it in shared.

### 7. still unclear?

Keep it local to the first capability that needs it. Do not promote early.

## Reuse decision tree

### Same visual shape, different meaning

Share only the visual shell.

```txt
shared/ui/StatusPanel
capabilities/capital-allocation/CapitalReviewStatus
capabilities/telegram-session/TelegramSessionStatus
capabilities/booking-link/BookingStatus
```

### Same business rule, different UI

Move the rule to domain. Keep UI local.

### Same workflow from several entrypoints

Move the workflow to a capability command, query, or workflow.

### Same external system from several places

Move SDK access to platform.

### Same data crosses deployables

Move schema to contracts.

### Similar, but different reason to change

Duplicate intentionally.

## Promotion rule

Start local. Promote only when the reason to change is genuinely shared.

Promotion path:

```txt
local capability code -> capability public API -> domain / contracts / platform / shared
```

Do not move code to `shared` just because it is used twice. Check whether the
meaning, owner, and reason to change are also shared.

## Capability contract trigger

Write or update a capability contract when:

- more than one entrypoint uses the behavior;
- durable state changes;
- money, permissions, sessions, booking, external state, or automation authority
  is involved;
- jobs, cron, or scripts touch the same data as UI;
- a public API, bot, MCP, mobile, or desktop client is added;
- user-visible status/provenance/degraded states matter;
- ownership is ambiguous.

Use [the template](../templates/capability-contract.md).

## Existing architecture override

If the project already has a coherent architecture, do not force these names.
Map the responsibilities instead:

```txt
app/inbound adapter  -> existing controllers/routes/handlers
capability           -> existing use cases/application services/features
domain               -> existing domain/model/policy modules
contracts            -> existing schemas/protos/API/event packages
platform             -> existing infrastructure/adapters/integrations
shared               -> existing primitives/design-system/common utilities
```

Keep the existing names when they are clear. Change names only when the current
names hide ownership.
