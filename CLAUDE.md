# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Travel OS Copilot is an Angular 22 teaching project built episode-by-episode on camera for the "Angular and AI" series on [@ArabicAngular](https://www.youtube.com/@ArabicAngular). Video explanations are in Egyptian Arabic; all code, identifiers, and file names are in English. The app itself is the teaching vehicle, not a throwaway demo — each episode adds one real slice of functionality and teaches one Angular feature clearly.

**Current status: pre-scaffold.** `angular.json` has an empty `"projects": {}` and there is no `src/` yet — no working build, no AI wired up, no authentication. Do not assume application source exists; check before editing.

Intended technical foundation (the target shape, not yet all built):

- All routes share a single trip state model — no isolated per-screen state.
- The AI co-pilot uses the same six domain tools available to the user: `search`, `add_stop`, `remove_stop`, `reorder_itinerary`, `edit_stop`, `get_trip_state`.
- Every change the AI makes must be visible and reversible.

Read these before making non-trivial changes, in this order:

1. `README.md` — the project pitch and idea. Arabic version at `README.ar.md`.
2. `docs/episodes.md` — the episode-to-route map; each `TOS-NNN` episode closes one module of the underlying course and maps to one real feature slice.
3. `docs/tos-001-scope.md` — exact in/out scope for the current episode (TOS-001: a guest screen showing fixture trip data, one visible outcome, nothing else).
4. `AGENTS.md` — the Angular/TypeScript coding conventions (below).

## Episode discipline

Work is scoped to whichever episode is active, almost always the lowest-numbered one not yet built. **Do not build ahead of the active episode's documented scope** — e.g. don't add auth, live data, AI responses, persistence, or extra routes unless the current episode's scope doc calls for them. When in doubt, check `docs/tos-001-scope.md` (or the equivalent `tos-NNN` scope doc once it exists) for the explicit in-scope/out-of-scope lists.

Each episode is tagged in git (`tos-001`, `tos-002`, ...) matching the code shown in that video. `main` keeps moving after each episode.

Angular/Node/npm versions actually installed must be recorded in `docs/versions.md` from the real `package.json`/`node -v` output at recording time — never filled in from memory. TOS-001's row is filled; re-verify before recording if time has passed.

Any Angular API claim made on camera must be verified against Angular docs or the installed package's `.d.ts` before recording — never stated from memory, per `docs/episodes.md`. This mirrors the global rule in `~/.claude/CLAUDE.md`.

## Commands

Package manager is `pnpm` (`angular.json` → `cli.packageManager`).

```bash
pnpm install
pnpm start          # ng serve, http://localhost:4200
pnpm build          # ng build
pnpm test           # ng test (Vitest runner)
```

There is no `lint` script yet. For a non-watching single test run:

```bash
pnpm exec ng test --watch=false
```

Once `src/` exists with spec files, scope a single-file run with Angular's include filter rather than running the full suite:

```bash
pnpm exec ng test --watch=false --include='src/**/*.spec.ts'
```

An Angular CLI MCP server is already configured in `.mcp.json` (`npx -y @angular/cli mcp`) — prefer its tools over raw shell `ng` invocations when available, per that server's own instructions (discover workspace first, then fetch best practices before writing code).

## Angular/TypeScript conventions (from AGENTS.md)

Full detail lives in `AGENTS.md`; the load-bearing points:

- Standalone components only; do not set `standalone: true` (default in v20+) or `changeDetection: ChangeDetectionStrategy.OnPush` explicitly (default in v22+).
- Signals for state: `input()`/`output()` (not decorators), `model()` for two-way binding, `computed()` for derived state, `linkedSignal()` for state derived from multiple reactive sources. Never `.mutate()` — use `update()`/`set()`.
- Native control flow (`@if`/`@for`/`@switch`), not `*ngIf`/`*ngFor`/`*ngSwitch`. `class`/`style` bindings, not `ngClass`/`ngStyle`.
- No `@HostBinding`/`@HostListener` — use the `host` object on the decorator.
- Signal Forms (`@angular/forms/signals`) for new forms (stable in v22+); Reactive Forms otherwise. Avoid template-driven forms.
- `inject()` over constructor injection; prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singletons (v22+).
- Must pass AXE checks and WCAG AA (focus management, contrast, ARIA).
- Don't assume ambient globals (e.g. `new Date()`) are available in templates/SSR contexts.

Formatting: Prettier (`printWidth: 100`, single quotes, Angular parser for `.html`) — see `.prettierrc`. Two-space indent, single quotes in `.ts`, per `.editorconfig`.

## Big picture to preserve when editing

1. Route-level screens read/write one shared trip model — resist adding component-local copies of trip state.
2. Whatever the AI is later given to act on the trip must be expressed as the same domain operations (`search`, `add_stop`, `remove_stop`, `reorder_itinerary`, `edit_stop`, `get_trip_state`) a human user would use — don't invent parallel AI-only mutation paths.
3. State changes need to be visible and reversible in the UI, not silent.
4. `fixtures/trip.fixture.json` is the canonical sample trip (Cairo weekend, 4 stops) used by early, pre-AI, pre-backend episodes — keep it small and readable since it's shown on camera.
