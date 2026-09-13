Travel OS Copilot — an Angular 22 teaching project built episode-by-episode for the ArabicAngular YouTube series. All routes share a single trip state model; the AI co-pilot uses the same six domain tools as the user (`search`, `add_stop`, `remove_stop`, `reorder_itinerary`, `edit_stop`, `get_trip_state`); every AI change must be visible and reversible.

## Commands

Package manager is `pnpm` (`angular.json` → `cli.packageManager`).

```bash
pnpm install
pnpm start          # ng serve, http://localhost:4200
pnpm build          # ng build
pnpm test           # ng test (Vitest runner)
```

No watching test run: `pnpm exec ng test --watch=false`. For a single file: `pnpm exec ng test --watch=false --include='src/**/*.spec.ts'`. No lint script yet.

An Angular CLI MCP server is configured in `.mcp.json` (`npx -y @angular/cli mcp`) — prefer its tools over raw `ng` invocations when available.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Formatting

Prettier (`printWidth: 100`, single quotes, Angular parser for `.html`) — see `.prettierrc`. Two-space indent, single quotes in `.ts` — see `.editorconfig`.

## Pitfalls

- **Pre-scaffold state:** `angular.json` has empty `"projects": {}` and there is no `src/` directory yet. No working build exists. Check before editing — application source may not exist yet.
- **Episode discipline:** Work is scoped to the active episode (almost always the lowest-numbered not yet built). Do not build ahead of scope (no auth, live data, AI, persistence, or extra routes unless the current episode scope doc calls for them). Check `docs/tos-NNN-scope.md` for in-scope/out-of-scope lists.
- **Fixtures:** `fixtures/trip.fixture.json` is the canonical sample trip (Cairo weekend, 4 stops) used by early pre-AI episodes — keep it small and readable.
- **Version recording:** Angular/Node/npm versions must be recorded in `docs/versions.md` from real `package.json`/`node -v` output at recording time — never from memory.
