# Examples

These examples are intentionally small. They show ownership decisions rather
than framework-specific boilerplate.

## Included

- [01 - Next BFF to multi-entrypoint](01-next-bff-to-multi-entrypoint/README.md)
- [02 - Shared UI, different semantics](02-shared-ui-different-semantics/README.md)
- [03 - Backend-heavy service](03-backend-heavy-service/README.md)

## How To Read

Look for the direction of ownership:

```txt
adapter -> capability -> domain -> platform
```

The important part is not exact folder names. The important part is that every
entrypoint calls the same behavior instead of creating its own rules.

