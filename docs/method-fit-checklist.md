# Method Fit Checklist

Use this checklist before adopting Capability Core + Adapters in a project.

The goal is to decide whether the framework is a good default, a partial fit, or
not needed.

## 1. Existing Architecture

- Does the project already have a coherent architecture?
- Can the current architecture explain ownership?
- Can it explain source of truth?
- Can it explain cross-entrypoint behavior?
- Are people already following it successfully?

If yes, do not replace it. Borrow only useful rules.

## 2. Entrypoints

Which entrypoints exist or are likely soon?

- web routes/pages/server actions;
- API handlers;
- bot handlers;
- background jobs;
- cron/scripts;
- MCP tools;
- desktop/mobile bridges;
- public integrations.

The more entrypoints share behavior, the better the fit.

## 3. Durable Truth

Does the project have state that must remain consistent across entrypoints?

- money;
- permissions;
- sessions;
- bookings;
- external API state;
- generated recommendations;
- automation decisions;
- lifecycle status;
- reconciliation.

If yes, domain and capability boundaries matter.

## 4. Current Pain

Which pain is real?

- duplicated business logic;
- route handlers growing into backends;
- jobs bypassing UI rules;
- `shared` becoming unclear;
- public APIs diverging from app behavior;
- agents putting code wherever they happen to be editing.

If none of these are real, adoption can wait.

## 5. Team And Agent Context

- Will multiple people or agents work in the project?
- Do they need a shared default?
- Is current project guidance vague?
- Are architecture decisions being rediscovered repeatedly?

If yes, this framework can reduce drift.

## 6. Fit Verdict

### Good Default

Use Capability Core + Adapters as the project default when:

- there is no better existing architecture;
- several entrypoints exist or are plausible;
- durable truth matters;
- agents or multiple contributors need guidance.

### Partial Fit

Use selected parts when:

- the frontend already has a good feature-sliced structure;
- backend boundaries are the weak point;
- the project has a strong domain model but weak adapter discipline;
- only agent instructions need hardening.

### Poor Fit

Do not adopt as a default when:

- the project is a small throwaway prototype;
- a specialized architecture is already required;
- the team already has a coherent method;
- the main issue is product discovery, not code structure.

## Adoption Rule

If fit is uncertain, apply the framework to one active capability only. Do not
run a global migration.

