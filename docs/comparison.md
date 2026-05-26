# Comparison With Related Patterns

Capability Core + Adapters is intentionally derivative. It combines useful
ideas from existing patterns and makes them operational for modern agent-assisted
full-stack projects.

## Feature-Sliced Design

Feature-Sliced Design is useful for frontend structure. It encourages
feature-oriented organization, public APIs, and dependency direction.

Capability Core + Adapters keeps the useful ownership idea but extends it to:

- backend workflows;
- jobs and queues;
- bots and scripts;
- public APIs and MCP;
- domain authority and source-of-truth decisions.

The difference:

```txt
FSD: frontend slices and layers
CCA: multi-entrypoint product behavior and full-stack authority
```

## Widget Sliced Design

Widget Sliced Design is a lighter frontend-oriented slicing model.

Capability Core + Adapters can use the same local-first spirit, but does not
treat UI widgets as the primary boundary once durable state or multiple
entrypoints are involved.

## Vertical Slice Architecture

Vertical Slice Architecture organizes work by use case instead of technical
layer.

Capability Core + Adapters agrees, but adds explicit distinctions between:

- inbound adapters;
- capabilities;
- domain truth;
- contracts;
- platform adapters.

This helps when several entrypoints need the same use case.

## Hexagonal Architecture / Ports and Adapters

Hexagonal Architecture separates core behavior from external systems.

Capability Core + Adapters uses that idea, but makes the "core" product-facing:
capabilities own workflows, domain owns truth, platform owns concrete adapters.

## Clean Architecture

Clean Architecture provides strong dependency rules.

Capability Core + Adapters is less ceremonial. It is designed to be introduced
one capability at a time without forcing a full layered rewrite.

## DDD and Bounded Contexts

DDD is valuable when the domain is complex and language matters.

Capability Core + Adapters uses DDD-lite:

- product language for capabilities;
- explicit source of truth;
- bounded contexts when modules grow;
- service extraction only when operationally justified.

## Modular Monolith

Capability Core + Adapters pairs well with a modular monolith. A bounded context
can start as a module and later become a service if deployment, scale, security,
or ownership require it.

## What This Framework Is Not

- not a universal folder tree;
- not a replacement for framework conventions;
- not a requirement to create packages early;
- not a microservices pitch;
- not a license to over-abstract;
- not a rule that all repeated UI must be shared.

It is a decision framework for ownership.

