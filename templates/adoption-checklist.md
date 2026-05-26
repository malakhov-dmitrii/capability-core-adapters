# Adoption Checklist

Use this checklist when introducing Capability Core + Adapters into a project.

## Project Baseline

- [ ] Identify current entrypoints.
- [ ] Identify existing feature/module folders.
- [ ] Identify durable state and external systems.
- [ ] Identify scripts, jobs, cron, workers, and bot handlers.
- [ ] Identify duplicated business rules.
- [ ] Identify shared UI with unclear semantics.

## First Capability

- [ ] Pick one active capability.
- [ ] Write a capability contract.
- [ ] List every entrypoint that touches it.
- [ ] Add tests or executable reproduction for current behavior.
- [ ] Thin the adapter.
- [ ] Extract command/query/workflow.
- [ ] Move durable rules into domain.
- [ ] Move concrete infrastructure calls into platform.
- [ ] Add contracts if a deployable or async boundary exists.
- [ ] Verify every entrypoint.

## Repo Setup

- [ ] Add framework docs.
- [ ] Add agent protocol or AGENTS.md snippet.
- [ ] Add capability contract template.
- [ ] Add first capability contract.
- [ ] Document remaining legacy areas.

## Done

- [ ] No global folder reshuffle was required.
- [ ] One real slice follows the framework.
- [ ] Tests prove behavior at command/query/domain level.
- [ ] Entrypoints no longer duplicate the same business logic.
- [ ] Remaining risks are documented.

