# Example 02: shared ui, different semantics

## Problem

Three statuses look similar:

- capital allocation review required;
- Telegram session login required;
- booking link ready.

It is tempting to create:

```txt
shared/StatusCard.tsx
```

with props like:

```txt
kind="capital-review" | "telegram-login" | "booking-ready"
```

That makes the component visually reusable but semantically confused.

## Better shape

```txt
shared/ui/StatusPanel.tsx

capabilities/capital-allocation/
  ui/CapitalReviewStatus.tsx
  model/capital-review-view-model.ts

capabilities/telegram-session/
  ui/TelegramSessionStatus.tsx
  model/session-status-view-model.ts

capabilities/booking-link/
  ui/BookingStatus.tsx
  model/booking-status-view-model.ts
```

## Rule

Same visual shell does not mean same business meaning.

Share the shell. Keep semantic wrappers local.

## Why

Each status has a different:

- source of truth;
- authority;
- degraded state;
- lifecycle;
- user action;
- test surface.

Combining them creates a shared component with hidden product rules.

