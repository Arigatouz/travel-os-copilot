# Page: Dashboard (`/`)

## Purpose
The trip control center. Gives the user a live overview of their active trip — completion status, itinerary stops, recent discoveries, and co-pilot readiness. This is the home screen after login.

---

## What the User Sees

A header with two primary actions: **Explore** (goes to `/search`) and **Ask Co-Pilot** (goes to `/copilot`).

The page is split into four main panels:

1. **Current Trip card** — trip name, completion percentage, date range, pace, and a link to the day planner.
2. **Suggested Co-Pilot Prompts** — 3–5 contextual AI prompts the user can tap to hand off a task to the co-pilot.
3. **Itinerary Stops** — a numbered list of current stops with day assignments and night counts.
4. **Recent Discovery** — the latest destination surfaced from search.
5. **Co-Pilot Status panel** — confirms the agent is online, lists the 6 connected tools, and shows live metrics (stops, window, est. cost, etc.).

---

## User Flow

1. User arrives at `/dashboard` after login.
2. User reviews the **active trip** at a glance — name, how complete it is, dates, and pace.
3. User sees **Itinerary Stops** — if stops exist, a numbered list shows them. If empty → CTA: *"Build itinerary"* linking to `/builder`.
4. User can click **"Open day planner"** to go to `/planner` and sequence their stops.
5. User reads **Suggested Co-Pilot Prompts** — each prompt shows an icon, text, and the tool it will invoke (e.g., `search`, `reorder`, `add_stop`). Clicking a prompt opens `/copilot` with that prompt pre-loaded.
6. User sees **Recent Discovery** from the search feed — can click to open in `/search`.
7. **Co-Pilot Status** panel confirms agent is live and 6 tools are connected. Shows a tool list with current trip metrics.
8. User navigates from here to any other section via the nav bar or the in-page CTAs.

---

## Key UI Elements

| Element | Behavior |
|---------|----------|
| **Explore** button (header) | Navigates to `/search` |
| **Ask Co-Pilot** button (header) | Navigates to `/copilot` |
| Trip completion % | Derived from confirmed stops / total planned |
| Date range | Pulled from trip state (`startDate` → `endDate`) |
| Pace label | Trip metadata (Relaxed / Balanced / Packed) |
| "Open day planner" link | Navigates to `/planner` |
| Co-pilot prompt chips | Click → navigates to `/copilot` with prompt pre-filled |
| Itinerary stop rows | Shows stop name, day, night count |
| "Build itinerary" CTA (empty) | Navigates to `/builder` |
| Recent Discovery card | Shows destination name + region |
| Co-pilot status panel | Read-only live metrics |

---

## States

- **Trip with stops** → full itinerary list + route mini-map visible.
- **Empty trip** → empty state: *"Add stops to see your route"* + CTAs to search or build.
- **Co-pilot offline** → status panel shows degraded state (agent unavailable).

---

## Navigation From This Page

| Action | Destination |
|--------|-------------|
| Click "Explore" | `/search` |
| Click "Ask Co-Pilot" | `/copilot` |
| Click a co-pilot prompt | `/copilot` with prompt pre-loaded |
| Click "Open day planner" | `/planner` |
| Click "Build itinerary" (empty) | `/builder` |
