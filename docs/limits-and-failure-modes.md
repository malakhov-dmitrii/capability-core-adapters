# Limits And Failure Modes

Capability Core + Adapters is a default, not a cure-all.

Its job is to give teams and agents a clear starting model when a project has no
better structure yet. It should help code evolve without hiding authority,
duplicating business logic, or turning `shared` into a junk drawer.

If it becomes ceremony, it has failed.

## What The Framework Optimizes For

It optimizes for:

- clear ownership;
- consistent behavior across entrypoints;
- gradual migration;
- agent-friendly decision rules;
- preserving domain truth as clients multiply;
- avoiding premature microservices;
- avoiding frontend-only architecture in full-stack systems.

It does not optimize for:

- maximal initial speed for throwaway prototypes;
- distributed systems design;
- high-frequency trading or hard real-time systems;
- regulated safety-critical workflows;
- database modeling by itself;
- organization charts and team topology;
- replacing framework conventions.

## Failure Mode: Folder Religion

Symptom:

- every project gets the same folder tree;
- empty folders appear to satisfy the model;
- files move without changing ownership;
- PRs become architecture churn.

Correction:

- start with one active capability;
- keep framework routes where they are;
- move behavior only when it clarifies ownership;
- keep existing architecture if it already works.

## Failure Mode: Capability Sprawl

Symptom:

- every button, modal, hook, or endpoint becomes a capability;
- capabilities are too small to own meaningful behavior;
- developers cannot find the actual workflow.

Correction:

- name capabilities in product language;
- merge slices that always change together;
- keep primitives in shared;
- use capability contracts only for meaningful ownership boundaries.

## Failure Mode: Fake Shared

Symptom:

- visually similar UI becomes a shared component with product-specific flags;
- the component hides different sources of truth;
- changes for one product meaning break another.

Correction:

- share visual shells only;
- keep semantic wrappers local;
- move true business rules to domain;
- duplicate intentionally when reasons to change differ.

## Failure Mode: Route-Owned Backend

Symptom:

- server actions, route handlers, or loaders contain durable business logic;
- bot handlers and jobs copy that logic later;
- public APIs bypass UI behavior.

Correction:

- treat routes, jobs, bots, APIs, MCP tools, and scripts as adapters;
- extract commands, queries, and workflows;
- make every entrypoint call the same core behavior.

## Failure Mode: Domain Theater

Symptom:

- a `domain/` folder exists but contains framework-specific glue;
- business rules still live in UI or routes;
- "domain service" becomes a new name for miscellaneous orchestration.

Correction:

- domain owns truth, lifecycle, invariants, and authority;
- capabilities own workflows;
- platform owns concrete SDKs and persistence;
- if a rule cannot be tested without the framework, it probably is not domain
  yet.

## Failure Mode: Premature Contracts

Symptom:

- schemas are created before any boundary exists;
- internal types are versioned as if they were public APIs;
- teams spend more time maintaining contracts than changing the product.

Correction:

- create contracts when deployables, async systems, or external consumers cross
  a boundary;
- keep one-deployable projects simple;
- promote only when a real second consumer appears.

## Failure Mode: Over-Extracted Platform

Symptom:

- every SDK call gets an interface before tests or replacement pressure exist;
- platform adapters become thin wrappers around thin wrappers;
- the app becomes harder to read without gaining flexibility.

Correction:

- isolate concrete infrastructure where it is repeated, hard to test, or
  authority-sensitive;
- do not abstract stable one-off infrastructure only for aesthetics.

## Failure Mode: Agent Overreach

Symptom:

- agents impose this framework on a project with an existing system;
- agents rename folders instead of fixing behavior;
- agents create contracts for unclear work without checking source of truth.

Correction:

- agents must inspect current architecture first;
- agents must preserve existing coherent patterns;
- agents should use this framework as a default only when the project lacks a
  better one;
- agents must write capability contracts before risky cross-entrypoint work.

## Failure Mode: Microservice Drift

Symptom:

- modules are treated as future services by default;
- service extraction happens before data ownership and operations are clear;
- local calls become network boundaries without a reason.

Correction:

- use modular monolith boundaries first;
- extract services only for deployment, scale, ownership, security, or
  operational isolation;
- do not confuse folder boundaries with service boundaries.

## The Hard Stop Rule

Stop applying the framework when:

- the source of truth is unknown;
- the proposed slice cannot explain authority;
- a migration would touch many unrelated areas;
- tests cannot prove the invariant being moved;
- existing architecture already answers the ownership question better.

In those cases, narrow the work, write a capability contract, or keep the
existing architecture.

