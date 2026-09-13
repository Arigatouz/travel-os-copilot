# Page: Review & Finalize (`/review`)

## Purpose
The final checkpoint before publishing the trip. The user validates the full itinerary, reviews the budget breakdown, confirms traveler profiles, and publishes or exports the trip.

---

## What the User Sees

A page header showing the **trip name**, style, pace, and date range, plus a **completion percentage** badge.

If there are unresolved conflicts → a warning banner lists them. If clean → a *"Plan validated / No conflicts"* banner with a checkmark.

Below the header, four main sections:
1. **Itinerary** — full stop list with an "Edit route" link
2. **Budget Breakdown** — estimated total, per-traveler cost, per-category breakdown, over/under budget indicator
3. **Travelers** — avatar + name + type + notes for each traveler
4. **Trip Meta** — key metadata summary

At the bottom: three action buttons — **Export**, **Reset demo**, and **Publish trip**.

---

## User Flow

1. User arrives at `/review` (from builder's "Finish & review" or nav).
2. User sees the trip name, style, pace, and date range at a glance.
3. **Validation banner**:
   - If conflicts exist → orange/red banner listing each conflict (e.g., *"Stops exceed trip window"*, *"2 stops unconfirmed"*). Each conflict has an icon (danger / info).
   - If no conflicts → green banner: *"Plan validated — No conflicts. Every stop is confirmed and dates are consistent."*
4. **Itinerary section**: user sees the full stop list in order — stop number, name, status badge, day, nights, location, and up to 4 activities per stop.
   - **"Edit route"** link → navigates to `/planner`.
5. **Budget Breakdown**:
   - Shows estimated total cost and per-traveler cost.
   - Per-category breakdown (accommodation, transport, food, activities, etc.).
   - Over/under budget indicator: if over → *"X over budget"* (with alert icon); if under → *"X under budget"* (with checkmark).
6. **Travelers section**: each traveler shown as an avatar chip with initials, name, type, and optional notes.
7. **Trip Meta**: quick stats — date range, stop count, total days/nights, pace, style.
8. User decides:
   - Click **"Export"** → downloads the trip as a file (PDF / JSON).
   - Click **"Publish trip"** → marks the trip as published; full completion = 100%.
   - Click **"Reset demo"** → clears all trip state and resets to the demo default.
9. If the trip is 100% complete → finalize message: *"Everything checks out — ready to publish."*
10. If not 100% complete → softer message: *"You can publish now or resolve the open items first."*

---

## Key UI Elements

| Element | Behavior |
|---------|----------|
| Trip name + meta header | Read-only display |
| Completion % badge | Live percentage from shared trip state |
| Conflict banner | Lists unresolved conflicts with danger/info icons |
| Validation success banner | Green checkmark — shown when no conflicts |
| Itinerary stop list | Full ordered list of stops |
| "Edit route" link | Navigates to `/planner` |
| Stop status badge | confirmed / suggested on each stop row |
| Activity list (per stop) | Up to 4 activities shown; rest truncated |
| "No activities planned" label | Shown if stop has no activities |
| Budget total | Estimated total cost |
| Per-traveler cost | Total ÷ traveler count |
| Per-category rows | Breakdown by spend category |
| Over budget indicator | Alert icon + "X over budget" in red |
| Under budget indicator | Check icon + "X under budget" in green |
| Traveler avatar chips | Initials, name, type, notes |
| Trip Meta section | Date range, stop count, pace, style |
| "Export" button | Downloads trip data |
| "Reset demo" button | Clears all trip state |
| "Publish trip" button | Primary CTA — finalizes and publishes |

---

## States

- **Conflicts present** → warning banner with each conflict item. Publish is still allowed but soft warning is shown.
- **No conflicts** → success banner.
- **No stops** → empty itinerary section: *"No stops added."*
- **Trip 100% complete** → *"Everything checks out — ready to publish."*
- **Trip < 100%** → *"You can publish now or resolve the open items first."*

---

## Navigation From This Page

| Action | Destination |
|--------|-------------|
| "Edit route" | `/planner` |
| "Publish trip" | Stays on `/review`; trip marked published |
| "Export" | Downloads file; stays on `/review` |
| "Reset demo" | Stays on `/review`; trip state cleared |
| Nav links | Any other page |
