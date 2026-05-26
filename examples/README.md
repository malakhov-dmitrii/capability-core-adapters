# Examples

These examples are intentionally small. They show ownership decisions rather
than framework-specific boilerplate.

## Included

- [01 - Next BFF to multi-entrypoint](01-next-bff-to-multi-entrypoint/README.md)
- [02 - Shared UI, different semantics](02-shared-ui-different-semantics/README.md)
- [03 - Backend-heavy service](03-backend-heavy-service/README.md)
- [04 - First adoption run](04-first-adoption-run/README.md)

## How To Read

Look for the direction of ownership:

```txt
adapter -> capability -> domain -> platform
```

When reading the examples, focus on ownership direction rather than exact folder
names. The intended pattern is that entrypoints call shared behavior instead of
creating separate rule paths.

For the rules behind that pattern, see
[Framework](../docs/framework.md) and
[Full-stack boundaries](../docs/full-stack-boundaries.md).
