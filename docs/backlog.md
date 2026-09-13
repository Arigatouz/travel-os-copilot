# Travel OS Copilot: Full Backlog

Generated backlog for the 12-episode Co-Pilot build arc plus repo hygiene, mapped to the
Angular 21 & 22: Zero to Advanced curriculum. Story format follows story-writer/story-breakdown
conventions: BDD acceptance criteria, Fibonacci points, Risk Radar.

TOS-001 is the only episode with a written scope doc (`docs/tos-001-scope.md`) and is held to
that exact scope. Later milestones carry roadmap-grade stories to be refined when their episode
goes active, per the episode discipline rule in `CLAUDE.md`.

Source data: `docs/episodes.md`, `docs/business-docs/*.md`, `docs/prototype/*.html`,
`fixtures/trip.fixture.json`.

---

## STORY:TOS-000-S1
TITLE: Add a CI pipeline running pnpm build and pnpm test on every PR
MILESTONE: TOS-000 Repo hygiene
LABELS: type:chore, episode:tos-000, route:cross-cutting, topic:ci-cd, P0, points:3
BODY:
**Chore:** There is no CI pipeline yet. Nothing runs `pnpm build` or `pnpm exec ng test --watch=false` automatically, so a broken build or a failing test can be merged without anyone noticing until the next episode's recording session. Add a GitHub Actions workflow that runs both commands on every push and pull request targeting `main`.

## Tasks
- [ ] DevOps: Create `.github/workflows/ci.yml` that installs dependencies with pnpm and runs `pnpm build` and `pnpm exec ng test --watch=false` on `push` and `pull_request` events targeting `main`.
- [ ] DevOps: Pin the Node and pnpm versions used in the workflow to match `docs/versions.md` (Node 26.8.2, pnpm as declared in `package.json`'s `packageManager` field).
- [ ] Documentation: Note in `README.md` that the pipeline is expected to fail on `pnpm build` until TOS-001 scaffolds the actual Angular application (`angular.json` currently has an empty `"projects": {}`), so this is not a regression.

## Metadata
- Points: 3 (Fibonacci) | Priority: P0 | Risk: 7/20
- Curriculum video: N/A (repo hygiene chore, not tied to a curriculum lesson)
- Route doc: N/A
- Prototype reference: N/A

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-000-S2
TITLE: Add issue and PR templates matching the backlog's story/task format
MILESTONE: TOS-000 Repo hygiene
LABELS: type:chore, episode:tos-000, route:cross-cutting, topic:ci-cd, P1, points:2
BODY:
**Chore:** This backlog uses a consistent body format for stories and chores (ملخص for user-facing stories, Story, Acceptance criteria, Tasks, Metadata, Definition of done). Nothing in the repo enforces that shape when someone opens a new GitHub issue or PR by hand, so future issues will drift from the format used here. Add issue templates for user stories and chores, and a PR template, mirroring the sections in this backlog draft.

## Tasks
- [ ] Documentation: Create `.github/ISSUE_TEMPLATE/user-story.md` with ملخص, Story (As a / I want / so that), Acceptance criteria (AC1-AC3), Tasks, Metadata, and Definition of done sections.
- [ ] Documentation: Create `.github/ISSUE_TEMPLATE/chore.md` with a Chore description line, Tasks, Metadata, and Definition of done sections, and no ملخص/Story/AC requirement.
- [ ] Documentation: Create `.github/pull_request_template.md` with a summary, linked issue reference, a test plan checklist, and a Definition of done checklist matching the one used in this backlog.

## Metadata
- Points: 2 (Fibonacci) | Priority: P1 | Risk: 4/20
- Curriculum video: N/A (repo hygiene chore, not tied to a curriculum lesson)
- Route doc: N/A
- Prototype reference: N/A

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-000-S3
TITLE: Review and commit or discard the uncommitted AGENTS.md edit
MILESTONE: TOS-000 Repo hygiene
LABELS: type:chore, episode:tos-000, route:cross-cutting, topic:ci-cd, P1, points:1
BODY:
**Chore:** `AGENTS.md` currently has an uncommitted local diff in the working tree: it rewrites the opening summary and adds Commands, Formatting, and Pitfalls sections. This content is useful (it documents the pnpm commands, Prettier config, and pre-scaffold pitfalls) but it only exists on disk right now and will be lost on a clean checkout or `git clean`. Review the diff against the repo's actual current state, decide whether to keep it, and commit that decision.

## Tasks
- [ ] Documentation: Run `git diff AGENTS.md`, check each added section (Commands, Formatting, Pitfalls, and the rewritten intro) against the real repo state, and correct anything that is inaccurate or already stated elsewhere (for example, overlap with `CLAUDE.md`).
- [ ] Documentation: Either commit the reviewed `AGENTS.md` changes with a clear message, or revert the file to its committed version if the content is fully superseded by `CLAUDE.md`.

## Metadata
- Points: 1 (Fibonacci) | Priority: P1 | Risk: 5/20
- Curriculum video: N/A (repo hygiene chore, not tied to a curriculum lesson)
- Route doc: N/A
- Prototype reference: N/A

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-000-S4
TITLE: Remove the docs/ blanket entry from .gitignore before it discards the backlog docs
MILESTONE: TOS-000 Repo hygiene
LABELS: type:chore, episode:tos-000, route:cross-cutting, topic:ci-cd, P0, points:1
BODY:
**Chore:** `.gitignore` had a bare `docs` entry under a "# Guides" section (added in the `ng new` scaffold commit, c2d3bd9), which silently excluded the entire `docs/` directory from git. This is why `docs/episodes.md`, `docs/tos-001-scope.md`, and `docs/versions.md` appeared to vanish from HEAD: they were never actually deleted, they simply stopped being trackable. The same entry would have discarded every doc created during this backlog build (`docs/backlog.md`, `docs/business-docs/`, `docs/prototype/`) had it not been caught before the first commit.

The `.gitignore` also had `README.ar.project.md` and `README.project.md` entries; those files were draft scratch copies that have since been consolidated into `README.md` and `README.ar.md` and removed, so those two lines are also now moot.

## Tasks
- [x] Documentation: Remove the bare `docs` entry and the two `README.*.project.md` entries from `.gitignore`.
- [ ] Documentation: `git add docs/` and commit the restored and newly created docs (episodes.md, tos-001-scope.md, versions.md, backlog.md, backlog-manifest.json, business-docs/, prototype/) so they survive going forward.
- [ ] Testing: After committing, run `git status` and confirm `docs/` no longer appears as untracked.

## Metadata
- Points: 1 (Fibonacci) | Priority: P0 | Risk: 3/20
- Curriculum video: N/A (repo hygiene chore, not tied to a curriculum lesson)
- Route doc: N/A
- Prototype reference: N/A

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-001-S1
TITLE: Guest dashboard screen renders the fixture trip
MILESTONE: TOS-001 Zoneless shell
LABELS: type:user-story, episode:tos-001, route:dashboard, topic:zoneless, topic:signals, P0, points:3
BODY:
## ملخص
الشاشة الأساسية بتاعة الـ guest لازم تعرض بيانات الرحلة اللي جاية من fixtures/trip.fixture.json: العنوان، الوجهة، وتواريخ البداية والنهاية. الهدف إننا نتأكد إن الشاشة بتقرا البيانات من مصدر واحد مش hardcoded جوه الـ template.

## Story
**As a** trip planner, **I want** to open the app and immediately see my trip's core details, **so that** I know which trip I am looking at before I do anything else.

## Acceptance criteria
**AC1: Trip details render from fixture data**
- Given the guest opens the app's single screen
- When the dashboard component loads
- Then the trip title ("Cairo weekend"), destination ("Cairo, Egypt"), and date range (2026-10-09 to 2026-10-11) from `fixtures/trip.fixture.json` are all visible on screen

**AC2: Malformed fixture data does not silently break the screen**
- Given the fixture file has a malformed or missing required field during local development
- When the app attempts to build
- Then the build fails with a visible error, not a blank or broken layout with no explanation

**AC3: Long field values do not break the layout**
- Given the trip title or destination were unusually long text
- When the screen renders
- Then the text wraps or truncates within its container instead of overflowing the viewport or breaking the layout

## Tasks
- [ ] Frontend: Scaffold the Angular application project in this workspace (`angular.json` currently has an empty `"projects": {}`) and bootstrap it with zoneless change detection.
- [ ] Frontend: Build a guest dashboard component that reads `fixtures/trip.fixture.json` and renders the trip title, destination, and date range.
- [ ] Testing: Add a unit test confirming the trip title and destination render on screen from the fixture.
- [ ] Documentation: Note in `docs/business-docs/02_dashboard.md` (or a short comment near the component) that TOS-001 implements only the fixture-rendering slice of the full dashboard spec, not the complete panel set.

## Metadata
- Points: 3 (Fibonacci) | Priority: P0 | Risk: 7/20
- Curriculum video: 05 (Module 1: Foundations and The New Era, Co-Pilot Build #1: Scaffolding the Agentic Travel App, Zoneless Shell)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## TASK:TOS-001-S1-T1
OF: TOS-001-S1
TITLE: Scaffold the Angular application with zoneless bootstrap
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:zoneless, topic:signals
BODY:
`angular.json` currently has an empty `"projects": {}` and there is no `src/` directory. Scaffold the actual Angular application in this workspace and bootstrap it with zoneless change detection, using the Angular CLI MCP tools (`list_projects`, `get_best_practices`) before writing any code.

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] Every Angular API claim (zoneless bootstrap provider) sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated if the scaffold changes any documented command or path
END TASK

## TASK:TOS-001-S1-T2
OF: TOS-001-S1
TITLE: Build the guest dashboard component reading the fixture trip
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:zoneless, topic:signals
BODY:
Build the standalone component for the app's single guest screen. It should import `fixtures/trip.fixture.json`, hold it in a signal, and render the trip title, destination, and date range in the template via interpolation, not hardcoded strings.

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] Acceptance criteria (AC1-AC3 of TOS-001-S1) verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
END TASK

## TASK:TOS-001-S1-T3
OF: TOS-001-S1
TITLE: Unit test for trip title and destination rendering
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:zoneless, topic:signals
BODY:
Add a component test that renders the guest dashboard component and asserts the trip title and destination text from the fixture both appear in the rendered DOM.

## Definition of done
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria (AC1) verified via the test, not just visually
END TASK

## TASK:TOS-001-S1-T4
OF: TOS-001-S1
TITLE: Document the partial dashboard implementation scope
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:zoneless, topic:signals
BODY:
`docs/business-docs/02_dashboard.md` describes the full future dashboard (four panels, co-pilot status, etc.). Add a short note there or near the component clarifying that TOS-001 only implements the trip title, destination, date range, and stop list slice.

## Definition of done
- [ ] `docs/` updated
- [ ] Note is accurate against what TOS-001-S1 and TOS-001-S2 actually ship
END TASK

## STORY:TOS-001-S2
TITLE: Guest dashboard displays the itinerary stop list
MILESTONE: TOS-001 Zoneless shell
LABELS: type:user-story, episode:tos-001, route:dashboard, topic:signals, P0, points:2
BODY:
## ملخص
بعد ما الشاشة عرضت تفاصيل الرحلة، محتاجين نعرض قائمة الـ stops الأربعة من نفس الـ fixture بالترتيب، كل stop باسمه واليوم بتاعه. ده أول خطوة لعرض الـ itinerary.

## Story
**As a** trip planner, **I want** to see the list of stops already planned for my trip, **so that** I can review what is scheduled without opening a separate screen.

## Acceptance criteria
**AC1: All fixture stops render**
- Given the fixture trip has 4 stops
- When the guest dashboard loads
- Then all 4 stops appear in a list, each showing at least its name and day

**AC2: A stop with a missing optional field still renders**
- Given a stop is missing an optional field such as `estimatedCost`
- When that stop renders
- Then the stop still displays cleanly without a broken layout, a console error, or the literal text "undefined"

**AC3: An empty stop list does not break the screen**
- Given the stops array were empty
- When the dashboard loads
- Then the itinerary area renders no stop rows and the rest of the screen stays intact, with no crash and no broken layout; the explicit empty-state message itself is TOS-002's scope, not this story's

## Tasks
- [ ] Frontend: Render the four fixture stops as a list inside the guest dashboard component, showing each stop's name and day.
- [ ] Testing: Add a unit test confirming all four fixture stops render in the stop list.
- [ ] Documentation: Update the note from TOS-001-S1 (`docs/business-docs/02_dashboard.md` or component comment) to confirm the stop list slice is implemented.

## Metadata
- Points: 2 (Fibonacci) | Priority: P0 | Risk: 6/20
- Curriculum video: 05 (Module 1: Foundations and The New Era, Co-Pilot Build #1: Scaffolding the Agentic Travel App, Zoneless Shell)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## TASK:TOS-001-S2-T1
OF: TOS-001-S2
TITLE: Render the fixture stop list in the guest dashboard
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:signals
BODY:
Add the stop list rendering to the guest dashboard component, reading stops from the same fixture signal used for the trip details, showing each stop's name and day.

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] Acceptance criteria (AC1-AC3 of TOS-001-S2) verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
END TASK

## TASK:TOS-001-S2-T2
OF: TOS-001-S2
TITLE: Unit test for the fixture stop list
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:signals
BODY:
Add a component test asserting all 4 fixture stop names appear in the rendered stop list.

## Definition of done
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria (AC1) verified via the test
END TASK

## TASK:TOS-001-S2-T3
OF: TOS-001-S2
TITLE: Confirm stop list scope note is accurate
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:signals
BODY:
Update the TOS-001-S1-T4 documentation note to reflect that the stop list (name and day per stop) is now implemented, still scoped short of the full Itinerary Stops panel from `docs/business-docs/02_dashboard.md`.

## Definition of done
- [ ] `docs/` updated
END TASK

## STORY:TOS-001-S3
TITLE: A changed fixture value is visibly reflected on the dashboard
MILESTONE: TOS-001 Zoneless shell
LABELS: type:user-story, episode:tos-001, route:dashboard, topic:signals, P1, points:1
BODY:
## ملخص
عشان نثبت إن الشاشة فعلاً بتقرا من البيانات مش بتعمل hardcode لحاجة، هنغير value واحدة في fixtures/trip.fixture.json (زي اسم stop أو estimatedCost) ونتأكد إن الشاشة بتعكس القيمة الجديدة على طول من غير أي كود تاني.

## Story
**As a** series viewer, **I want** to see a single fixture value change and watch it appear on screen with no other code changes, **so that** I understand the screen is genuinely data-driven rather than a static mockup.

## Acceptance criteria
**AC1: Changing one fixture value updates the screen**
- Given `fixtures/trip.fixture.json` is edited to change one stop's name or `estimatedCost`
- When the app rebuilds and the dashboard is viewed
- Then the new value appears on screen with no other code change; this is a build-time fixture edit for demonstration, not a runtime user action, and no undo control exists for it yet since true undo/redo is a later episode's scope

**AC2: An invalid fixture edit fails loudly, not silently**
- Given the fixture is edited into invalid JSON or a wrong type for a field
- When the app attempts to build
- Then the build fails with a clear error instead of silently showing stale or incorrect data

**AC3: Only the changed field's displayed value changes**
- Given only one field of one stop is changed
- When the screen re-renders
- Then only that field's displayed value differs, and every other displayed trip and stop value stays exactly the same as before the edit

## Tasks
- [ ] Frontend: Confirm the guest dashboard component reads every displayed trip and stop field from the imported fixture object, with no hardcoded display values anywhere in the template.
- [ ] Testing: Change one fixture value locally, compare before/after screenshots or a test snapshot, and confirm only the expected value changed on screen.
- [ ] Documentation: Record in `docs/tos-001-scope.md`'s acceptance notes (or an equivalent checklist) that the fixture-change demonstration has been verified.

## Metadata
- Points: 1 (Fibonacci) | Priority: P1 | Risk: 5/20
- Curriculum video: 05 (Module 1: Foundations and The New Era, Co-Pilot Build #1: Scaffolding the Agentic Travel App, Zoneless Shell)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## TASK:TOS-001-S3-T1
OF: TOS-001-S3
TITLE: Audit the dashboard template for hardcoded display values
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:signals
BODY:
Go through the guest dashboard component's template and confirm every displayed trip and stop field is bound to the imported fixture data, not typed literally into the template.

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] Acceptance criteria (AC1, AC3 of TOS-001-S3) verified on screen
END TASK

## TASK:TOS-001-S3-T2
OF: TOS-001-S3
TITLE: Demonstrate and capture the fixture-change outcome
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:signals
BODY:
Edit one fixture value locally, capture the before/after state (screenshot or test snapshot), and confirm the change is isolated to the expected field.

## Definition of done
- [ ] Acceptance criteria (AC1-AC3 of TOS-001-S3) verified on screen
- [ ] Evidence of the before/after change captured for the episode recording
END TASK

## TASK:TOS-001-S3-T3
OF: TOS-001-S3
TITLE: Record the fixture-change verification in the scope doc
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:signals
BODY:
Add a short note to `docs/tos-001-scope.md` (or wherever the episode's on-camera acceptance checklist lives) confirming the fixture-change demonstration was verified.

## Definition of done
- [ ] `docs/` updated
END TASK

## STORY:TOS-001-S4
TITLE: One passing automated check for the guest dashboard
MILESTONE: TOS-001 Zoneless shell
LABELS: type:user-story, episode:tos-001, route:dashboard, topic:testing, P0, points:2
BODY:
## ملخص
محتاجين check واحد ناجح (test) يثبت إن الشاشة بتعرض بيانات الـ trip والـ stops صح، عشان يبقى عندنا دليل تلقائي على السلوك اللي اتصور في الفيديو مش بس شكل بصري.

## Story
**As a** series viewer, **I want** to see one automated check pass for the dashboard screen, **so that** I can trust the behavior shown on camera is verified, not just visually eyeballed.

## Acceptance criteria
**AC1: The test suite reports at least one passing test**
- Given the guest dashboard component and its spec file exist
- When `pnpm exec ng test --watch=false` runs
- Then the suite reports at least one passing test that exercises the dashboard's fixture rendering

**AC2: A deliberately broken assertion fails the check**
- Given the test's expected value is temporarily changed to something wrong (for example, the wrong trip title)
- When the suite runs
- Then it fails clearly, proving the check asserts real rendered content rather than passing trivially

**AC3: Build and test run cleanly from a fresh install**
- Given a clean checkout with only `pnpm install` run beforehand
- When `pnpm build` and `pnpm exec ng test --watch=false` are run back to back
- Then both complete without manual intervention, matching what the TOS-000 CI pipeline will later automate

## Tasks
- [ ] Frontend: Confirm the guest dashboard component's template bindings are structured so the component is testable in isolation via TestBed (no untestable global state).
- [ ] Testing: Write one component test exercising the dashboard's fixture rendering and confirm it passes with `pnpm exec ng test --watch=false --include='src/**/*.spec.ts'`.
- [ ] Documentation: Record the passing check's command and expected result in `docs/tos-001-scope.md` or a short testing note.

## Metadata
- Points: 2 (Fibonacci) | Priority: P0 | Risk: 6/20
- Curriculum video: 05 (Module 1: Foundations and The New Era, Co-Pilot Build #1: Scaffolding the Agentic Travel App, Zoneless Shell)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## TASK:TOS-001-S4-T1
OF: TOS-001-S4
TITLE: Structure the dashboard component to be testable in isolation
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:testing
BODY:
Confirm the guest dashboard component has no untestable global state or side effects outside its inputs, so it can be rendered and asserted on cleanly through TestBed.

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] Acceptance criteria (AC1 of TOS-001-S4) achievable via the test in T2
END TASK

## TASK:TOS-001-S4-T2
OF: TOS-001-S4
TITLE: Write and verify the passing dashboard test
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:testing
BODY:
Write one component test that renders the guest dashboard and asserts on fixture-driven content, then run it and a deliberately broken version of it to confirm it actually fails when it should.

## Definition of done
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria (AC1-AC3 of TOS-001-S4) verified
END TASK

## TASK:TOS-001-S4-T3
OF: TOS-001-S4
TITLE: Document the passing check for the episode
MILESTONE: TOS-001 Zoneless shell
LABELS: type:task, episode:tos-001, route:dashboard, topic:testing
BODY:
Record the exact test command and its expected passing output in `docs/tos-001-scope.md` or a short testing note, so the on-camera check is reproducible.

## Definition of done
- [ ] `docs/` updated
END TASK

## STORY:TOS-002-S1
TITLE: Show itinerary stops as destination cards
MILESTONE: TOS-002 Cards and itinerary UI
LABELS: type:user-story, episode:tos-002, route:dashboard, topic:control-flow, topic:a11y, P0, points:3
BODY:
## ملخص
بدل ما الـ stops تتعرض كـ list سطور بسيطة، هنحولها لـ cards فيها التفاصيل الأساسية زي الاسم، اليوم، المدة، والتكلفة التقديرية، بشكل قريب من الـ prototype اللي في docs/prototype/index.html.

## Story
**As a** trip planner, **I want** each itinerary stop shown as a clear card with its key details, **so that** I can scan my day plan at a glance instead of reading a plain list.

## Acceptance criteria
**AC1: Each stop renders as a card with key fields**
- Given the fixture trip's 4 stops
- When the guest dashboard renders the itinerary section
- Then each stop appears as a distinct card showing at least its name, day, and estimated cost, styled consistent with the reference layout in `docs/prototype/index.html`

**AC2: A missing optional field shows a graceful placeholder**
- Given a stop is missing an optional display field
- When its card renders
- Then the card shows a graceful placeholder for that field instead of the literal text "undefined" or a blank gap

**AC3: A long stop name does not break the card grid**
- Given a stop name is unusually long
- When the card renders
- Then the text wraps or truncates within the card boundary without breaking the surrounding card grid layout

## Tasks
- [ ] Frontend: Build the stop card markup and styles for each fixture stop, matching the reference layout in `docs/prototype/index.html`.
- [ ] Testing: Add a unit test confirming all 4 fixture stops render as cards with their key fields.
- [ ] Documentation: Note the card layout decision in `docs/business-docs/02_dashboard.md` if it diverges from the documented panel spec.

## Metadata
- Points: 3 (Fibonacci) | Priority: P0 | Risk: 7/20
- Curriculum video: 10 (Module 2: Templates and Components, Co-Pilot Build #2: Destination Cards & Itinerary UI with New Control Flow)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-002-S2
TITLE: Use native control flow with an empty-state for the itinerary list
MILESTONE: TOS-002 Cards and itinerary UI
LABELS: type:user-story, episode:tos-002, route:dashboard, topic:control-flow, P0, points:2
BODY:
## ملخص
هنستخدم الـ control flow الجديد بتاع Angular، يعني @for و @if و @empty، عشان نلف على الـ stops ونعرض رسالة واضحة لو مفيش stops أصلاً بدل ما الشاشة تفضل فاضية من غير أي تفسير.

## Story
**As a** trip planner, **I want** to see a clear message when my itinerary has no stops yet, **so that** I know I need to add stops rather than staring at a blank screen.

## Acceptance criteria
**AC1: Stops render via native control flow**
- Given the fixture has 4 stops
- When the itinerary section renders
- Then one card per stop appears in fixture order (the exact control flow syntax used is a Tasks/implementation concern, verified against docs or the installed `.d.ts`)

**AC2: An unrecognized category does not break the loop**
- Given a stop has an unrecognized or unexpected `category` value
- When the loop renders it
- Then that stop's card still renders, with a default or fallback category label, instead of the whole loop breaking

**AC3: Zero stops shows an explicit empty state**
- Given the stops array is empty
- When the itinerary section renders
- Then an explicit empty-state message is shown instead of a blank area, using the outcome of Angular's control flow empty-handling, verified against docs or the installed `.d.ts` for the exact syntax at build time

## Tasks
- [ ] Frontend: Replace the stop rendering with native control flow (a loop over stops with an explicit empty-state branch for zero stops), verifying the exact syntax against Angular docs or the installed `.d.ts`.
- [ ] Testing: Add a unit test covering both the populated stop list and the zero-stops empty state.
- [ ] Documentation: Record which control flow syntax was used and the doc or `.d.ts` source it was verified against.

## Metadata
- Points: 2 (Fibonacci) | Priority: P0 | Risk: 6/20
- Curriculum video: 10 (Module 2: Templates and Components, Co-Pilot Build #2: Destination Cards & Itinerary UI with New Control Flow)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-002-S3
TITLE: Toggle a stop card's selected state with signal input and output
MILESTONE: TOS-002 Cards and itinerary UI
LABELS: type:user-story, episode:tos-002, route:dashboard, topic:signals, topic:a11y, accessibility, P1, points:3
BODY:
## ملخص
هنعمل component منفصل لكل stop card باستخدام input() و output() على شكل signals، بحيث لما المستخدم يدوس على الـ card تتحدد (selected) بصريًا، والدوسة التانية تشيل التحديد. التغيير ده بصري بس وموجود في الذاكرة، لسه مفيش persistence لحد TOS-003.

## Story
**As a** trip planner, **I want** to select a stop card to highlight it, **so that** I can visually track which stops I am focused on while planning.

## Acceptance criteria
**AC1: Clicking a card toggles its selected state visibly**
- Given a stop card is unselected
- When the trip planner clicks it
- Then the card visually indicates a selected state, and clicking it again returns it to unselected, both changes visible immediately on screen

**AC2: Toggling one card does not affect others**
- Given the trip planner clicks two different cards in sequence
- When each click registers
- Then each card's selected state toggles independently, with no effect on the other cards

**AC3: Keyboard activation works the same as a click**
- Given the trip planner uses only the keyboard
- When they focus a card and press Enter or Space
- Then the same selection toggle happens as with a mouse click; the selected state is in-memory only for the current session, since no persistence exists until the trip store lands in TOS-003, and reversal is by toggling the card again, there is no dedicated undo control yet, true undo/redo lands in a later episode

## Tasks
- [ ] Frontend: Extract a standalone stop card component with a signal `input()` for the stop data and a signal `output()` for the selection toggle event.
- [ ] Testing: Add a unit test verifying that clicking and keyboard-activating a card toggles its selected state, and that toggling one card does not affect another.
- [ ] Documentation: Note in the component or `docs/business-docs/02_dashboard.md` that selection state is session-only with no persistence until TOS-003's trip store.

## Metadata
- Points: 3 (Fibonacci) | Priority: P1 | Risk: 8/20
- Curriculum video: 10 (Module 2: Templates and Components, Co-Pilot Build #2: Destination Cards & Itinerary UI with New Control Flow)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-002-S4
TITLE: Wrap the itinerary section in a reusable content-projected panel
MILESTONE: TOS-002 Cards and itinerary UI
LABELS: type:user-story, episode:tos-002, route:dashboard, topic:signals, topic:a11y, accessibility, P1, points:3
BODY:
## ملخص
هنبني panel component عام باستخدام content projection (ng-content) عشان قسم الـ Itinerary Stops يبقى جوه panel متسق الشكل، بدل ما كل قسم يكرر نفس الـ markup والـ styling من الأول.

## Story
**As a** trip planner, **I want** the itinerary section to appear inside a consistently styled panel, **so that** the workspace feels like an organized planning console rather than a plain list glued to the page.

## Acceptance criteria
**AC1: The itinerary section renders inside the panel**
- Given the itinerary stops section is wrapped in the new reusable panel component
- When the guest dashboard renders
- Then the panel shows a consistent header/title and projects the stop cards as its body content

**AC2: An empty optional slot leaves no stray chrome**
- Given no footer content is passed into the panel
- When it renders
- Then no empty footer border or padding appears where the unused slot would have been

**AC3: A long panel title stays accessible and does not break the layout**
- Given the panel's title text is unusually long
- When it renders
- Then the title wraps or truncates without breaking the panel's header layout, and the title is exposed through a proper heading element for screen reader users

## Tasks
- [ ] Frontend: Build a reusable panel component using content projection (a header slot for the title, a default slot for body content) and wrap the itinerary stops section in it.
- [ ] Testing: Add a unit test confirming projected content renders inside the panel and the header title is exposed via a proper heading element.
- [ ] Documentation: Document the panel component's projection slots in `docs/business-docs/02_dashboard.md` so later episodes' panels (Current Trip, Co-Pilot Status, etc.) can reuse it consistently.

## Metadata
- Points: 3 (Fibonacci) | Priority: P1 | Risk: 7/20
- Curriculum video: 10 (Module 2: Templates and Components, Co-Pilot Build #2: Destination Cards & Itinerary UI with New Control Flow)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-003-S1
TITLE: Trip store foundation: shared signal state and get_trip_state
MILESTONE: TOS-003 Signal trip store
LABELS: type:user-story, episode:tos-003, route:cross-cutting, topic:signals, topic:di, P0, points:3
BODY:
## ملخص
هنعمل TripStore واحدة بترجع كل بيانات الرحلة من signal() واحد، بدل ما كل شاشة تعمل نسخة محلية بتاعتها. الميثود get_trip_state هي أول واحدة من الستة أدوات بتتحول لعملية حقيقية على الـ store، وأي حد يقرأ منها هياخد نفس الحالة بالظبط.

## Story
**As a** trip planner, **I want** the app to read my trip's current state from one shared, signal-based source, **so that** every screen I visit shows the same up-to-date trip data instead of a stale local copy.

## Acceptance criteria
**AC1: get_trip_state returns the live trip**
- Given the trip store has been initialized with the fixture trip from fixtures/trip.fixture.json
- When any screen calls the store's get_trip_state method
- Then it receives the current trip object (title, destination, dates, and all four stops) matching the store's live state exactly

**AC2: get_trip_state before initialization completes**
- Given the trip store has not finished initializing (e.g. on first load before the fixture is read)
- When a screen calls get_trip_state before initialization completes
- Then the method returns a defined empty or loading trip state rather than throwing, so no screen crashes on first render

**AC3: two consumers stay in sync**
- Given two different screens both hold a reference to the trip store
- When one screen's action changes the underlying signal
- Then get_trip_state called from the other screen returns the updated value immediately, with no manual refresh or re-fetch required

## Tasks
- [ ] Frontend: Create an injectable TripStore holding trip state in a single signal(), seeded from fixtures/trip.fixture.json, with a get_trip_state() method returning the current snapshot
- [ ] Testing: Unit test that get_trip_state() reflects the store's current signal value and stays consistent across multiple injection points
- [ ] Documentation: Record the TripStore's public read API and initialization behavior in docs/ so later episodes build on the same contract

## Metadata
- Points: 3 (Fibonacci) | Priority: P0 | Risk: 9/20 (new tech 3, integration 2, clarity 2, familiarity 2)
- Curriculum video: 15 (The Signal-Based Trip Store, No NgRx)
- Route doc: `docs/business-docs/00_routes-overview.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-003-S2
TITLE: Computed trip totals: days, stops, and estimated cost
MILESTONE: TOS-003 Signal trip store
LABELS: type:user-story, episode:tos-003, route:cross-cutting, topic:signals, P1, points:2
BODY:
## ملخص
هنضيف computed() بيحسب عدد الأيام وعدد الـ stops والتكلفة التقديرية للرحلة أوتوماتيك من نفس بيانات الـ store. الأرقام دي هتتغير لحظيًا لما المستخدم يضيف أو يشيل stop، من غير ما حد يعمل حساب يدوي في الكومبوننت.

## Story
**As a** trip planner, **I want** to see running totals for my trip (day count, stop count, total estimated cost), **so that** I can gauge scope and budget without adding things up myself.

## Acceptance criteria
**AC1: totals match the fixture trip**
- Given the fixture trip is loaded with 4 stops across 2 days with estimated costs of 500, 200, 700, and 900
- When a screen reads the store's derived totals
- Then it shows 2 days, 4 stops, and a total estimated cost of 2300 in the trip's currency

**AC2: totals with zero stops**
- Given the trip currently has zero stops
- When a screen reads the derived totals
- Then stop count and total cost both show 0, and day count reflects the trip's date range rather than throwing or showing a blank value

**AC3: totals stay live after a change**
- Given the trip has stops
- When a stop is added or removed elsewhere in the app
- Then the totals recompute and the UI reflects the new numbers without a manual reload, checked against how the installed Angular computed() implementation actually re-evaluates

## Tasks
- [ ] Frontend: Add computed() signals on TripStore for day count, stop count, and total estimated cost derived from the trip signal
- [ ] Testing: Unit test totals for the zero-stop case, the four-stop fixture case, and after a simulated stop count change
- [ ] Documentation: Note the totals formulas (day count source, cost currency assumption) in docs/ for reuse by other screens

## Metadata
- Points: 2 (Fibonacci) | Priority: P1 | Risk: 7/20 (new tech 2, integration 1, clarity 2, familiarity 2)
- Curriculum video: 15 (The Signal-Based Trip Store, No NgRx)
- Route doc: `docs/business-docs/00_routes-overview.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-003-S3
TITLE: Selected stop tracked with linkedSignal in the trip store
MILESTONE: TOS-003 Signal trip store
LABELS: type:user-story, episode:tos-003, route:planner, topic:signals, P1, points:3
BODY:
## ملخص
هنستخدم linkedSignal() عشان نتتبع الـ stop المختار حاليًا في الـ planner. لو الـ stop اتشال من الـ itinerary، الاختيار المفروض يترجع لحالة مفيش اختيار تلقائي، بدل ما يفضل واقف على stop مبقاش موجود.

## Story
**As a** trip planner, **I want** the currently selected stop to stay valid automatically as my itinerary changes, **so that** I never see a detail panel pointing at a stop that no longer exists.

## Acceptance criteria
**AC1: selecting a stop populates the detail panel**
- Given no stop is selected
- When I select a stop from the itinerary
- Then the store's selected-stop signal holds that stop's id, and the UI detail panel shows that stop's details

**AC2: selection resets when the selected stop is removed**
- Given a stop is currently selected
- When that same stop is removed from the itinerary
- Then the selected-stop signal resets to no selection, and the UI falls back to its no-selection state rather than referencing a missing stop

**AC3: selection survives a reorder**
- Given a stop is selected
- When the itinerary is reordered without removing any stop (its day or position changes but its id stays)
- Then the same stop remains selected after the reorder, confirmed against how linkedSignal recomputes when its source signal changes, per docs or the installed `.d.ts`

## Tasks
- [ ] Frontend: Add a linkedSignal() on TripStore for the selected stop id, derived from the stops signal so it resets when the selected id is no longer present
- [ ] Testing: Unit test selection persisting through reorder and resetting through removal
- [ ] Documentation: Document the selected-stop reset rule in docs/ so other screens rely on the same behavior

## Metadata
- Points: 3 (Fibonacci) | Priority: P1 | Risk: 11/20 (new tech 4, integration 2, clarity 3, familiarity 2)
- Curriculum video: 15 (The Signal-Based Trip Store, No NgRx)
- Route doc: `docs/business-docs/05_planner.md`
- Prototype reference: `docs/prototype/planner.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-003-S4
TITLE: Trip store mutation methods: add_stop, remove_stop, edit_stop, reorder_itinerary
MILESTONE: TOS-003 Signal trip store
LABELS: type:user-story, episode:tos-003, route:planner, topic:signals, P0, points:8
BODY:
## ملخص
هنبني الأربع ميثودز add_stop و remove_stop و edit_stop و reorder_itinerary كعمليات حقيقية على TripStore، مش placeholders. أي تغيير لازم يظهر فورًا في كل شاشة بتعرض الرحلة، مع العلم إن الـ undo/redo لسه مش موجود في المرحلة دي.

## Story
**As a** trip planner, **I want** to add, remove, reorder, and edit stops in my itinerary through the same store the whole app reads from, **so that** any change I make is reflected everywhere the trip is shown.

## Acceptance criteria
**AC1: add_stop is visible immediately**
- Given the fixture trip with 4 stops
- When I call add_stop with a new stop's details
- Then the store's stops signal includes the new stop, the UI itinerary list shows it immediately, and the trip totals shown in the UI update to match

**AC2: edit_stop and remove_stop reject unknown ids**
- Given the fixture trip with 4 stops
- When I call edit_stop or remove_stop with a stop id that does not exist in the current trip
- Then the store leaves existing stops unchanged and surfaces a defined failure result rather than silently mutating an unrelated stop or throwing an unhandled error

**AC3: reorder_itinerary updates the UI with no undo yet**
- Given the fixture trip with stops across day 1 and day 2
- When I call reorder_itinerary to move a stop to a different day or position
- Then the stop's day and position update, the UI itinerary order reflects the change immediately, and no undo or redo affordance is offered since that capability does not exist yet at this stage of the build

## Tasks
- [ ] Frontend: Implement add_stop, remove_stop, edit_stop, and reorder_itinerary as TripStore methods that update the trip signal via update()/set(), wired to the existing itinerary UI
- [ ] Testing: Unit test each method's happy path and its behavior on an unknown stop id, plus a test that computed totals and selected-stop state stay consistent after each mutation
- [ ] Documentation: Document each method's signature and failure behavior in docs/ so the contract stays stable for future episodes that build on it

## Metadata
- Points: 8 (Fibonacci) | Priority: P0 | Risk: 9/20 (new tech 3, integration 2, clarity 2, familiarity 2)
- Curriculum video: 15 (The Signal-Based Trip Store, No NgRx)
- Route doc: `docs/business-docs/05_planner.md`
- Prototype reference: `docs/prototype/planner.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-003-S5
TITLE: Trip store search: filter the current itinerary's stops
MILESTONE: TOS-003 Signal trip store
LABELS: type:user-story, episode:tos-003, route:planner, route:cross-cutting, topic:signals, needs-episode-decision, P2, points:2
BODY:
## ملخص
هنعمل ميثود search بسيطة بتفلتر الـ stops الموجودة في الرحلة الحالية بالاسم أو الفئة، من غير ما نخترع كتالوج وجهات جديد لسه معندناش بيانات ليه. النطاق الأوسع للبحث الحي هيتحدد لاحقًا في TOS-006.

## Story
**As a** trip planner, **I want** to filter the stops already in my itinerary by name or category, **so that** I can quickly find a specific stop while planning without scrolling the whole list.

## Acceptance criteria
**AC1: search matches by name**
- Given the fixture trip with stops named Egyptian Museum, Khan el-Khalili, Giza Pyramids, and Nile dinner cruise
- When I call search with the text "museum"
- Then the result includes only Egyptian Museum

**AC2: search with no matches**
- Given the fixture trip's stops
- When I call search with a query that matches no stop name or category
- Then the result is an empty list rather than an error, and the UI shows a defined empty-results message

**AC3: empty query returns everything**
- Given the fixture trip's stops
- When I call search with an empty query
- Then the result includes all current stops unfiltered, matching get_trip_state's stop list exactly

## Tasks
- [ ] Frontend: Implement search on TripStore as a synchronous filter over the current stops signal by name and category, with no external data source yet
- [ ] Testing: Unit test matching, no-match, and empty-query cases
- [ ] Documentation: Record in docs/ that this search scope is limited to the current trip's own stops, and that live destination search arrives with httpResource in TOS-006

## Metadata
- Points: 2 (Fibonacci) | Priority: P2 | Risk: 9/20 (new tech 2, integration 1, clarity 4, familiarity 2)
- Curriculum video: 15 (The Signal-Based Trip Store, No NgRx)
- Route doc: `docs/business-docs/00_routes-overview.md`
- Prototype reference: `docs/prototype/planner.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-004-S1
TITLE: Route configuration for all 8 Travel OS screens
MILESTONE: TOS-004 Routing and guards
LABELS: type:user-story, episode:tos-004, route:auth, route:dashboard, route:search, route:builder, route:planner, route:copilot, route:review, route:states, topic:routing, P0, points:3
BODY:
## ملخص
هنعمل provideRouter بمسارات الشاشات الثمانية كلها: auth و dashboard و search و builder و planner و copilot و review و states. كل شاشة هتبقى وصلة مباشرة تقدر تتفتح أو تتشارك من غير ما تعدي دايمًا من الداشبورد.

## Story
**As a** trip planner, **I want** every screen (auth, dashboard, search, builder, planner, copilot, review, states) reachable at its own URL, **so that** I can navigate directly, bookmark, or share a specific screen instead of always starting from the dashboard.

## Acceptance criteria
**AC1: direct navigation to a route works**
- Given the app is running with provideRouter configured for all 8 routes
- When I navigate directly to /planner in the browser
- Then the planner screen renders without first passing through /dashboard

**AC2: an unmatched URL is handled**
- Given the router is configured with the 8 known routes
- When I navigate to a URL that matches none of them
- Then a defined not-found route or redirect handles it, rather than a blank screen or unhandled routing error

**AC3: the states gallery is independently reachable**
- Given I am a QA reviewer
- When I navigate to /states directly
- Then the states gallery route renders on its own, confirming /states does not require passing through any other screen first

## Tasks
- [ ] Frontend: Configure provideRouter with routes for /auth, /dashboard, /search, /builder, /planner, /copilot, /review, and /states
- [ ] Testing: Test direct navigation to each of the 8 routes and a defined behavior for an unmatched URL
- [ ] Documentation: Update docs/ with the final route table and confirm each path against Angular's routing API in the installed `.d.ts`

## Metadata
- Points: 3 (Fibonacci) | Priority: P0 | Risk: 8/20 (new tech 2, integration 2, clarity 2, familiarity 2)
- Curriculum video: 20 (Routing, Guards and Lazy Panels for the Trip Planner)
- Route doc: `docs/business-docs/00_routes-overview.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-004-S2
TITLE: Functional auth guard for planner, builder, copilot, and review
MILESTONE: TOS-004 Routing and guards
LABELS: type:user-story, episode:tos-004, route:auth, route:planner, route:builder, route:copilot, route:review, topic:routing, topic:di, topic:a11y, accessibility, P0, points:5
BODY:
## ملخص
هنعمل functional guard بيحمي مسارات planner و builder و copilot و review، بحيث لو مفيش session المستخدم يترحل لـ /auth. الضيف (guest) لسه يقدر يشوف /dashboard زي ما اتحدد في TOS-001، والموضوع كله لسه مجرد آلية guard على مستوى Angular مش authentication حقيقي بباك إند.

## Story
**As a** returning traveller, **I want** the planner, builder, copilot, and review routes to require my session, **so that** only I can reach my trip's deeper workspace, while dashboard stays reachable as a guest per TOS-001.

## Acceptance criteria
**AC1: authenticated session reaches protected routes**
- Given I have an authenticated session
- When I navigate to /planner, /builder, /copilot, or /review
- Then the guard allows navigation and the requested screen renders

**AC2: no session redirects to /auth with focus moved**
- Given I have no session (neither guest nor authenticated)
- When I navigate directly to /planner, /builder, /copilot, or /review
- Then a functional guard redirects me to /auth, and focus moves to the /auth screen's primary heading or first interactive control so keyboard and screen reader users land in a sensible place

**AC3: guest reaches dashboard but not the deeper routes**
- Given I am in a guest session per TOS-001's guest dashboard flow
- When I navigate to /dashboard
- Then the guard allows it since /dashboard remains guest-accessible, but navigating from there to /planner, /builder, /copilot, or /review still redirects to /auth since guest is not the same as authenticated

## Tasks
- [ ] Frontend: Implement a functional guard applied to /planner, /builder, /copilot, and /review that distinguishes guest from authenticated session state and redirects unauthenticated access to /auth
- [ ] Testing: Test guard behavior for authenticated, guest, and no-session cases on each protected route, plus a focus-management check on redirect
- [ ] Documentation: Document in docs/ that this is a guard-level teaching mechanism, not production authentication, consistent with TOS-001's explicit exclusion of real auth

## Metadata
- Points: 5 (Fibonacci) | Priority: P0 | Risk: 11/20 (new tech 3, integration 3, clarity 3, familiarity 2)
- Curriculum video: 20 (Routing, Guards and Lazy Panels for the Trip Planner)
- Route doc: `docs/business-docs/01_auth.md`
- Prototype reference: `docs/prototype/auth.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-004-S3
TITLE: Lazy load each route's screen with loadComponent
MILESTONE: TOS-004 Routing and guards
LABELS: type:user-story, episode:tos-004, route:cross-cutting, topic:routing, P1, points:3
BODY:
## ملخص
هنستخدم loadComponent عشان كل شاشة تتحمل كـ chunk منفصل بس وقت ما المستخدم يزورها، مش كلها مع بعض في الأول. ده بيخلي الـ bundle الأولي أصغر، وده نقطة تعليمية مهمة لمتابعين السلسلة عشان يشوفوا الفرق في الـ build output.

## Story
**As a** series viewer, **I want** each route's screen component to load as its own lazy chunk, **so that** I can see how loadComponent keeps the initial bundle small as the course adds more screens episode by episode.

## Acceptance criteria
**AC1: the initial bundle excludes other screens**
- Given the router is configured with loadComponent for each of the 8 routes
- When the app first loads at /auth or /dashboard
- Then the initial bundle does not include the code for planner, builder, copilot, review, search, or states, verified in the pnpm build output

**AC2: a failed chunk load shows a defined state**
- Given a route's lazy chunk fails to load, simulated as a network failure in a test
- When a user navigates to that route
- Then a defined loading or error state is shown instead of a silent blank screen

**AC3: a revisited route does not re-download its chunk**
- Given I have already visited /planner once in a session
- When I navigate away and then back to /planner
- Then the screen renders without re-downloading its chunk, confirmed against how the installed Angular router actually caches loaded lazy chunks

## Tasks
- [ ] Frontend: Convert each of the 8 route entries to use loadComponent for its standalone screen component
- [ ] Testing: Test that navigating to each route resolves its component, and that a simulated chunk-load failure shows a defined fallback state
- [ ] DevOps: Inspect pnpm build output to confirm each route produces a separate chunk, and record the chunk list in docs/ for the episode
- [ ] Documentation: Document the before/after initial bundle size in docs/ so the video can show the concrete improvement on camera

## Metadata
- Points: 3 (Fibonacci) | Priority: P1 | Risk: 8/20 (new tech 2, integration 2, clarity 2, familiarity 2)
- Curriculum video: 20 (Routing, Guards and Lazy Panels for the Trip Planner)
- Route doc: `docs/business-docs/00_routes-overview.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-004-S4
TITLE: Read the planner's selected stop from a route param as a signal
MILESTONE: TOS-004 Routing and guards
LABELS: type:user-story, episode:tos-004, route:planner, topic:routing, topic:signals, P1, points:3
BODY:
## ملخص
هنخلي المستخدم يقدر يفتح لينك مباشر لـ stop معين جوه /planner عن طريق route param بيتقرا كـ signal، فيبقى الـ stop ده متحدد جاهز من غير كليكات إضافية. التنقل بين لينكات مختلفة لنفس المسار المفروض يحدّث بس الـ signal من غير ما يعيد بناء الشاشة كلها.

## Story
**As a** trip planner, **I want** to open a direct link to a specific stop inside /planner, **so that** the right stop is already selected when the page loads without extra clicks.

## Acceptance criteria
**AC1: a valid stop param preselects and displays that stop**
- Given the fixture trip's stop-2 (Khan el-Khalili) exists
- When I navigate to /planner with a route param identifying stop-2
- Then the planner screen reads that param as a signal, the store's selected-stop state matches stop-2 on load, and the detail panel visibly shows stop-2's details

**AC2: an unknown stop param falls back cleanly**
- Given a route param references a stop id that does not exist in the current trip
- When I navigate to /planner with that param
- Then the planner falls back to its no-selection state rather than erroring or showing a blank detail panel

**AC3: switching params on the same route updates the signal**
- Given I am already on /planner with stop-2 selected via its route param
- When I navigate to /planner with a different stop's param, such as stop-3, without a full page reload
- Then the route param signal updates to stop-3 and the selected stop and detail panel change accordingly, verified against how the installed Angular router surfaces param changes as signals for a reused route

## Tasks
- [ ] Frontend: Bind the planner route's stop id param to a signal-based input and sync it with the store's selected-stop state on navigation
- [ ] Testing: Test initial load with a valid param, an unknown param, and navigation between two valid params on the same route
- [ ] Documentation: Document the param-to-signal binding approach in docs/ and confirm the exact API used against Angular's routing docs and the installed `.d.ts` before recording

## Metadata
- Points: 3 (Fibonacci) | Priority: P1 | Risk: 9/20 (new tech 3, integration 2, clarity 2, familiarity 2)
- Curriculum video: 20 (Routing, Guards and Lazy Panels for the Trip Planner)
- Route doc: `docs/business-docs/05_planner.md`
- Prototype reference: `docs/prototype/planner.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-005-S1
TITLE: Itinerary builder Step 1: Trip basics with Signal Forms and date range validation
MILESTONE: TOS-005 Itinerary builder
LABELS: type:user-story, episode:tos-005, route:builder, topic:signal-forms, topic:signals, P0, points:5
BODY:
## ملخص
الخطوة الأولى في الـ /builder بتاخد بيانات الرحلة الأساسية: الاسم، تاريخ البداية والنهاية، الـ style والـ pace، والميزانية، باستخدام Signal Forms. فيه validation بين الحقول عشان end date يبقى بعد start date، وبانر بيحسب عدد الأيام والليالي أول ما التواريخ تتظبط.

## Story
**As a** trip planner, **I want** to enter my trip's name, dates, style, pace, and budget in a typed Signal Forms step, **so that** the wizard captures accurate foundational trip metadata before I move on to travelers and stops.

## Acceptance criteria
**AC1: Trip basics fill in and commit to the shared trip store**
- Given the trip planner is on /builder Step 1 with an empty or fixture-default trip
- When they enter a trip name, a start date before the end date, select one trip style chip and one pace chip
- Then the computed "Your trip window is X days / Y nights" banner updates immediately, the entered values are written to the shared trip store and reflected in the Live Summary sidebar, and since full undo/redo doesn't exist yet, changing any of these fields again is the only way to revert them

**AC2: End date before start date is rejected**
- Given the trip planner sets an end date that is before the start date
- When the cross-field validation runs
- Then an inline error is shown on the date fields (the precise Signal Forms validation trigger point, e.g. on blur vs on submit, to be confirmed against Angular's docs or the installed `.d.ts` rather than assumed from memory), the Next button is disabled, and the invalid date pair is not committed to the shared trip store as a valid trip window

**AC3: Required trip name blocks advancing**
- Given the trip planner leaves the trip name field empty
- When they attempt to advance to Step 2
- Then a required-field error appears on the trip name field, focus moves to that field, and the step indicator remains on STEP 01/04

## Tasks
- [ ] Frontend: Build the /builder Step 1 component using Signal Forms typed fields for trip name, start date, end date, style chips, pace chips, and budget, bound to the shared trip model; add the cross-field validation that end date must be after start date; render the computed trip-window info banner.
- [ ] Testing: Unit test Step 1 with `pnpm exec ng test --watch=false` covering the happy path, the end-before-start validation error, and the required trip name edge case.
- [ ] Documentation: Record in docs/versions.md (or inline) which `@angular/forms/signals` APIs were actually used and confirm them against the installed package's `.d.ts`.

## Metadata
- Points: 5 (Fibonacci) | Priority: P0 | Risk: 12/20
- Curriculum video: 23 (The Itinerary Builder with Signal Forms)
- Route doc: `docs/business-docs/04_builder.md`
- Prototype reference: `docs/prototype/builder.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-005-S2
TITLE: Itinerary builder Step 2: Dynamic traveler profiles with Signal Forms
MILESTONE: TOS-005 Itinerary builder
LABELS: type:user-story, episode:tos-005, route:builder, topic:signal-forms, topic:a11y, accessibility, P1, points:5
BODY:
## ملخص
في الخطوة التانية، المستخدم بيضيف أو يشيل traveler profiles (الاسم، النوع، وملاحظات) في array ديناميكي جوه الـ Signal Forms. أي إضافة أو حذف لازم تظهر فورًا في الشاشة، ومفيش undo لسه فلازم الترتيب يبقى واضح للمستخدم.

## Story
**As a** trip planner, **I want** to add and remove traveler profiles with a name, type, and notes on Step 2, **so that** the itinerary reflects exactly who is going before I confirm stops.

## Acceptance criteria
**AC1: Adding a traveler is immediately visible**
- Given the trip planner is on Step 2 with the default single traveler row
- When they click "Add traveler"
- Then a new blank traveler row is appended to the underlying Signal Forms dynamic array and rendered immediately in the UI (the exact dynamic-array API surface used is confirmed against the installed `.d.ts` rather than assumed), and the row is editable right away

**AC2: Empty traveler name blocks advancing**
- Given a traveler row has an empty name
- When the trip planner attempts to click Next
- Then a required-field error is shown on that row's name field and advancing to Step 3 is blocked

**AC3: Removing a traveler is immediate and not undoable**
- Given at least two traveler rows exist
- When the trip planner clicks that row's minus button
- Then the row disappears from the UI immediately, the remaining rows keep their previously entered data without index or identity corruption, focus moves to a sensible target (e.g. the "Add traveler" button) rather than being lost, and since full undo/redo doesn't exist yet, the removal is not reversible from within the wizard

## Tasks
- [ ] Frontend: Build the /builder Step 2 traveler list using a Signal Forms dynamic array for traveler profiles (name, type, notes); wire "Add traveler" and the per-row minus button to append/remove entries in the shared trip model.
- [ ] Frontend: Manage focus after a traveler row is removed so keyboard and screen reader users land somewhere sensible instead of losing focus.
- [ ] Testing: Unit test the traveler array add/remove behavior and the empty-name validation block with `pnpm exec ng test --watch=false`.
- [ ] Documentation: Note in docs/versions.md which Signal Forms dynamic-array API was used, confirmed against the installed `.d.ts`.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 11/20
- Curriculum video: 23 (The Itinerary Builder with Signal Forms)
- Route doc: `docs/business-docs/04_builder.md`
- Prototype reference: `docs/prototype/builder.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-005-S3
TITLE: Itinerary builder Step 3: Trip stops array with day assignment and Find in search handoff
MILESTONE: TOS-005 Itinerary builder
LABELS: type:user-story, episode:tos-005, route:builder, topic:signal-forms, topic:signals, topic:a11y, accessibility, P1, points:8
BODY:
## ملخص
الخطوة التالتة بتدير الـ stops: إضافة، حذف، وتغيير اليوم بالأسهم يمين وشمال، مع تحقق إن عدد ليالي الـ stop منيتعديش نافذة الرحلة. زرار "Find in search" بيوديك على /search لو عايز تجيب destination من هناك بدل ما تدخلها يدوي.

## Story
**As a** trip planner, **I want** to add, remove, and reorder stops by day on Step 3, **so that** my itinerary's day-by-day sequence matches how I actually want to move through the trip.

## Acceptance criteria
**AC1: Adding a stop is immediately visible**
- Given the trip planner is on Step 3
- When they click "Add stop"
- Then a new blank stop row appears in the list immediately, editable for destination name, nights, and status, and is written to the shared trip model

**AC2: Stop nights exceeding the trip window is flagged, not silently truncated**
- Given a stop's nights value would push its day assignment beyond the trip's total day/night window from Step 1
- When the trip planner enters that value
- Then a validation notice matching the "Stops exceed trip window" conflict rule is shown on the stop row, and the entered value is kept as-is rather than being silently clamped

**AC3: Reordering a stop by day is immediate and not undoable**
- Given at least one stop exists
- When the trip planner clicks the right day-arrow on a stop to move it to a later day
- Then the stop's day assignment updates immediately and visibly in the list, the change is written to the shared trip store (the exact reactive propagation confirmed against Angular's signals docs or the installed `.d.ts`), and since full undo/redo doesn't exist yet, moving it back requires clicking the left arrow manually rather than an undo action

## Tasks
- [ ] Frontend: Build the /builder Step 3 stop list (add stop, delete stop, status chip, day left/right arrows) writing to the shared trip model; wire "Find in search" to navigate to /search.
- [ ] Frontend: Implement the "stop nights exceed trip window" cross-field validation against Step 1's computed trip window.
- [ ] Frontend: Add accessible labels to the day-arrow and delete buttons (e.g. "Move stop to day 2", "Remove stop").
- [ ] Testing: Unit test add/remove/reorder behavior and the exceeds-window validation with `pnpm exec ng test --watch=false`.
- [ ] Documentation: Update docs/business-docs/04_builder.md if the implemented stop fields diverge from the documented shape.

## Metadata
- Points: 8 (Fibonacci) | Priority: P1 | Risk: 13/20
- Curriculum video: 23 (The Itinerary Builder with Signal Forms)
- Route doc: `docs/business-docs/04_builder.md`
- Prototype reference: `docs/prototype/builder.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-005-S4
TITLE: Itinerary builder Step 4: Validation panel with conflict, notice, and success states
MILESTONE: TOS-005 Itinerary builder
LABELS: type:user-story, episode:tos-005, route:builder, topic:signal-forms, topic:signals, topic:a11y, accessibility, P1, points:5
BODY:
## ملخص
الخطوة الرابعة بتجمع كل حاجة اتعملت في الخطوات اللي فاتت وتعرض conflicts (زي تجاوز نافذة الرحلة) أو notices (زي stops لسه مش confirmed)، أو رسالة نجاح لو كل حاجة تمام. زرار "Save draft" بيحفظ الحالة في أي وقت من غير ما يخلص الويزارد.

## Story
**As a** trip planner, **I want** Step 4 to show conflicts, notices, or a success message based on my trip basics, travelers, and stops, **so that** I know exactly what to fix before I consider the plan finished.

## Acceptance criteria
**AC1: Clean plan shows the success state**
- Given the trip planner's Step 1 to 3 data has no rule violations (valid date range, at least one stop, no stop exceeding the trip window)
- When they reach Step 4
- Then a success banner reading "No conflicts. Plan is valid and ready to save." is shown, no conflict or notice items are listed, and this derivation (e.g. via `computed()` as referenced in this repo's Angular conventions) is confirmed against the installed `.d.ts`

**AC2: A stop exceeding the trip window is listed as a conflict**
- Given at least one stop's assigned nights would exceed the trip's total day/night window
- When the trip planner reaches Step 4
- Then a danger-level conflict item ("Stops exceed trip window") is listed in the validation panel and the success banner is not shown

**AC3: Unconfirmed stops surface as a notice, and Save draft persists visibly**
- Given some stops are still marked "suggested" rather than "confirmed"
- When the trip planner reaches Step 4
- Then an info-level notice (e.g. "2 stops not yet confirmed") is shown alongside any conflicts, and clicking "Save draft" persists the current wizard state to the shared trip store with a visible saved confirmation, staying on Step 4 without requiring the wizard to be complete; since full undo/redo doesn't exist yet, saving a draft simply overwrites the previously stored wizard state

## Tasks
- [ ] Frontend: Build the Step 4 validation panel that derives conflicts (danger) and notices (info) from Steps 1 to 3 data, and shows the success message when clean.
- [ ] Frontend: Wire "Save draft" to persist current wizard state to the shared trip store from any step, with a visible saved confirmation.
- [ ] Frontend: Mark the conflict/notice/success banner region as an aria-live region so screen reader users hear updates as validation state changes.
- [ ] Testing: Unit test the conflict, notice, and success rendering paths and the Save draft action with `pnpm exec ng test --watch=false`.
- [ ] Documentation: Update docs/business-docs/04_builder.md if the implemented conflict/notice rule set diverges from the current draft.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 11/20
- Curriculum video: 23 (The Itinerary Builder with Signal Forms)
- Route doc: `docs/business-docs/04_builder.md`
- Prototype reference: `docs/prototype/builder.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-005-S5
TITLE: Finish and review handoff link from the itinerary builder
MILESTONE: TOS-005 Itinerary builder
LABELS: type:user-story, episode:tos-005, route:builder, route:review, topic:routing, topic:signals, P1, points:2
BODY:
## ملخص
دي story صغيرة بس مهمة: زرار "Finish & review" في آخر خطوة اللي بيوديك من /builder لـ /review. القصة هنا بس عن الرابط نفسه ومتى يبقى متاح، مش عن شكل شاشة الـ review اللي هيتغطى في TOS-012.

## Story
**As a** trip planner, **I want** a "Finish & review" action on the builder's last step, **so that** I can move from planning into reviewing my trip without losing my place.

## Acceptance criteria
**AC1: Clean plan navigates to review**
- Given the trip planner is on Step 4 with the plan in a valid (no-conflict) state
- When they click "Finish & review"
- Then the app navigates to /review, and the shared trip state at that point is what /review reads (no separate or duplicated copy is created for the handoff)

**AC2: Unresolved conflicts are a soft warning, not a hard block**
- Given the trip planner is on Step 4 with unresolved conflicts still present
- When they click "Finish & review"
- Then navigation to /review still occurs (conflicts are treated as a soft warning at this handoff point, not a hard block), and the unresolved conflicts remain recorded in the shared trip state

**AC3: Zero stops hard-blocks the handoff**
- Given the trip planner has not yet added any stops, violating the documented "at least 1 stop required to finish" rule
- When they attempt to click "Finish & review"
- Then the action is blocked (button disabled or a blocking message shown) and no navigation to /review occurs until at least one stop exists

## Tasks
- [ ] Frontend: Add the "Finish & review" button/link on Step 4 that navigates to /review, reading its enabled/disabled state from the shared trip store (blocked only when zero stops exist, per the "at least 1 stop required to finish" rule).
- [ ] Testing: Unit test the enabled, soft-warning-with-conflicts, and zero-stops-blocked cases with `pnpm exec ng test --watch=false`.
- [ ] Documentation: Note in docs/business-docs/04_builder.md that what /review itself renders after the handoff is out of scope for TOS-005 and tracked separately under TOS-012.

## Metadata
- Points: 2 (Fibonacci) | Priority: P1 | Risk: 7/20
- Curriculum video: 23 (The Itinerary Builder with Signal Forms)
- Route doc: `docs/business-docs/04_builder.md`
- Prototype reference: `docs/prototype/builder.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-006-S1
TITLE: Wire search results to httpResource for live destination data
MILESTONE: TOS-006 Live destination data
LABELS: type:user-story, episode:tos-006, route:search, topic:httpresource, topic:signals, P0, points:5
BODY:
## ملخص
شاشة /search هتبقى resource-backed: أي تغيير في query signal بتاع البحث بيعمل refetch لمصدر بيانات الوجهات عن طريق httpResource، بدل الكروت الثابتة اللي كانت في TOS-002. حالات "مفيش query" و"مفيش نتايج" لازم تتحدث بشكل حي مع كل تغيير.

## Story
**As a** trip planner, **I want** the /search results list to come from a resource-backed data source that refetches when my query changes, **so that** I see live destination results instead of the static fixture cards from TOS-002.

## Acceptance criteria
**AC1: Query signal change triggers a refetch**
- Given the trip planner has typed a query (e.g. "Japan coastal towns") into the search bar
- When the underlying query signal changes
- Then the destination data source is (re)requested via `httpResource` (the exact mechanism by which a request signal change triggers refetch is confirmed against Angular's docs or the installed `.d.ts` rather than assumed), and the results list re-renders with the new data

**AC2: No matches shows the documented empty state**
- Given the destination data source returns no matches for a query
- When the resource resolves
- Then the "No destinations matched" empty state from docs/business-docs/03_search.md is shown instead of a blank or stale list

**AC3: Clearing the query returns to the no-query state**
- Given the trip planner clears the search bar back to empty
- When the query signal becomes empty
- Then the results list returns to the "no query" empty state (compass icon prompt) rather than replaying the last successful results

## Tasks
- [ ] Frontend: Replace the static TOS-002 destination cards on /search with an httpResource-backed resource whose request recomputes from the search query signal.
- [ ] Frontend: Implement the "no query" and "no destinations matched" empty states per docs/business-docs/03_search.md.
- [ ] Testing: Unit test that changing the query signal triggers a new resource request and that both empty states render correctly, with `pnpm exec ng test --watch=false`.
- [ ] Documentation: Record in docs/versions.md which `httpResource` signature/overload was used, confirmed against the installed `.d.ts`.

## Metadata
- Points: 5 (Fibonacci) | Priority: P0 | Risk: 12/20
- Curriculum video: 26 (Live Destination Data with httpResource)
- Route doc: `docs/business-docs/03_search.md`
- Prototype reference: `docs/prototype/search.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-006-S2
TITLE: Render loading, error, and value states for the httpResource backed search results
MILESTONE: TOS-006 Live destination data
LABELS: type:user-story, episode:tos-006, route:search, topic:httpresource, topic:a11y, accessibility, P1, points:5
BODY:
## ملخص
لازم يبقى واضح لما البيانات بتتحمل، ولما فيه error، ولما النتايج جاهزة. الهدف إن المستخدم منيتلخبطش بين "لسه بيحمل" و"مفيش نتايج"، خصوصًا لو غيّر البحث بسرعة وبقى فيه أكتر من طلب شغال في نفس الوقت.

## Story
**As a** trip planner, **I want** to see a clear loading indicator while destination results are fetching and a clear error message if the fetch fails, **so that** I never mistake a stalled request for zero results.

## Acceptance criteria
**AC1: Successful fetch renders the value state with a result count**
- Given the destination data source resolves successfully
- When the resource reaches its loaded state
- Then the results list renders the returned destinations with the documented result-count label (e.g. "7 RESULTS · 'query'")

**AC2: A failed fetch shows a visible error, not a silent empty list**
- Given the destination data source request fails (network error or non-2xx response)
- When the resource enters its error state
- Then a visible error message replaces the results list, and the trip planner is not shown stale results from a previous query

**AC3: Rapid requeries only reflect the latest query's state**
- Given the trip planner changes the query again while a previous request is still loading
- When the newer request is triggered
- Then only the latest query's loading, value, or error state is reflected in the UI (no flicker back to a stale older result set), and this ordering guarantee is verified against the installed `httpResource` `.d.ts`/docs before being relied on in the recorded episode

## Tasks
- [ ] Frontend: Render distinct loading, error, and value UI for the search resource's states, replacing the results list with an explicit error message on failure instead of a silent empty list.
- [ ] Frontend: Ensure only the latest query's state is reflected when the query changes while a previous request is in flight.
- [ ] Frontend: Mark the loading/error/results region as an aria-live region so the state change is announced to screen reader users.
- [ ] Testing: Unit test loading, error, value, and rapid-requery-race scenarios with `pnpm exec ng test --watch=false`.
- [ ] Documentation: Record in docs/versions.md exactly which loading/error/value accessors the installed `httpResource` `.d.ts` exposes and how they were used to distinguish these states.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 13/20
- Curriculum video: 26 (Live Destination Data with httpResource)
- Route doc: `docs/business-docs/03_search.md`
- Prototype reference: `docs/prototype/search.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-006-S3
TITLE: Attach an API key to destination data source requests via an HttpInterceptor
MILESTONE: TOS-006 Live destination data
LABELS: type:user-story, episode:tos-006, route:search, route:cross-cutting, topic:httpresource, topic:di, P1, points:3
BODY:
## ملخص
دي story تقنية أكتر منها user-facing: إضافة HttpInterceptor بيحط الـ API key على أي طلب لمصدر بيانات الوجهات، بدل ما نكرر المنطق ده في كل مكان. الجمهور المستهدف هنا هو الـ series viewer اللي بيتعلم إزاي الـ interceptors بتشتغل في Angular.

## Story
**As a** series viewer, **I want** the destination data source requests to attach an API key via a functional HttpInterceptor, **so that** I can see how Angular centralizes a cross-cutting request concern instead of repeating auth logic at every call site.

## Acceptance criteria
**AC1: The interceptor attaches the key to destination data source requests**
- Given the interceptor is registered for the app's HttpClient via `provideHttpClient(withInterceptors(...))`
- When any request to the destination data source is made, including one issued through `httpResource`
- Then the outgoing request carries the configured API key, verified via a network inspection or an interceptor unit test rather than assumed from memory

**AC2: A missing key fails through the existing error state, not a raw exception**
- Given the API key is missing or empty in configuration
- When a request is made through the interceptor
- Then the interceptor does not silently send a malformed header; the resulting failure surfaces through the search resource's existing error state (from TOS-006-S2) rather than an unhandled exception

**AC3: The key is scoped to the destination data source only**
- Given a request is made to a URL outside the destination data source
- When the interceptor runs
- Then it does not attach the API key to that unrelated request, keeping the key scoped to the destination data source only

## Tasks
- [ ] Frontend: Implement a functional HttpInterceptor that attaches the API key to destination data source requests and register it via `provideHttpClient(withInterceptors(...))`.
- [ ] Testing: Unit test that the interceptor attaches the key to destination data source requests and does not attach it to unrelated requests, with `pnpm exec ng test --watch=false`.
- [ ] Documentation: Document where the API key placeholder/config lives in docs/versions.md, without committing a real key.
- [ ] DevOps: Add an environment/config placeholder for the API key and confirm it is excluded from source control.

## Metadata
- Points: 3 (Fibonacci) | Priority: P1 | Risk: 11/20
- Curriculum video: 26 (Live Destination Data with httpResource)
- Route doc: `docs/business-docs/03_search.md`
- Prototype reference: `docs/prototype/search.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-006-S4
TITLE: Debounce search query changes before triggering httpResource refetch
MILESTONE: TOS-006 Live destination data
LABELS: type:user-story, episode:tos-006, route:search, topic:httpresource, topic:signals, P2, points:3
BODY:
## ملخص
عشان منديش هجوم من الطلبات مع كل حرف بيتكتب، لازم يبقى فيه debounce قبل ما الـ query signal يشغل httpResource تاني. الهدف إن شاشة البحث تحس إنها ثابتة ومش بتوميض مع كل كبسة على الكيبورد.

## Story
**As a** trip planner, **I want** my typing in the search bar to settle briefly before a new destination data source request fires, **so that** the results list doesn't flicker through a loading state on every keystroke.

## Acceptance criteria
**AC1: Rapid typing produces one request, not one per keystroke**
- Given the trip planner types multiple characters quickly
- When they pause typing for the debounce interval
- Then exactly one destination data source request fires for the settled query rather than one request per keystroke

**AC2: Clearing within the debounce window fires no stale request**
- Given the trip planner types then immediately clears the search bar within the debounce window
- When the debounce interval elapses
- Then no request fires for the intermediate keystrokes, and the results list reflects the final (empty) query state, matching the "no query" empty state

**AC3: Pasted input respects the same debounce, no special-cased fast path**
- Given the trip planner pastes a full query in one action instead of typing it
- When the paste happens
- Then the request still waits out the same debounce interval as typed input, and the exact mechanism used to debounce the signal feeding `httpResource`'s request computation is verified against Angular's docs or the installed `.d.ts` before being presented as a settled pattern on camera

## Tasks
- [ ] Frontend: Debounce the search query signal (e.g. via an interval-based derived signal) before it feeds the `httpResource` request computation.
- [ ] Testing: Unit test that rapid keystrokes produce a single request after the debounce window and that a paste-then-settle case behaves the same way, with `pnpm exec ng test --watch=false`.
- [ ] Documentation: Record in docs/versions.md the exact debouncing mechanism used and confirm its behavior against Angular's docs or the installed `.d.ts`.

## Metadata
- Points: 3 (Fibonacci) | Priority: P2 | Risk: 12/20
- Curriculum video: 26 (Live Destination Data with httpResource)
- Route doc: `docs/business-docs/03_search.md`
- Prototype reference: `docs/prototype/search.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-007-S1
TITLE: Restructure the app into feature folders
MILESTONE: TOS-007 Selectorless refactor
LABELS: type:task, episode:tos-007, route:cross-cutting, topic:di, topic:routing, P1, points:5
BODY:
## ملخص
إعادة هيكلة المشروع لفولدرات features بدل التقسيم القديم، عشان البنية تبقى قابلة للتوسع ويتعلم منها المشاهد إزاي تتنظم Angular app كبيرة. المطلوب إن نفس بيانات trip.fixture.json تفضل شغالة زي ما هي بعد النقل، من غير أي feature جديدة.

## Story
**As a** series viewer, **I want** the codebase reorganized into feature folders (dashboard, search, builder, planner, copilot, review, states, shared), **so that** I can see how a real Angular app scales its architecture as it grows.

## Acceptance criteria
**AC1: Existing dashboard behavior is preserved after the move**
- Given the dashboard route already renders the four stops from `fixtures/trip.fixture.json` in the pre-restructure file layout
- When the codebase is reorganized into feature folders
- Then the dashboard still renders the same four stops (Egyptian Museum, Khan el-Khalili, Giza Pyramids, Nile dinner cruise) in the same day order, with no visual or behavioral difference

**AC2: Cross-feature boundary violation fails the build**
- Given feature folders each expose a public API through a barrel file
- When a component in one feature folder imports directly from another feature folder's internal file instead of its barrel
- Then the lint or build step fails with a boundary violation, preventing the leaky or circular import from merging

**AC3: An untouched route still resolves**
- Given a route not directly touched by this restructure at the time of the change
- When the app is built and served after the restructure
- Then that route still resolves and renders without error

## Tasks
- [ ] Frontend: Move existing components, routes, and services into feature-based folders (e.g. `src/app/features/dashboard`, `src/app/shared`) with barrel exports per folder.
- [ ] Frontend: Add a lint boundary rule (or equivalent) that fails the build on cross-feature imports that bypass a barrel file.
- [ ] Testing: Re-run existing specs after the move, updating only import paths (not test intent), to prove behavior is unchanged.
- [ ] Documentation: Update `AGENTS.md` or `docs/` with the new feature-folder layout and the import boundary rule.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 12/20
- Curriculum video: 31 (Refactoring to a Scalable, Selectorless Architecture)
- Route doc: `docs/business-docs/00_routes-overview.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-007-S2
TITLE: Convert the shared UI kit to selectorless components
MILESTONE: TOS-007 Selectorless refactor
LABELS: type:task, episode:tos-007, route:cross-cutting, topic:selectorless, P1, points:8
BODY:
## ملخص
تحويل مكونات الـ UI kit المشتركة زي button وbadge وcard لـ selectorless components بدل النداء بـ selector تقليدي. الحلقة دي عن تعلم النمط الجديد في Angular v22 مش عن ميزة جديدة، فالمطلوب إن نفس الشكل والسلوك يفضلوا زي ما هما بعد التحويل.

## Story
**As a** series viewer, **I want** the shared UI kit components converted to selectorless components, **so that** I can learn Angular v22's selectorless component pattern on a real, already-working piece of the app.

## Acceptance criteria
**AC1: Consuming routes render unchanged after conversion**
- Given the shared UI kit components (e.g. button, badge, card) currently render with their existing selectors across routes like the dashboard
- When each component is converted to a selectorless API surface, with the exact mechanism verified against the installed `@angular/core` .d.ts and Angular documentation at implementation time
- Then every route consuming those components still renders the same markup and styling as before the conversion

**AC2: A missing required input still fails the build**
- Given a consumer imports a converted shared component with a required input left unset
- When the app is built
- Then the TypeScript build fails on the missing required input, exactly as it did before the selectorless conversion

**AC3: A component with no optional inputs still renders its default state**
- Given a shared component with no optional inputs provided at all
- When it renders in its default state
- Then it displays identically to its pre-conversion default state, with no missing styling or layout shift

## Tasks
- [ ] Frontend: Verify the exact selectorless component API (import path, composition mechanism) against the installed `@angular/core` .d.ts and official docs before converting any component.
- [ ] Frontend: Convert shared UI kit components (button, badge, card, chip) to the verified selectorless pattern.
- [ ] Testing: Add or update component specs asserting rendered output and required-input build failures are unchanged pre/post conversion.
- [ ] Documentation: Record the verified selectorless API notes in `docs/versions.md` or an adjacent doc so the claim has a dated source.

## Metadata
- Points: 8 (Fibonacci) | Priority: P1 | Risk: 15/20
- Curriculum video: 31 (Refactoring to a Scalable, Selectorless Architecture)
- Route doc: `docs/business-docs/00_routes-overview.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-007-S3
TITLE: Tooltip and highlight directive for planner map markers
MILESTONE: TOS-007 Selectorless refactor
LABELS: type:user-story, episode:tos-007, route:planner, topic:selectorless, topic:a11y, P2, points:3, accessibility
BODY:
## ملخص
بناء directive جديد بيعمل tooltip وhighlight لما المستخدم يعدي بالماوس أو يعمل focus على أي marker في خريطة /planner. لازم يشتغل بالكيبورد برضه، مش بس بالماوس، عشان يعدي WCAG AA.

## Story
**As a** trip planner, **I want** to hover or focus a stop marker on the `/planner` route's map and see a tooltip with that stop's name and day, **so that** I can identify stops on the route without opening the full detail panel.

## Acceptance criteria
**AC1: Hovering a marker shows its tooltip**
- Given the `/planner` route's live map renders a node marker for each stop from the shared trip state
- When the trip planner hovers a marker with a mouse
- Then a tooltip appears showing that stop's name and day number, positioned near the marker

**AC2: Adjacent markers do not leave orphaned tooltips**
- Given two markers are adjacent on the map (e.g. after a reorder shifts stops close together)
- When the trip planner moves focus or the pointer quickly between them
- Then only one tooltip is visible at a time and no orphaned tooltip remains once the pointer or focus leaves both markers

**AC3: Keyboard focus shows the same tooltip and is announced to assistive technology**
- Given the same map marker
- When the trip planner reaches it via keyboard focus (Tab key) instead of a mouse
- Then the same tooltip appears and is exposed to assistive technology, satisfying the WCAG AA focus-visible and screen-reader requirements in `AGENTS.md`

## Tasks
- [ ] Frontend: Build the tooltip/highlight directive using the `host` object (no `@HostBinding`/`@HostListener`) per `AGENTS.md` conventions.
- [ ] Frontend: Wire the directive to the map marker template on `/planner`, driven by the shared trip state's stop list.
- [ ] Testing: Add tests covering hover, keyboard focus, and the adjacent-marker case; run an AXE check against the map panel.
- [ ] Documentation: Note the directive's public API and accessibility behavior in `docs/`.

## Metadata
- Points: 3 (Fibonacci) | Priority: P2 | Risk: 10/20
- Curriculum video: 31 (Refactoring to a Scalable, Selectorless Architecture)
- Route doc: `docs/business-docs/05_planner.md`
- Prototype reference: `docs/prototype/planner.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-007-S4
TITLE: Split the dashboard into smart and presentational components
MILESTONE: TOS-007 Selectorless refactor
LABELS: type:task, episode:tos-007, route:dashboard, route:cross-cutting, topic:signals, topic:selectorless, P2, points:5
BODY:
## ملخص
فصل شاشة /dashboard لمكون smart واحد بيقرا من الـ trip store، وحواليه presentational components زي Current Trip card وItinerary Stops مالهاش أي اتصال مباشر بالـ store. نفس البيانات المعروضة دلوقتي المفروض تفضل زي ما هي بعد الفصل.

## Story
**As a** series viewer, **I want** the `/dashboard` route split into one smart container component and several presentational child components, **so that** I can see a clean example of the smart/presentational pattern applied to a real screen.

## Acceptance criteria
**AC1: Dashboard content is unchanged and unrelated routes still resolve**
- Given the dashboard currently renders the Current Trip card, Itinerary Stops list, and Co-Pilot Status panel from a single component reading the trip store directly
- When the split is applied (one smart container plus presentational children receiving data via inputs)
- Then the dashboard displays the same trip name, completion state, and stop list as before the split, sourced from the same shared trip state, and any route other than `/dashboard` continues to resolve and render normally

**AC2: A presentational component has no hidden store dependency**
- Given a presentational child component is instantiated in a test with no trip store provided in the `TestBed`
- When it renders with inputs only
- Then it renders successfully, proving it has no hidden dependency on the trip store

**AC3: A presentational component handles its own empty input**
- Given a presentational child component (e.g. the Itinerary Stops list) receives an empty stops input
- When it renders with no stops
- Then it shows its own empty state independently, without the smart container needing to guard against the empty case

## Tasks
- [ ] Frontend: Extract the Current Trip card, Itinerary Stops, and Co-Pilot Status panel into presentational components taking signal inputs only.
- [ ] Frontend: Create a single smart `DashboardComponent` that reads the trip store and passes data down.
- [ ] Testing: Add specs for each presentational component in isolation (including the no-store-provided case and the empty-input case) plus a smart-component integration test against the fixture trip.
- [ ] Documentation: Document the smart/presentational boundary convention in `docs/` for reuse on other routes.

## Metadata
- Points: 5 (Fibonacci) | Priority: P2 | Risk: 10/20
- Curriculum video: 31 (Refactoring to a Scalable, Selectorless Architecture)
- Route doc: `docs/business-docs/02_dashboard.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-008-S1
TITLE: Add SSR to the planner route for fast first paint
MILESTONE: TOS-008 SSR and speed
LABELS: type:user-story, episode:tos-008, route:planner, topic:ssr, P0, points:8
BODY:
## ملخص
إضافة SSR لشاشة /planner عشان أول رسمة للصفحة تظهر بسرعة من غير ما المستخدم يستنى تحميل الـ JavaScript كله. هنقيس الفرق في وقت أول رسمة بالـ Lighthouse قبل وبعد التغيير.

## Story
**As a** trip planner, **I want** the `/planner` route to render its initial content on the server, **so that** I see the timeline and trip data immediately instead of a blank screen while the app boots.

## Acceptance criteria
**AC1: Server-rendered markup arrives before client JavaScript runs**
- Given the `/planner` route currently renders client-side only
- When SSR is enabled for the app shell, with the exact `@angular/ssr` setup verified against the installed package's .d.ts and Angular docs at build time
- Then the server-rendered response for `/planner` includes the stop timeline markup for the fixture trip before any client JavaScript executes, verified by viewing page source

**AC2: No hydration mismatch after SSR is enabled**
- Given the server-rendered `/planner` page reaches the browser
- When client-side hydration completes
- Then no hydration mismatch warning appears in the browser console for the timeline or map panel

**AC3: Browser-only APIs do not break the server render**
- Given the SSR-rendered page includes browser-only APIs used elsewhere in the app (e.g. `new Date()` formatting on the timeline)
- When the page renders on the server
- Then no such call throws or produces different output between the server and client render passes, per the SSR-safety guidance in `AGENTS.md`

## Tasks
- [ ] Frontend: Enable `@angular/ssr` for the app shell, verifying the exact setup steps against docs/.d.ts before wiring.
- [ ] Frontend: Audit `/planner` for browser-only globals and guard or defer them for SSR safety.
- [ ] Testing: Add a check that the SSR response includes the fixture trip's stop names, and confirm no hydration mismatch warnings on load.
- [ ] Documentation: Record before/after Lighthouse first-contentful-paint numbers for `/planner` in `docs/`.

## Metadata
- Points: 8 (Fibonacci) | Priority: P0 | Risk: 14/20
- Curriculum video: 35 (SSR, Incremental Hydration and @defer for Speed)
- Route doc: `docs/business-docs/05_planner.md`
- Prototype reference: `docs/prototype/planner.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-008-S2
TITLE: Incrementally hydrate the planner map on viewport
MILESTONE: TOS-008 SSR and speed
LABELS: type:user-story, episode:tos-008, route:planner, topic:ssr, topic:defer, P1, points:5
BODY:
## ملخص
خريطة /planner تتأجل عن الـ hydration لحد ما تدخل في viewport المستخدم، بدل ما تتحمل مع باقي الصفحة على طول. الهدف إن باقي الصفحة تبقى قابلة للتفاعل أسرع من غير ما تستنى جافاسكريبت الخريطة.

## Story
**As a** trip planner, **I want** the `/planner` map to hydrate only once it scrolls into view, **so that** the rest of the page becomes interactive sooner without waiting for the map's JavaScript to activate.

## Acceptance criteria
**AC1: The rest of the page is interactive before the map hydrates, and scrolling it into view hydrates it**
- Given SSR renders the `/planner` page with the map panel present but not yet hydrated
- When the map panel is outside the viewport on initial load, and the trip planner later scrolls it into view
- Then the timeline and detail panel are already interactive while the map remains a static server-rendered shell, with the hydration trigger's exact syntax verified against the installed `@angular/core` .d.ts and Angular docs, and once scrolled into view the map hydrates and becomes interactive (marker hover/click works) without a full page reload

**AC2: Interacting with the map before its hydration trigger fires does not break it**
- Given the map panel is server-rendered but not yet hydrated
- When the trip planner clicks a map marker before the viewport trigger fires
- Then the click produces no console error and no partially-applied state change, and the marker becomes interactive only once hydration completes

**AC3: A reorder made before hydration is reflected once the map hydrates**
- Given the trip planner reorders a stop via the timeline before the map has hydrated
- When the map later hydrates
- Then it renders the current, already-reordered route state, not a stale pre-hydration snapshot

## Tasks
- [ ] Frontend: Apply an on-viewport hydration trigger to the map panel, verifying the exact syntax against docs/.d.ts before use.
- [ ] Frontend: Ensure the map reads live trip-state signals so it reflects any reorder that happened before hydration.
- [ ] Testing: Add a test simulating scroll-into-view to confirm the map hydrates and reflects current state.
- [ ] Documentation: Note the hydration trigger choice and its verified behavior in `docs/`.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 13/20
- Curriculum video: 35 (SSR, Incremental Hydration and @defer for Speed)
- Route doc: `docs/business-docs/05_planner.md`
- Prototype reference: `docs/prototype/planner.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-008-S3
TITLE: Defer the heavy planner map panel with a loading skeleton
MILESTONE: TOS-008 SSR and speed
LABELS: type:user-story, episode:tos-008, route:planner, topic:defer, P1, points:5
BODY:
## ملخص
استخدام @defer عشان لوحة الخريطة الثقيلة في /planner تتحمل بعدين مش على طول مع الصفحة، وتظهر بدالها شاشة تحميل زي اللي موصوف في 05_planner.md بعنوان LOADING SPATIAL CONTEXT.

## Story
**As a** trip planner, **I want** the heavy map panel on `/planner` to load behind an `@defer` block with a placeholder, **so that** the rest of the page appears quickly while the map's bundle loads separately.

## Acceptance criteria
**AC1: A matching skeleton shows before the map loads, then the real map replaces it without layout shift**
- Given the `/planner` route loads
- When the map panel's code has not yet loaded, and its trigger condition is later met (matching the incremental-hydration story's viewport trigger)
- Then a skeleton placeholder matching the documented "LOADING SPATIAL CONTEXT" state is shown first, with the exact `@defer` block configuration verified against Angular docs and the installed `.d.ts` at build time, and once the trigger fires the skeleton is replaced by the real map showing the current route with no layout shift

**AC2: A failed chunk load shows a failure message instead of a stuck skeleton**
- Given the deferred map panel's chunk fails to load (simulated network failure)
- When the `@defer` block resolves its failure path
- Then a load-failure message replaces the skeleton rather than the skeleton persisting indefinitely, with the exact `@defer` error-block syntax verified against Angular docs and the installed `.d.ts`

**AC3: An empty trip does not get stuck on the loading skeleton**
- Given the trip has no stops at all
- When `/planner` loads and the deferred map panel's content resolves
- Then it shows the documented empty-route state instead of remaining on the loading skeleton indefinitely

## Tasks
- [ ] Frontend: Wrap the map panel in an `@defer` block with a `@placeholder` matching the "LOADING SPATIAL CONTEXT" skeleton and an appropriate empty/error fallback.
- [ ] Frontend: Confirm the trigger condition matches the viewport-based hydration approach from the incremental hydration story.
- [ ] Testing: Add a test asserting the placeholder renders before the trigger fires and the real map renders after.
- [ ] Documentation: Document the chosen `@defer` trigger and fallback states in `docs/`.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 12/20
- Curriculum video: 35 (SSR, Incremental Hydration and @defer for Speed)
- Route doc: `docs/business-docs/05_planner.md`
- Prototype reference: `docs/prototype/planner.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-008-S4
TITLE: Serve destination photos with NgOptimizedImage and measure the gain
MILESTONE: TOS-008 SSR and speed
LABELS: type:user-story, episode:tos-008, route:search, topic:a11y, P2, points:3, accessibility
BODY:
## ملخص
استخدام NgOptimizedImage لصور الوجهات في نتائج /search بدل الـ img العادي، وقياس الفرق في الـ Lighthouse score قبل وبعد عشان يبان التحسن على الكاميرا بأرقام حقيقية.

## Story
**As a** series viewer, **I want** the destination photos on `/search` result cards served through `NgOptimizedImage`, **so that** I can see a measured Lighthouse performance improvement demonstrated with real before/after numbers.

## Acceptance criteria
**AC1: Result cards render the same photos through NgOptimizedImage**
- Given `/search` result cards currently render destination photos with a plain `<img>` tag
- When the photos are switched to `NgOptimizedImage`, with directive usage verified against the installed `@angular/core` .d.ts and Angular docs at implementation time
- Then each result card still shows the correct destination photo with no broken images or layout shift

**AC2: A failed image load falls back gracefully**
- Given a destination photo fails to load from its source
- When `NgOptimizedImage` cannot resolve the image
- Then a graceful fallback (placeholder image or visible alt text) appears instead of a broken-image icon, and the result card's layout stays intact

**AC3: Lighthouse shows a measurable improvement**
- Given the `/search` page is measured with Lighthouse before and after the `NgOptimizedImage` change
- When the after-measurement is taken
- Then the recorded Largest Contentful Paint and image-related Lighthouse flags show a measurable improvement over the before-measurement, with both numbers recorded in `docs/`

## Tasks
- [ ] Frontend: Replace plain `<img>` destination photos on `/search` result cards with `NgOptimizedImage`, verifying required attributes (e.g. width, height, priority) against docs/.d.ts.
- [ ] Frontend: Add alt text for every destination photo to satisfy the WCAG AA requirement in `AGENTS.md`.
- [ ] Testing: Add a broken-image-source test confirming the fallback path renders correctly.
- [ ] Documentation: Record before/after Lighthouse scores and LCP numbers for `/search` in `docs/`.

## Metadata
- Points: 3 (Fibonacci) | Priority: P2 | Risk: 8/20
- Curriculum video: 35 (SSR, Incremental Hydration and @defer for Speed)
- Route doc: `docs/business-docs/03_search.md`
- Prototype reference: `docs/prototype/search.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-009-S1
TITLE: Unit test the trip store and its computed totals
MILESTONE: TOS-009 Testing
LABELS: type:task, episode:tos-009, route:cross-cutting, topic:signals, topic:testing, P0, points:5
BODY:
## ملخص
اختبارات Vitest للـ trip store والـ computed signals بتاعة الإجمالي، زي عدد الـ stops وإجمالي التكلفة وتجميع الأيام، باستخدام trip.fixture.json زي ما هو. لازم الحالة الفاضية والحواف تتغطى برضه، مش بس الحالة السعيدة.

## Story
**As a** series viewer, **I want** the shared trip store and its computed totals covered by Vitest unit tests, **so that** I can see how signal-based state is tested deterministically without a browser.

## Acceptance criteria
**AC1: Computed totals match the fixture trip**
- Given the trip store is seeded with `fixtures/trip.fixture.json` (4 stops, totaling 2300 in estimated cost and 510 minutes of duration, 2 stops on day 1 and 2 stops on day 2)
- When the computed total-cost and total-duration signals are read
- Then they return 2300 and 510 respectively, matching the sum of the fixture's stop values

**AC2: Removing a non-existent stop id changes nothing**
- Given the store's `remove_stop` operation is called with a stop id that does not exist in the current trip
- When the operation runs
- Then the store's stop list and every computed total remain unchanged, verified by asserting the same values before and after the call

**AC3: An empty trip produces safe zero totals**
- Given every stop is removed from the trip
- When the computed totals are read on the now-empty trip
- Then total cost and total duration both read 0 and no derived signal produces `NaN` or throws, with any average-cost-per-stop computation explicitly handling the zero-stop case

## Tasks
- [ ] Frontend: Add or expose any computed signal needed for the tests (e.g. total duration, average cost) if not already present on the trip store.
- [ ] Testing: Write Vitest specs for AC1 through AC3 using `fixtures/trip.fixture.json` as seed data.
- [ ] Testing: Scope the run with `pnpm exec ng test --watch=false --include='src/**/trip-store*.spec.ts'` during development.
- [ ] Documentation: Note the store's tested computed signals in `docs/`.

## Metadata
- Points: 5 (Fibonacci) | Priority: P0 | Risk: 9/20
- Curriculum video: 39 (Testing the App with Vitest and Playwright)
- Route doc: `docs/business-docs/00_routes-overview.md`
- Prototype reference: `docs/prototype/index.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-009-S2
TITLE: Test Signal Forms validation for the builder's trip basics step
MILESTONE: TOS-009 Testing
LABELS: type:task, episode:tos-009, route:builder, topic:signal-forms, topic:testing, P1, points:5
BODY:
## ملخص
اختبار منطق الـ validation بتاع Signal Forms في الخطوة الأولى من /builder wizard: اسم الرحلة مطلوب، وتاريخ النهاية لازم يكون بعد تاريخ البداية. الاختبارات دي بتتأكد من رسايل الخطأ نفسها، مش بس إن الفورم valid أو لأ.

## Story
**As a** series viewer, **I want** the `/builder` Step 1 Signal Forms validation logic (required trip name, end date after start date) covered by unit tests, **so that** I can see how Signal Forms validation is tested independent of the DOM.

## Acceptance criteria
**AC1: A fully valid Step 1 form reports valid**
- Given the Step 1 trip-basics form is filled with a valid trip name, a start date, and an end date after the start date
- When the form's validation state is read
- Then the form reports valid with no field errors, with the exact Signal Forms validation API verified against the installed `@angular/forms` .d.ts and Angular docs at implementation time

**AC2: An end date before the start date is rejected**
- Given the end date is set earlier than the start date
- When the form's validation state is read
- Then the end date field reports the "Start date must come before end date" error and the overall form reports invalid

**AC3: A missing trip name does not affect unrelated fields**
- Given the trip name field is left empty
- When the form's validation state is read
- Then the required-field error is reported for that field only, leaving the date fields' validation state unaffected by the unrelated missing field

## Tasks
- [ ] Frontend: Confirm the Step 1 Signal Forms schema and validators exist for the required trip name and date-order rules, adding them if missing.
- [ ] Testing: Write unit tests asserting the form's validation signal for each AC without rendering the full wizard UI.
- [ ] Testing: Scope the run with `pnpm exec ng test --watch=false --include='src/**/builder*.spec.ts'`.
- [ ] Documentation: Note the verified Signal Forms validation API usage in `docs/`.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 13/20
- Curriculum video: 39 (Testing the App with Vitest and Playwright)
- Route doc: `docs/business-docs/04_builder.md`
- Prototype reference: `docs/prototype/builder.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-009-S3
TITLE: Mock httpResource in search results component tests
MILESTONE: TOS-009 Testing
LABELS: type:task, episode:tos-009, route:search, topic:httpresource, topic:testing, P1, points:5
BODY:
## ملخص
اختبار مكون نتائج /search من غير نداء شبكة حقيقي، عن طريق عمل mock للـ httpResource اللي بيجيب بيانات الوجهات. بنتأكد من حالة التحميل والنتائج وحالة الخطأ الثلاثة.

## Story
**As a** series viewer, **I want** the `/search` results component tested with a mocked `httpResource`, **so that** I can see how resource-backed components are tested without a real network call.

## Acceptance criteria
**AC1: Mocked results render the correct number of cards**
- Given the `/search` results component uses `httpResource` to fetch destinations
- When the resource is mocked to resolve with a fixed set of destination results
- Then the component renders the same number of result cards as mocked destinations, with correct names and regions, with the exact `httpResource` testing approach verified against the installed `@angular/common/http` .d.ts and Angular docs

**AC2: A mocked error state shows the documented empty/error message**
- Given the mocked `httpResource` is set to an error state
- When the component renders
- Then the documented "No destinations matched" state (or an equivalent error state) is shown instead of a blank or broken results list

**AC3: A mocked loading state shows the skeleton**
- Given the mocked `httpResource` is still loading
- When the component renders during that loading window
- Then the card skeleton loading state is shown instead of an empty or undefined results list

## Tasks
- [ ] Frontend: Confirm the `/search` results component exposes a way to inject or mock its `httpResource` in tests (e.g. via a `TestBed` provider override).
- [ ] Testing: Write component tests for the loading, success, and error states listed in the ACs.
- [ ] Testing: Scope the run with `pnpm exec ng test --watch=false --include='src/**/search*.spec.ts'`.
- [ ] Documentation: Note the verified `httpResource` mocking pattern in `docs/` for reuse on other resource-backed routes.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 12/20
- Curriculum video: 39 (Testing the App with Vitest and Playwright)
- Route doc: `docs/business-docs/03_search.md`
- Prototype reference: `docs/prototype/search.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-009-S4
TITLE: Playwright E2E flow from search to builder to review summary
MILESTONE: TOS-009 Testing
LABELS: type:task, episode:tos-009, route:search, route:builder, route:review, topic:testing, topic:ci-cd, P0, points:8
BODY:
## ملخص
اختبار Playwright بياخد المستخدم من البحث في /search، لإضافة وجهة، لبناء الرحلة في /builder، لحد ما يشوف الملخص في /review. الاختبار ده بيتشغل في CI عشان يلحق أي كسر في الـ flow الأساسي بتاع التطبيق.

## Story
**As a** series viewer, **I want** an end-to-end Playwright test that searches for a destination, adds it to the trip, completes the builder wizard, and verifies the `/review` summary, **so that** I can see how a real cross-route user flow is protected by a single automated test.

## Acceptance criteria
**AC1: The full flow adds a destination visible in the review summary**
- Given a running app with the fixture trip loaded
- When the Playwright test searches `/search` for a destination, adds it to the trip, completes the `/builder` wizard steps, and reaches `/review`
- Then `/review` shows the added destination in the itinerary list alongside the original fixture stops, and no undo affordance is asserted for that addition, since full undo/redo does not exist yet

**AC2: An unresolved builder conflict still allows reaching review with the warning visible**
- Given the builder wizard's Step 4 validation reports a conflict (e.g. stops exceeding the trip window)
- When the Playwright test reaches that step without resolving the conflict
- Then the test asserts the conflict banner text is shown and that "Finish & review" still allows navigating to `/review`, with the warning still visible there, matching the soft-warning behavior in `docs/business-docs/04_builder.md` and `docs/business-docs/07_review.md`

**AC3: The flow is repeatable from a reset trip**
- Given the flow is run against a freshly reset trip (via the `/review` "Reset demo" action)
- When the same search-to-review flow is repeated
- Then it completes again without relying on state left over from a previous test run

## Tasks
- [ ] Testing: Write the Playwright spec covering AC1 through AC3 across `/search`, `/builder`, and `/review`.
- [ ] Testing: Use the `/review` "Reset demo" action (or an equivalent fixture reset) as test setup/teardown to keep the flow independent.
- [ ] DevOps: Wire the Playwright suite into CI so it runs on every push, per the "running the suite in CI" scope of this episode.
- [ ] Documentation: Document the E2E flow and how to run it locally in `docs/`.

## Metadata
- Points: 8 (Fibonacci) | Priority: P0 | Risk: 14/20
- Curriculum video: 39 (Testing the App with Vitest and Playwright)
- Route doc: `docs/business-docs/04_builder.md`
- Prototype reference: `docs/prototype/builder.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-009-S5
TITLE: Build the states gallery as a real QA-testable route
MILESTONE: TOS-009 Testing
LABELS: type:user-story, episode:tos-009, route:states, topic:testing, topic:signals, P1, points:5
BODY:
## ملخص
بناء شاشة /states كصفحة حقيقية فيها كل حالات الـ loading وempty وerror وconflict الموصوفة في 08_states.md، عشان الـ QA reviewer يقدر يتأكد من كل حالة من غير ما يعيد إنتاج الظرف الحقيقي. أي صف بيمثل حالة أداة AI هنا شكل ثابت بس، مش نداء AI فعلي.

## Story
**As a** QA reviewer, **I want** the `/states` gallery route to render every documented loading, empty, error, and conflict state as real, inspectable UI, **so that** I can validate each state without reproducing the real condition that triggers it.

## Acceptance criteria
**AC1: The gallery renders the documented loading, empty, and feedback states**
- Given the `/states` route is opened
- When it renders, and the QA reviewer clicks the "Fire feedback" button
- Then it shows, as static rendered UI, the card skeleton, the map loading skeleton with the "LOADING SPATIAL CONTEXT" text, the empty search results state, the empty itinerary state, and the date-validation error state, each matching its description in `docs/business-docs/08_states.md`, and clicking "Fire feedback" shows a toast matching one of the documented feedback states (the conflict toast or the success toast with an "Undo" button) that dismisses on its own or on repeat interaction, without navigating away from `/states`

**AC2: The gallery is not reachable from production navigation**
- Given `docs/business-docs/08_states.md` requires `/states` to be hidden from end users in production
- When the app is built in production configuration
- Then `/states` is not reachable through normal navigation (gated behind a dev/QA path prefix or a feature flag) and no link to it appears in the main nav

**AC3: Tool activity rows are static, not live AI calls**
- Given the AI/tool activity states section (`reorder_itinerary · RUNNING`, `add_stop · DONE`, `add_stop · FAILED`)
- When these rows render on `/states`
- Then they are static, pre-set rows showing each status label and, for the FAILED row, a "Retry action" button, with no live AI or tool call happening behind them; this gallery route only demonstrates the UI shape, not working AI behavior

## Tasks
- [ ] Frontend: Build the `/states` route rendering every state category from `docs/business-docs/08_states.md` as static, selectable UI blocks.
- [ ] Frontend: Wire the "Fire feedback" button to trigger one of the documented toast states on demand; note that the success toast's "Undo" button is a rendered affordance only, since full undo/redo does not exist yet.
- [ ] Frontend: Gate `/states` behind a dev/QA route prefix or feature flag so it is unreachable from production navigation, per `docs/business-docs/08_states.md`.
- [ ] Testing: Add tests asserting each documented state renders its expected text and that `/states` passes an AXE check.
- [ ] Documentation: Cross-link `/states` from `docs/business-docs/08_states.md` as the route now implementing that spec.

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 9/20
- Curriculum video: 39 (Testing the App with Vitest and Playwright)
- Route doc: `docs/business-docs/08_states.md`
- Prototype reference: `docs/prototype/states.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-010-S1
TITLE: Expose search and get_trip_state as AI-callable WebMCP tools
MILESTONE: TOS-010 WebMCP tools
LABELS: type:user-story, episode:tos-010, route:search, route:copilot, topic:webmcp, topic:di, P1, points:5
BODY:
## ملخص
الحلقة دي مش بتضيف قدرة جديدة، هي بس بتفتح اتنين من الميثودز الموجودة في الـ trip store، search و get_trip_state، عشان الـ AI agent يقدر يناديهم زي أي حد تاني.
الهدف إن أي إجابة من الـ co-pilot تبقى مبنية على بيانات الرحلة الحقيقية، مش تخمين.

## Story
**As a** trip planner, **I want** the AI co-pilot to be able to call search and get_trip_state on the same trip store the app uses, **so that** its answers are grounded in my real itinerary instead of a guess.

## Acceptance criteria
**AC1: happy path**
- Given the app has registered its WebMCP tools via provideWebMcpTools
- When an AI agent calls the search tool with a destination query
- Then the tool's execute() runs in an injection context, calls the existing trip store search method directly, and returns the same result shape the human-facing search screen would show

**AC2: error or validation case**
- Given the AI agent calls get_trip_state before any trip has loaded
- When the tool executes
- Then it returns a defined empty or loading state rather than throwing, so the AI agent receives a result it can reason about instead of an unhandled rejection

**AC3: edge case**
- Given the search tool is called with a query that matches zero stops in fixtures/trip.fixture.json
- When execute() runs
- Then it returns an empty result set, not an error, matching the same "no results" contract the human-facing search UI uses

## Tasks
- [ ] Frontend: register search and get_trip_state as WebMCP tools via provideWebMcpTools, each execute() calling the existing trip store method with no new store logic
- [ ] Frontend: define each tool's input/output schema so it matches the shape the human-facing search UI already consumes
- [ ] Testing: unit test that each tool's execute() runs in an injection context and returns identical data to calling the store method directly
- [ ] Documentation: document the two tools in docs/business-docs/06_copilot.md's tool list cross-reference

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 11/20
- Curriculum video: 41 (WebMCP Tools, Let the AI Agent Drive the App)
- Route doc: `docs/business-docs/06_copilot.md`
- Prototype reference: `docs/prototype/copilot.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-010-S2
TITLE: Expose add_stop and remove_stop as AI-callable WebMCP tools
MILESTONE: TOS-010 WebMCP tools
LABELS: type:user-story, episode:tos-010, route:planner, route:copilot, topic:webmcp, topic:di, P1, points:5
BODY:
## ملخص
هنا بنفتح اتنين تانيين من الست ميثودز الموجودة، add_stop و remove_stop، للـ AI عشان يقدر يضيف أو يشيل محطة من الرحلة.
مفيش منطق جديد بيتضاف، الأداة بس بتنادي نفس الميثود اللي زرار الإضافة في /planner بينادها.

## Story
**As a** trip planner, **I want** the AI co-pilot to be able to call add_stop and remove_stop on my itinerary, **so that** I can ask it to add or drop a stop and see the same change /planner would show if I clicked the button myself.

## Acceptance criteria
**AC1: happy path**
- Given the AI agent has access to the registered add_stop tool
- When it calls add_stop with a valid destination payload
- Then the trip store's existing add_stop method runs, the new stop appears in the shared trip state, and every route reading that state, such as /planner, reflects it immediately

**AC2: error or validation case**
- Given the AI agent calls remove_stop with a stop id that does not exist in the current trip
- When the tool executes
- Then it returns a defined "not found" result rather than throwing, matching the error contract the trip store already returns to human-triggered removals

**AC3: edge case**
- Given the trip currently has zero stops
- When the AI agent calls remove_stop
- Then the tool returns a defined empty-state result and does not mutate the trip store

## Tasks
- [ ] Frontend: register add_stop and remove_stop as WebMCP tools via provideWebMcpTools, execute() delegating to the existing trip store methods
- [ ] Frontend: reuse the same validation the human-facing add/remove UI already applies, do not duplicate business rules in the tool layer
- [ ] Testing: unit test that a tool-invoked add_stop or remove_stop produces the identical trip store state as the equivalent UI action
- [ ] Documentation: document the two tools in docs/business-docs/06_copilot.md's tool list cross-reference

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 12/20
- Curriculum video: 41 (WebMCP Tools, Let the AI Agent Drive the App)
- Route doc: `docs/business-docs/06_copilot.md`
- Prototype reference: `docs/prototype/copilot.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-010-S3
TITLE: Expose edit_stop and reorder_itinerary as AI-callable WebMCP tools
MILESTONE: TOS-010 WebMCP tools
LABELS: type:user-story, episode:tos-010, route:planner, route:copilot, topic:webmcp, topic:di, P1, points:5
BODY:
## ملخص
التالت جروب من الأدوات، edit_stop و reorder_itinerary، بيفتحوا للـ AI إنه يعدل تفاصيل محطة أو يرتب الرحلة كلها من جديد.
زي باقي الحلقة، دول ميثودز موجودة في الـ trip store من TOS-003، مفيش أي قدرة AI-only بتتخترع هنا.

## Story
**As a** trip planner, **I want** the AI co-pilot to be able to call edit_stop and reorder_itinerary, **so that** I can ask it to tweak a stop's details or resequence my whole plan instead of dragging things around myself.

## Acceptance criteria
**AC1: happy path**
- Given the AI agent has access to the registered edit_stop tool
- When it calls edit_stop with a valid stop id and a partial update, such as days, nights, status, or activities
- Then the trip store's existing edit_stop method applies the change and the shared trip state reflects the updated stop everywhere it is read

**AC2: error or validation case**
- Given the AI agent calls reorder_itinerary with a stop ordering that omits or duplicates a stop id
- When the tool executes
- Then it returns a defined validation error without mutating the stored order, matching whatever ordering-integrity check the trip store already enforces

**AC3: edge case**
- Given the trip has exactly one stop
- When the AI agent calls reorder_itinerary
- Then the tool returns the single-stop order unchanged rather than erroring on a no-op reorder

## Tasks
- [ ] Frontend: register edit_stop and reorder_itinerary as WebMCP tools via provideWebMcpTools, execute() delegating to the existing trip store methods
- [ ] Frontend: define the reorder tool's input schema to match the full stop-id ordering contract the store method already expects
- [ ] Testing: unit test edit_stop and reorder_itinerary tool calls against the store's existing validation rules, including the duplicate or omitted id case
- [ ] Documentation: document the two tools in docs/business-docs/06_copilot.md's tool list cross-reference

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 13/20
- Curriculum video: 41 (WebMCP Tools, Let the AI Agent Drive the App)
- Route doc: `docs/business-docs/06_copilot.md`
- Prototype reference: `docs/prototype/copilot.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-010-S4
TITLE: Scope WebMCP tool registration to lazy-loaded routes
MILESTONE: TOS-010 WebMCP tools
LABELS: type:user-story, episode:tos-010, route:copilot, route:cross-cutting, topic:webmcp, topic:routing, topic:di, P1, points:5
BODY:
## ملخص
هنا بنتأكد إن الست أدوات مش شغالة كلها طول الوقت.
كل أداة لازم تتسجل وتتشال مع الـ route اللي بيملك الـ feature بتاعها، فلو المستخدم لسه ما فتحش /planner، الـ AI متقدرش ينادي add_stop أصلا.
ده حماية إضافية، مش قدرة جديدة.

## Story
**As a** trip planner, **I want** the co-pilot's tools to only exist while the part of the app that owns them is loaded, **so that** the AI can never call a tool whose route and context are not actually active.

## Acceptance criteria
**AC1: happy path**
- Given the user has not yet navigated to the lazy-loaded /planner route
- When the AI agent inspects the currently available tools
- Then add_stop, remove_stop, edit_stop, and reorder_itinerary are not present in that list

**AC2: error or validation case**
- Given the AI agent calls a tool that belonged to a route the user has since navigated away from
- When the tool call is attempted after the route unloads
- Then the call fails with a defined "tool not available" result rather than silently operating on stale state

**AC3: edge case**
- Given the user navigates to /planner, then away, then back to /planner again
- When the tools are inspected after the second navigation
- Then the same tools are re-registered exactly once, with no duplicate entries in the tool list

## Tasks
- [ ] Research: confirm how provideWebMcpTools interacts with Angular's route-level, lazy-loaded provider lifecycle, since this determines whether tool registration and unregistration is automatic or needs explicit teardown; verify against Angular docs and the installed WebMCP package's .d.ts before building
- [ ] Frontend: move the four mutation tools' registration into the lazy-loaded route or routes that own their feature, keep the two read tools registered at a scope that matches where trip state is actually available
- [ ] Testing: test navigation in and out of the lazy route confirms tools appear, disappear, and do not duplicate on re-entry
- [ ] Documentation: note the tool-to-route ownership mapping in docs/business-docs/06_copilot.md

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 14/20
- Curriculum video: 41 (WebMCP Tools, Let the AI Agent Drive the App)
- Route doc: `docs/business-docs/06_copilot.md`
- Prototype reference: `docs/prototype/copilot.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-011-S1
TITLE: Stream the co-pilot's chat reply token by token in a zoneless app
MILESTONE: TOS-011 Streaming chat panel
LABELS: type:user-story, episode:tos-011, route:copilot, topic:streaming, topic:zoneless, topic:signals, P1, points:8
BODY:
## ملخص
الحلقة دي بتوصل أول استريمنج فعلي لرد الـ AI جوه /copilot.
الكلام بيظهر تدريجي كل ما التوكن يوصل، مش دفعة واحدة، وكل ده من غير Zone.js.
مفيش أي tool call هنا لسه، بس شكل الشات نفسه وهو بيتكتب.

## Story
**As a** trip planner, **I want** to see the co-pilot's reply appear word by word as it streams in, **so that** the conversation feels responsive instead of showing a blank panel until the whole answer arrives.

## Acceptance criteria
**AC1: happy path**
- Given the user has submitted a chat message
- When the LLM response begins streaming back
- Then the chat message content updates incrementally as chunks arrive, rendered through signal-based message state, without requiring Zone.js change detection

**AC2: error or validation case**
- Given the streaming connection drops mid-response
- When no further chunks arrive within a defined timeout
- Then the partial message is preserved on screen and a defined "response interrupted" state is shown, rather than the panel appearing frozen with no explanation

**AC3: edge case**
- Given the user submits a new message while a previous response is still streaming
- When the new submission happens
- Then the prior stream either completes or is explicitly cancelled before the new one starts, so two streams never interleave into the same message

## Tasks
- [ ] Frontend: model chat message state, including in-progress streaming text, with signals, updating per received chunk
- [ ] Frontend: verify the app's zoneless change detection actually reflects each streamed chunk without manual workarounds; confirm the exact mechanism against Angular's zoneless docs before relying on it
- [ ] Testing: test incremental rendering across multiple chunks, an interrupted stream, and overlapping submissions
- [ ] Documentation: note the streaming state pattern in docs/business-docs/06_copilot.md

## Metadata
- Points: 8 (Fibonacci) | Priority: P1 | Risk: 13/20
- Curriculum video: 42 (The Streaming AI Chat Panel, Zoneless)
- Route doc: `docs/business-docs/06_copilot.md`
- Prototype reference: `docs/prototype/copilot.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-011-S2
TITLE: Show a tool activity log with RUNNING, APPLIED, and FAILED states
MILESTONE: TOS-011 Streaming chat panel
LABELS: type:user-story, episode:tos-011, route:copilot, topic:webmcp, topic:signals, P1, points:5
BODY:
## ملخص
كل مرة الـ AI ينادي واحدة من الست أدوات، لازم يظهر سطر في الـ Tool Activity panel بيوضح اسم الأداة وحالتها: RUNNING لحد ما تخلص، وبعدين APPLIED أو FAILED.
لو اتطبقت، بيظهر الـ diff وزرار Undo جنبها، ولو فشلت بيظهر زرار Retry.

## Story
**As a** trip planner, **I want** to see every tool call the co-pilot makes listed with its live status and a diff of what changed, **so that** I can verify exactly what the AI did before I trust it.

## Acceptance criteria
**AC1: happy path**
- Given the AI agent calls a mutation tool such as add_stop
- When the call starts, and later completes successfully
- Then the Tool Activity panel shows RUNNING and then APPLIED with a diff showing the added stop, an Undo button, and a "Review changes" button; when the user clicks Undo, the change reverts in the shared trip state and a "CHANGE REVERTED" confirmation appears inline

**AC2: error or validation case**
- Given a tool call fails, for example a validation error from the trip store
- When the failure is returned
- Then the panel shows a FAILED status with a "Retry action" button, and no diff is shown since nothing was applied

**AC3: edge case**
- Given no tool has been called yet in the current conversation
- When the user opens /copilot
- Then the Tool Activity panel shows a defined empty-state message rather than an empty list with no explanation

## Tasks
- [ ] Frontend: build the Tool Activity panel driven by a signal-based log of tool calls, tracking name, status, diff, and timestamps
- [ ] Frontend: render the diff view with addition, removal, and edit markers for APPLIED entries, and the Retry action for FAILED entries
- [ ] Testing: test the RUNNING to APPLIED and RUNNING to FAILED transitions, plus the empty-state and Retry paths, and the Undo to CHANGE REVERTED path
- [ ] Documentation: update docs/business-docs/06_copilot.md's cross-reference if the implemented log shape differs from the prototype

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 10/20
- Curriculum video: 42 (The Streaming AI Chat Panel, Zoneless)
- Route doc: `docs/business-docs/06_copilot.md`
- Prototype reference: `docs/prototype/copilot.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-011-S3
TITLE: Undo a single AI action and confirm it was reverted
MILESTONE: TOS-011 Streaming chat panel
LABELS: type:user-story, episode:tos-011, route:copilot, topic:webmcp, topic:signals, P0, points:8
BODY:
## ملخص
دي أهم حلقة في التزام المنتج كله: أي حاجة الـ AI يغيرها لازم ترجع تتلغي.
هنا أول مرة الـ Undo بيبقى حقيقي مش زرار شكلي، كل action ليه نقطة رجوع بترجعه بالظبط زي ما كان.
وبعدها رسالة CHANGE REVERTED بتأكد إن الرجوع حصل فعلا.

## Story
**As a** trip planner, **I want** to undo any single AI action and see a confirmation that it was reverted, **so that** I can let the co-pilot make changes without fear of losing my plan.

## Acceptance criteria
**AC1: happy path**
- Given a tool call is shown as APPLIED in the Tool Activity panel
- When the user clicks that action's Undo button
- Then the trip store reverts to its state immediately before that specific action, the shared trip state updates everywhere it is read, and a "CHANGE REVERTED" message appears inline in the chat

**AC2: error or validation case**
- Given the user has already undone an action once
- When the user attempts to click Undo on that same already-reverted action again
- Then the Undo control is disabled or a defined "already reverted" message is shown, and the trip store is not mutated a second time

**AC3: edge case**
- Given two AI actions were applied in sequence, for example add_stop then edit_stop on the same stop
- When the user undoes only the first action while the second remains applied
- Then only that specific action's effect is reverted, and the store's resulting state is a defined, verifiable value rather than an undefined merge of the two

## Tasks
- [ ] Research: confirm the trip store's approach for capturing a per-action revert point, full snapshot versus inverse operation, since this determines what "revert this one action while keeping others" actually means; verify feasibility before committing to an approach
- [ ] Frontend: implement per-action undo against the signal-based trip store, wired to the Tool Activity panel's Undo button
- [ ] Frontend: render the "CHANGE REVERTED" inline confirmation in the chat after a successful undo
- [ ] Testing: test undo of the most recent action, undo of a non-latest action among several applied actions, and double-undo protection
- [ ] Documentation: document the undo model, snapshot versus inverse operation, in docs/business-docs/06_copilot.md

## Metadata
- Points: 8 (Fibonacci) | Priority: P0 | Risk: 14/20
- Curriculum video: 42 (The Streaming AI Chat Panel, Zoneless)
- Route doc: `docs/business-docs/06_copilot.md`
- Prototype reference: `docs/prototype/copilot.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-011-S4
TITLE: Show a destination card in chat with an Add button that inserts the stop
MILESTONE: TOS-011 Streaming chat panel
LABELS: type:user-story, episode:tos-011, route:copilot, topic:webmcp, topic:signals, P1, points:5
BODY:
## ملخص
لما الـ AI ينادي search ويلاقي مكان مناسب، بيظهر كارت للمكان ده جوه الشات، مش بيتضاف لوحده.
المستخدم هو اللي بيضغط Add عشان add_stop تتنفذ فعلا، وبعدين الكارت بيتحول لحالة ADDED.
وطبعا زي أي تغيير تاني، ده قابل للـ Undo.

## Story
**As a** trip planner, **I want** a destination the co-pilot finds via search to appear as a card in chat with an Add button, **so that** I decide whether it actually gets added to my trip rather than the AI inserting it on its own.

## Acceptance criteria
**AC1: happy path**
- Given the AI agent has called the search tool and found a matching destination
- When the destination card renders in the chat
- Then it shows an Add button, and clicking it calls add_stop, updates the shared trip state, changes the card to a confirmed ADDED state, and makes an Undo option available for that addition, with a "CHANGE REVERTED" confirmation if the user later clicks it

**AC2: error or validation case**
- Given the user clicks Add on a destination card
- When add_stop fails, for example because the stop already exists in the trip
- Then the card shows a defined error state instead of silently switching to ADDED, and the trip state is not changed

**AC3: edge case**
- Given the search tool returns zero matching destinations
- When the AI responds
- Then no destination card is rendered, and the chat shows the AI's text-only response instead of an empty or broken card

## Tasks
- [ ] Frontend: build the destination card component consumed inside a chat message, with Add and ADDED visual states
- [ ] Frontend: wire the card's Add button to the existing add_stop tool and store method, not a separate AI-only insertion path
- [ ] Testing: test the Add to ADDED transition, the add_stop failure path, the zero-results case, and the Undo path from this card
- [ ] Documentation: note the destination-card flow in docs/business-docs/06_copilot.md

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 9/20
- Curriculum video: 42 (The Streaming AI Chat Panel, Zoneless)
- Route doc: `docs/business-docs/06_copilot.md`
- Prototype reference: `docs/prototype/copilot.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-012-S1
TITLE: Show the itinerary summary and validation banner on /review
MILESTONE: TOS-012 Capstone and ship
LABELS: type:user-story, episode:tos-012, route:review, topic:control-flow, topic:signals, needs-episode-decision, P1, points:5
BODY:
## ملخص
أول جزء من شاشة /review: هيدر بعنوان الرحلة وبادج نسبة الاكتمال، وبانر بيقول إن الخطة سليمة أو فيه تعارضات لازم تتحل.
تحت كده قايمة المحطات كاملة بالترتيب مع رابط Edit route بيرجع لـ /planner.
مفيش فيديو مخصص للحلقة دي، هي جزء من التجميع النهائي في TOS-012.

## Story
**As a** trip planner, **I want** to see my full itinerary and a clear validation banner on /review, **so that** I can catch scheduling conflicts before I publish my trip.

## Acceptance criteria
**AC1: happy path**
- Given the current trip has no conflicts
- When the user opens /review
- Then a success banner confirms the plan is validated with no conflicts, and every stop appears in order with its day, location, and up to 4 activities

**AC2: error or validation case**
- Given the trip has at least one conflict, for example stops exceeding the trip window, or an unconfirmed stop
- When the user opens /review
- Then a warning banner lists each conflict individually with a distinct icon per conflict type, and publishing remains possible but visibly flagged as a soft warning

**AC3: edge case**
- Given the trip has zero stops
- When the user opens /review
- Then the itinerary section shows a defined empty state instead of an empty list with no explanation

## Tasks
- [ ] Frontend: build the /review header, trip name, date range, and completion badge, and the conflict or success validation banner using native @if and @for
- [ ] Frontend: render the ordered stop list with status badges, reusing the trip store's existing stop data rather than a component-local copy
- [ ] Documentation: confirm against the current trip data model which fields actually exist for stop status; fixtures/trip.fixture.json currently has a `selected: boolean` field, not a confirmed or suggested enum, and the header's style and pace fields and the completion percentage are also not yet in the fixture; extend fixtures/trip.fixture.json minimally if needed, keeping it small per the project's fixture guidance
- [ ] Testing: test the no-conflict, conflict, and empty-itinerary states

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 8/20
- Curriculum video: No curriculum video, absorbed into TOS-012 capstone wiring, see needs-episode-decision label
- Route doc: `docs/business-docs/07_review.md`
- Prototype reference: `docs/prototype/review.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-012-S2
TITLE: Show the budget breakdown with per-category costs and an over or under indicator on /review
MILESTONE: TOS-012 Capstone and ship
LABELS: type:user-story, episode:tos-012, route:review, topic:signals, needs-episode-decision, P1, points:5
BODY:
## ملخص
جزء الميزانية في /review: إجمالي التكلفة، تكلفة الفرد، وتقسيم حسب الفئة زي الإقامة والمواصلات والأكل.
وفوق كده مؤشر بيقول إحنا فوق الميزانية ولا تحتها.
المشكلة إن الـ fixture الحالي معندوش رقم مستهدف للميزانية أصلا، فده لازم يتحدد الأول.

## Story
**As a** trip planner, **I want** to see a budget breakdown with per-category costs and a clear over or under indicator on /review, **so that** I know before publishing whether my plan fits what I'm willing to spend.

## Acceptance criteria
**AC1: happy path**
- Given each stop in the trip has an estimatedCost and a category
- When the user opens the Budget Breakdown section
- Then the total cost, the per-traveler cost, and a per-category subtotal grouped from each stop's category all display correctly, computed from the shared trip state rather than a hardcoded value

**AC2: error or validation case**
- Given the total estimated cost is compared against a budget target
- When the total exceeds that target
- Then an over-budget indicator shows the exact overage amount with an alert icon; the source of the budget target field itself is confirmed against the trip data model before this ships, since it does not currently exist in fixtures/trip.fixture.json

**AC3: edge case**
- Given the trip has zero stops
- When the user opens the Budget Breakdown section
- Then it shows a defined zero-cost state rather than a division-by-zero or blank per-traveler figure

## Tasks
- [ ] Documentation: decide and document where the budget target value comes from, new fixture field versus a computed default, and extend fixtures/trip.fixture.json minimally, keeping it small per the project's fixture guidance
- [ ] Frontend: compute total, per-traveler, and per-category costs as derived signals with computed() from the trip store's stop list
- [ ] Frontend: build the over and under indicator UI with the two distinct visual states
- [ ] Testing: test per-category grouping, the over-budget and under-budget indicator states, and the zero-stop case

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 9/20
- Curriculum video: No curriculum video, absorbed into TOS-012 capstone wiring, see needs-episode-decision label
- Route doc: `docs/business-docs/07_review.md`
- Prototype reference: `docs/prototype/review.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-012-S3
TITLE: Show the traveler list and trip meta summary on /review
MILESTONE: TOS-012 Capstone and ship
LABELS: type:user-story, episode:tos-012, route:review, topic:control-flow, needs-episode-decision, P2, points:3
BODY:
## ملخص
آخر جزئين من /review: قايمة المسافرين كل واحد بصورته الرمزية واسمه ونوعه، وملخص Trip Meta زي تاريخ الرحلة وعدد المحطات والوتيرة.
الـ trip.fixture.json الحالي معندهوش أصلا بيانات مسافرين، فده حقل جديد لازم يتضاف.

## Story
**As a** trip planner, **I want** to see the traveler list and a trip meta summary on /review, **so that** I can confirm who is on this trip and its key stats before I publish it.

## Acceptance criteria
**AC1: happy path**
- Given the trip has one or more travelers defined
- When the user opens the Travelers section
- Then each traveler renders as a chip with initials, name, type, and optional notes, and the Trip Meta section shows date range, stop count, total days and nights, pace, and style

**AC2: error or validation case**
- Given a traveler entry is missing an optional field such as notes
- When that traveler's chip renders
- Then the chip still displays correctly without the missing field causing a layout break or a blank placeholder

**AC3: edge case**
- Given the trip has zero travelers defined
- When the user opens the Travelers section
- Then it shows a defined empty state rather than an empty row of chips

## Tasks
- [ ] Documentation: define a minimal traveler data shape, name, type, notes, and add it to fixtures/trip.fixture.json, since no traveler field exists there today; keep the addition small per the project's fixture guidance
- [ ] Documentation: confirm the source of pace and style shown in Trip Meta against the actual trip data model before building, since these fields are also absent from the current fixture
- [ ] Frontend: build the Travelers chip list and Trip Meta summary using native @for
- [ ] Testing: test the populated, missing-optional-field, and zero-traveler states

## Metadata
- Points: 3 (Fibonacci) | Priority: P2 | Risk: 7/20
- Curriculum video: No curriculum video, absorbed into TOS-012 capstone wiring, see needs-episode-decision label
- Route doc: `docs/business-docs/07_review.md`
- Prototype reference: `docs/prototype/review.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-012-S4
TITLE: Export and publish the trip from /review
MILESTONE: TOS-012 Capstone and ship
LABELS: type:user-story, episode:tos-012, route:review, topic:signals, needs-episode-decision, P1, points:5
BODY:
## ملخص
زرارين مهمين في آخر /review: Export بينزل الرحلة كملف، وPublish trip اللي بيقفل الرحلة كنسخة نهائية وترفع نسبة الاكتمال لـ 100%.
شكل ملف الـ Export لسه مش متحدد بالظبط، لازم يتأكد هل هو PDF ولا JSON قبل البناء.

## Story
**As a** trip planner, **I want** to export or publish my finished trip from /review, **so that** I can share it as a file or lock it in as the final plan.

## Acceptance criteria
**AC1: happy path**
- Given the trip is being reviewed on /review
- When the user clicks "Publish trip"
- Then the trip is marked published in the shared trip state, the completion badge reflects 100%, and a finalize message confirms the plan is ready

**AC2: error or validation case**
- Given the user clicks "Export"
- When the export format, PDF versus JSON per the open question in the route doc, has been decided and implemented
- Then the downloaded file contains the current trip data in that confirmed format, and the user remains on /review with the trip state unchanged

**AC3: edge case**
- Given the trip is not 100% complete, for example open conflicts remain
- When the user clicks "Publish trip"
- Then publishing still succeeds, but the softer message about optionally resolving open items first is shown, matching the two-message behavior in the route doc rather than blocking the action

## Tasks
- [ ] Documentation: confirm the export file format, PDF versus JSON, before implementation; the route doc leaves this open
- [ ] Frontend: implement Publish trip against the shared trip store, published flag and completion recompute, and the two completion-percentage messages
- [ ] Frontend: implement Export once the format is confirmed
- [ ] Testing: test publish at 100% completion, publish below 100%, and the export download

## Metadata
- Points: 5 (Fibonacci) | Priority: P1 | Risk: 8/20
- Curriculum video: No curriculum video, absorbed into TOS-012 capstone wiring, see needs-episode-decision label
- Route doc: `docs/business-docs/07_review.md`
- Prototype reference: `docs/prototype/review.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-012-S5
TITLE: Reset the trip to its default demo state from /review
MILESTONE: TOS-012 Capstone and ship
LABELS: type:user-story, episode:tos-012, route:review, topic:signals, needs-episode-decision, P2, points:2
BODY:
## ملخص
زرار Reset demo بيمسح أي تغييرات حصلت على الرحلة ويرجعها لحالة الـ demo الافتراضية من trip.fixture.json.
مفيد جدا وإحنا بنسجل أو بنعمل QA، عشان نبدأ من نقطة معروفة كل مرة.

## Story
**As a** QA reviewer, **I want** to reset the trip to its default demo state from /review, **so that** I can validate flows from a known, consistent starting point every time.

## Acceptance criteria
**AC1: happy path**
- Given the trip state has been modified from its default, stops added, edited, or reordered
- When the user clicks "Reset demo"
- Then the shared trip state is replaced with the contents of fixtures/trip.fixture.json, and every route reading trip state reflects the reset immediately

**AC2: error or validation case**
- Given a reset is triggered while the co-pilot has AI actions pending or streaming
- When "Reset demo" is clicked
- Then the in-progress AI activity is cleanly stopped or completed before the reset applies, rather than leaving the app in an inconsistent mixed state

**AC3: edge case**
- Given the trip is already in its exact default state
- When the user clicks "Reset demo"
- Then the action completes without error and the state remains unchanged, rather than treating a no-op reset as a failure

## Tasks
- [ ] Frontend: implement Reset demo to reload the trip store from the fixture's default values
- [ ] Frontend: handle the in-flight AI activity edge case, block or gracefully cancel before resetting
- [ ] Testing: test reset from a modified state, reset during pending AI activity, and reset from an already-default state

## Metadata
- Points: 2 (Fibonacci) | Priority: P2 | Risk: 4/20
- Curriculum video: No curriculum video, absorbed into TOS-012 capstone wiring, see needs-episode-decision label
- Route doc: `docs/business-docs/07_review.md`
- Prototype reference: `docs/prototype/review.html`

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-012-S6
TITLE: Add a CI pipeline that runs lint, test, and build on every push
MILESTONE: TOS-012 Capstone and ship
LABELS: type:chore, episode:tos-012, route:cross-cutting, topic:ci-cd, topic:testing, P0, points:5
BODY:
## ملخص
قبل ما نشحن الكوبايلوت، لازم يبقى فيه CI pipeline بيشغل lint وtest وbuild أوتوماتيك على كل push.
الفيديو 45 بيشرح أساسيات CI/CD قبل ما نطبقها فعليا في الحلقة الختامية.

## Story
**As a** series viewer, **I want** to see a CI pipeline run lint, test, and build automatically on every push, **so that** I learn how a real Angular app enforces quality gates before it ships, not just on the developer's machine.

## Acceptance criteria
**AC1: happy path**
- Given a commit is pushed to the repository
- When the CI pipeline runs
- Then it executes lint, `pnpm exec ng test --watch=false`, and `pnpm build` in sequence, and the pipeline reports success only if all three pass

**AC2: error or validation case**
- Given a commit introduces a failing test or a build error
- When the CI pipeline runs
- Then the pipeline fails visibly with the specific failing step identified, and does not report a false green status

**AC3: edge case**
- Given there is currently no lint script defined in package.json, per this repo's documented state
- When the pipeline is built
- Then a lint step is added and wired in before this story is considered done, rather than the pipeline silently skipping linting

## Tasks
- [ ] DevOps: add a lint script to package.json if one does not yet exist, and wire it into the pipeline
- [ ] DevOps: configure the CI pipeline to run lint, `pnpm exec ng test --watch=false`, and `pnpm build` on every push
- [ ] Testing: verify the pipeline fails correctly on an intentionally broken test and an intentionally broken build, then confirm it passes clean
- [ ] Documentation: document the pipeline steps in docs/versions.md or an adjacent CI doc

## Metadata
- Points: 5 (Fibonacci) | Priority: P0 | Risk: 8/20
- Curriculum video: 47 (Capstone Finale Part 2: Ship It, CI/CD and Deploying the Co-Pilot), prep video 45 (CI/CD basics)
- Route doc: N/A, cross-cutting infrastructure story not tied to a single route doc
- Prototype reference: N/A, cross-cutting infrastructure story not tied to a single prototype page

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-012-S7
TITLE: Deploy the SSR build to a production host with environment config and a final accessibility and performance pass
MILESTONE: TOS-012 Capstone and ship
LABELS: type:chore, episode:tos-012, route:cross-cutting, topic:ci-cd, topic:ssr, topic:a11y, accessibility, P0, points:8
BODY:
## ملخص
آخر خطوة في الكورس كله: نشر الـ SSR build على host حقيقي، ضبط environment variables لمفاتيح الـ API بأمان، وعمل آخر مراجعة accessibility وperformance قبل ما نعتبر الكوبايلوت جاهز.
الفيديو 47 هو اللي بيغطي الجزء ده كامل.

## Story
**As a** series viewer, **I want** to watch the co-pilot app get deployed to a real host with SSR working end to end, **so that** I learn the full path from local build to a live, accessible production app.

## Acceptance criteria
**AC1: happy path**
- Given the app builds successfully with SSR enabled
- When it is deployed to the chosen host, host to be confirmed before this story starts
- Then the deployed app serves server-rendered HTML on first load, and API keys are read from environment configuration rather than being committed to the repository

**AC2: error or validation case**
- Given an environment variable required for an API key is missing on the host
- When the app starts
- Then it fails with a clear, defined startup error rather than silently running with broken AI functionality

**AC3: edge case**
- Given the deployed app is audited for accessibility and performance as a final pass
- When the audit runs, AXE checks plus a Lighthouse-style performance pass
- Then it confirms WCAG AA compliance, focus management, contrast, and ARIA, and documents the specific performance metrics captured, rather than the pass being marked done without evidence

## Tasks
- [ ] Research: confirm the target host's SSR support and its environment-variable configuration mechanism before pipeline work starts, since this is not yet decided
- [ ] DevOps: configure environment variables for API keys on the chosen host, ensure no secrets are committed
- [ ] DevOps: wire the deploy step into the CI pipeline from TOS-012-S6 so a passing build deploys automatically, or via a manual promote step, to be decided
- [ ] Testing: run an accessibility, AXE and WCAG AA, and performance pass against the deployed app and record the results
- [ ] Documentation: record the deployment target, environment variable list, names only, never values, and the final accessibility and performance findings in docs/

## Metadata
- Points: 8 (Fibonacci) | Priority: P0 | Risk: 13/20
- Curriculum video: 47 (Capstone Finale Part 2: Ship It, CI/CD and Deploying the Co-Pilot), prep video 45 (CI/CD basics)
- Route doc: N/A, cross-cutting infrastructure story not tied to a single route doc
- Prototype reference: N/A, cross-cutting infrastructure story not tied to a single prototype page

## Definition of done
- [ ] Code compiles and `pnpm build` passes
- [ ] `pnpm exec ng test --watch=false` green
- [ ] Acceptance criteria verified on screen
- [ ] Every Angular API claim sourced to docs or the installed `.d.ts`
- [ ] `docs/` updated
END STORY

## STORY:TOS-FUTURE-S1
TITLE: Track future deep dive videos outside the 12 episode arc
MILESTONE: NONE
LABELS: type:docs, episode:tos-future, route:cross-cutting, P3, points:1
BODY:
## Future deep dives

Not a committed backlog item, just tracking curriculum videos that sit outside the 12-episode Co-Pilot build arc. These might become standalone deep dive content later, no promise either way.

- [ ] Video 19: injectAsync and Lazy Services
- [ ] Video 27: Selectorless Components deep dive, core mechanics already covered as TOS-007 build-episode prep
- [ ] Video 43: Nx Monorepos for Angular
- [ ] Video 44: Migrating Legacy Angular to v21/v22
- [ ] Video 49: Your Angular Roadmap After This Course
END STORY
