# Page: State Gallery (`/states`)

## Purpose
A developer and QA reference page. Shows every loading, empty, error, and conflict UI state in one place — the complete testable surface area of the app.

> **Note:** This page is not part of the end-user flow. It is a design system and testing tool for the development team. It should be hidden from end users in production (e.g., behind a `/dev` or `/qa` prefix or a feature flag).

---

## What the User Sees

A page titled **"State Gallery"** with a subtitle explaining its purpose: *"Every loading, empty, error, and conflict state — the testable surface area that makes the app feel production-grade."*

A **"Fire feedback"** button at the top allows triggering toast/feedback layer states manually for testing.

---

## State Categories

### 1. Loading & Progressive States
Visual skeletons that match the real layout — rendered while data is being fetched:
- **Card skeleton** (×2) — shimmer placeholder matching a destination card
- **Map loading skeleton** — *"LOADING SPATIAL CONTEXT…"* with a map outline placeholder

### 2. AI & Tool Activity States
Shows the full range of co-pilot tool states:
- **AI typing indicator** — *"Resequencing your route to cut backtracking"* with a spinner
- **Tool: RUNNING** — `reorder_itinerary · RUNNING`
- **Tool: DONE** — `add_stop · DONE` + *"Osaka added to Day 9"* diff
- **Tool: FAILED** — `add_stop · FAILED` + **"Retry action"** button

### 3. Empty States
What the user sees when there is no data:
- **Empty search results** — no destinations matched
- **Empty itinerary** — no stops added yet
- **Empty route map** — no stops for route visualization
- **Empty co-pilot** — no tool calls yet
- **Empty day planner** — no stops to sequence

### 4. Error & Conflict States
Inline validation and conflict UI:
- **Date validation error** — *"Start date must come before end date."* (with alert icon next to the end date field)
- **AI edit conflict** — *"AI changed Day 3 while you were editing it."* with three actions: **Review** / **Keep mine** / **Accept AI**
- **Save failure** — *"Could not save trip. Changes kept locally."* with a **"Retry save"** button

### 5. Feedback Layer (Toast) States
Bottom-of-screen feedback toasts:
- **Conflict toast** — *"Stops exceed trip window — 11 nights planned, 10-day window."* (alert icon)
- **Success toast** — *"Stop removed"* + **"Undo"** button (check icon)

---

## Key UI Elements

| Element | Behavior |
|---------|----------|
| "Fire feedback" button | Triggers a sample toast notification |
| Skeleton cards | Static shimmer animation |
| Map skeleton | Static placeholder with loading text |
| Tool status rows | Shows name + status (RUNNING / DONE / FAILED) |
| "Retry action" button | Shown on FAILED tool state |
| Date error label | Inline field-level validation message |
| AI conflict panel | 3-way resolution: Review / Keep mine / Accept AI |
| "Retry save" button | Shown on save failure state |
| Toast: conflict | Alert icon + conflict description |
| Toast: success + undo | Check icon + "Undo" action button |

---

## Usage

This page is used to:
- Visually verify all UI states during development
- Manually test toast/feedback interactions
- Ensure skeletons match the real component layout
- Validate that error and conflict states are styled correctly
- QA testing without needing to reproduce real error conditions

---

## Navigation

This page does not link to other app pages. It is a standalone dev tool.
