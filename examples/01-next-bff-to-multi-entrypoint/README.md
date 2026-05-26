# Example 01: next BFF to multi-entrypoint

## Starting point

A small Next app has one server action:

```txt
app/bookings/actions.ts
```

It validates form input, calls Eviivo, writes the database row, and calculates
status for the UI.

That is acceptable while the web app is the only entrypoint, but it becomes a
problem when a Telegram bot and retry job need the same behavior.

## Target shape

```txt
src/
  app/bookings/actions.ts
  app/bookings/page.tsx

  capabilities/booking-link/
    commands/create-booking-link.ts
    queries/get-booking-link-status.ts
    view-models/booking-link-card.ts
    tests/create-booking-link.test.ts

  domain/booking/
    booking-policy.ts
    booking-status.ts

  platform/eviivo/
    client.ts

  platform/db/
    booking-repository.ts
```

## Flow

```txt
Next server action -> createBookingLink -> booking policy -> eviivo client
Telegram handler   -> createBookingLink -> booking policy -> eviivo client
Retry job          -> recoverBookingLink -> booking policy -> eviivo client
```

## Rule

The server action remains an adapter. It does not own booking behavior.

## Migration steps

1. Add tests around the current server action behavior.
2. Extract the mutation into `createBookingLink`.
3. Move booking readiness and lifecycle rules into `domain/booking`.
4. Move Eviivo calls into `platform/eviivo`.
5. Change the server action to call the command.
6. Add Telegram/job entrypoints that call the same command or workflow.

