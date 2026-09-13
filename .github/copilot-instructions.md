# Copilot instructions for travel-os-copilot

## Project context

This repository is an Angular 22 teaching app for an AI-assisted travel planning workspace. It is intentionally built as a step-by-step learning project: each episode adds one slice of functionality, and `main` keeps moving forward as the app evolves.

The core product idea is a travel planner that shares a single trip state across routes and exposes the same domain tools to both the user and the AI assistant:

- `search`
- `add_stop`
- `remove_stop`
- `reorder_itinerary`
- `edit_stop`
- `get_trip_state`

The project is still early-stage: the current repo state is not a finished production app. The high-level scope and episode route map live in `docs/episodes.md`, with the first episode's exact boundary in `docs/tos-001-scope.md`.

Relevant sources to check before making decisions:

- `README.md`
- `docs/episodes.md`
- `docs/tos-001-scope.md`
- `AGENTS.md`

## Build, test, and validation commands

The repo uses `pnpm` as the package manager; `angular.json` is configured with `"packageManager": "pnpm"`.

Common commands:

```bash
pnpm install
pnpm start
pnpm build
pnpm test
```

Equivalent raw Angular CLI forms also work:

```bash
npx ng serve
npx ng build
npx ng test
```

There is no dedicated `lint` script in `package.json` today. If you need a single test run, prefer the Angular CLI test runner in watch-disabled mode:

```bash
pnpm exec ng test --watch=false
```

For a single spec file when the project is configured with Angular's include filter:

```bash
pnpm exec ng test --watch=false --include='src/**/*.spec.ts'
```

If a file-specific test is required, keep the scope narrow and prefer the spec file path over a full suite run.

## High-level architecture

This repo is not a large monorepo or enterprise app. The architecture is intentionally small and educational:

- Angular CLI project shell (`angular.json`, `package.json`, `tsconfig.json`)
- Episode-based feature work rather than a fixed long-lived app architecture
- Shared trip state across routes, rather than isolated per-screen state
- User-facing travel planning UI plus AI co-pilot behavior built around the same state transitions
- Minimal scaffolding; the project is intentionally early and does not yet include full auth, persistence, or deployment concerns

The big picture to preserve when editing code:

1. Route-level screens and trip data should share a common trip model.
2. AI actions should be represented as the same domain operations available to a user.
3. State changes must be visible and reversible, not hidden in local component-only state.
4. Episode scope matters: do not add broad production features (authentication, live travel data, persistence, deployment) unless the relevant doc or episode specifically calls for them.

## Key conventions in this repo

- Use English names for code, file names, and identifiers; the explanatory docs are in Egyptian Arabic.
- Prefer the Angular 22 conventions already captured in the repo's AI guidance: standalone components, signals, lazy routes, native control flow (`@if`, `@for`, `@switch`), `input()` / `output()`, `model()`, and `computed()` / `linkedSignal()` where appropriate.
- Keep the app aligned to the episode being worked on rather than introducing architecture from a later episode.
- Treat `README.md` and `docs/episodes.md` as the guardrails for scope; they clarify what is intentionally not included yet.
- Because this is a teaching project, prefer clear, minimal, educational code over over-engineered abstractions.
- `pnpm` is the canonical package manager for this repo; keep commands consistent with it.

## Working style for this repository

- Start from the docs before creating new files or broad app structure.
- Match the existing Angular CLI and Angular 22 baseline rather than adding unrelated frameworks or build tooling.
- Keep changes scoped to the active episode or feature; avoid unrelated cleanup.
- When the request is about adding UI, state, or AI behaviors, preserve a single source of truth for trip state and keep the app's user/AI actions consistent.

## MCP configuration

The repo already includes an Angular CLI MCP server in `.mcp.json`:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

This is the project-relevant MCP configuration for Angular work.
