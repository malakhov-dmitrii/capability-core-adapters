# Example 03: Backend-Heavy Service

## Context

The product started as a web app, but now most behavior is backend-owned:

- public API;
- worker jobs;
- Telegram bot;
- MCP tools;
- lightweight admin UI.

## Target Shape

```txt
apps/
  api/
  worker/
  bot/
  admin-web/
  mcp-server/

modules/
  booking/
    capabilities/
      commands/
      queries/
      workflows/
    domain/
    contracts/
    platform/

  telegram-session/
    capabilities/
    domain/
    contracts/
    platform/
```

## Rule

Backend modules become bounded contexts. They do not need to become services
until deployment, scaling, ownership, or security requires it.

## Flow

```txt
API route     -> booking command -> booking domain -> platform
worker job    -> booking workflow -> booking domain -> platform
bot handler   -> booking command -> booking domain -> platform
MCP tool      -> booking query   -> booking domain -> platform
admin UI      -> contract/API    -> booking command/query
```

## Service Extraction

Extract a module into a service only when:

- it has clear data ownership;
- independent deployment is required;
- scaling characteristics differ;
- security isolation matters;
- operational overhead is worth it.

