# Telegram channel draft

## Main post

Я собрал небольшой репозиторий про архитектуру проектов, которые вырастают из
одного full-stack приложения во что-то менее аккуратное:

- веб;
- API;
- Telegram-бот;
- фоновые jobs;
- cron/scripts;
- MCP tools;
- mobile/desktop клиенты;
- интеграции с внешними сервисами.

Проблема обычно не в том, что нет папок. Папки как раз есть. Проблема в том,
что один и тот же product behavior начинает жить в нескольких местах.

Например:

```txt
web route      -> делает бизнес-решение
bot handler    -> делает похожее решение
retry job      -> чинит состояние напрямую
public API     -> валидирует немного иначе
repair script  -> пишет в базу в обход основного пути
```

С людьми это уже неприятно. С агентами становится быстрее хуже: агент часто
чинит ближайший handler, route или helper, не найдя существующий workflow,
source of truth и другие entrypoints.

Я попробовал упаковать это в простой default:

```txt
entrypoints are adapters
capabilities own workflows
domain owns durable truth
contracts define public/async/deployable boundaries
platform owns DB/SDK/queues/auth/providers
shared owns primitives only
```

Назвал это Capability Core + Adapters.

Это не попытка заменить Clean Architecture, vertical slices, FSD или modular
monolith. Скорее минимальный набор правил для момента, когда проекта уже больше,
чем один UI, но микросервисы и тяжелая архитектурная церемония еще не нужны.

В репозитории есть:

- README с общей моделью;
- decision guide;
- limits and failure modes;
- method-fit checklist;
- examples;
- capability contract template;
- adoption checklist;
- `AGENTS.md` snippet;
- optional `SKILL.md` packages для Claude Code/Codex-подобных агентов;
- отдельные docs про agent workflows и tooling типа context-mode/CodeGraph.

Главная мысль: новый entrypoint не получает право изобрести новую копию
бизнес-логики. Он адаптер. Он должен найти или вызвать capability
command/query/workflow.

Я не считаю это серебряной пулей. Более того, в docs отдельно написано, когда
это не надо применять: если у проекта уже есть нормальные границы, если это
маленький одноразовый прототип, если проблема на самом деле в product discovery,
или если внедрение превращается в переименование папок.

Хочу покритиковать это об реальные проекты.

Особенно интересно:

- где такой подход сломается;
- где capability contract станет лишней бюрократией;
- каких примеров не хватает;
- как лучше формулировать инструкции для агентов, чтобы они не разносили
  кодовую базу локально правильными правками.

Репозиторий:
https://github.com/malakhov-dmitrii/capability-core-adapters

## Short version

Собрал репозиторий про architecture default для проектов, которые начинались как
один full-stack app, а потом обросли API, ботами, jobs, scripts, MCP tools,
mobile/desktop клиентами и агентами.

Проблема: один и тот же behavior начинает жить в routes, handlers, jobs и
scripts. Агенты это ускоряют, потому что часто чинят ближайший файл вместо того,
чтобы найти общий workflow и source of truth.

Идея:

```txt
entrypoints are adapters
capabilities own workflows
domain owns durable truth
contracts define boundaries
platform owns infrastructure
shared owns primitives
```

Это не “новая серебряная пуля”, а sane default, когда нормальной системы еще
нет.

Внутри: docs, examples, templates, `AGENTS.md` snippet, optional `SKILL.md`,
agent workflows/tooling notes.

Хочу критику: где сломается, где слишком много ceremony, каких примеров не
хватает.

https://github.com/malakhov-dmitrii/capability-core-adapters

## Follow-up post

Отдельно важная часть в Capability Core + Adapters не про папки, а про агентов.

Когда агент получает задачу “почини Telegram flow” или “добавь это еще и в job”,
его дефолтное движение часто такое:

```txt
open nearest handler
patch local logic
add helper
move on
```

Локально правка может быть правильной. Системно она может создать второй путь
для того же behavior.

Поэтому я добавил в repo отдельный agent loop:

```txt
discover -> classify -> contract -> change -> verify -> record
```

Расшифровка:

- discover: найти docs, contracts, commands, tests, entrypoints, source of truth;
- classify: понять, это adapter, capability, domain, contract, platform или
  shared;
- contract: обновить capability contract, если поменялись entrypoints,
  authority, lifecycle или degraded states;
- change: сделать минимальную правку;
- verify: проверить общий path и хотя бы один adapter;
- record: оставить evidence, bypass paths и risks.

Это нужно не для красоты процесса. Это нужно, чтобы следующий агент не начинал
с нуля и не повторял старую ошибку.
