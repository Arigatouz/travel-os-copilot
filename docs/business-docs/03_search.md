# Page: Search (`/search`)

## Purpose
Resource-backed destination discovery. The user searches for destinations, filters and sorts results, inspects a destination in detail, and adds it directly to their trip itinerary — all from a single page.

---

## What the User Sees

The page is labeled **Search** with a **"RESOURCE-BACKED"** badge indicating results come from a live data source.

Layout is split into two columns:
- **Left / Main**: search bar + filter chips + results list
- **Right / Detail panel**: destination deep-dive (shown when a result is selected)

At the bottom: a **Trip Context** strip showing the active trip name, total days window, stop count, and estimated cost.

---

## User Flow

1. User arrives at `/search` (from dashboard, planner, or nav).
2. User types a query in the **search bar** (e.g., "Japan coastal towns").
   - Results update live or on submit.
   - Result count shown: e.g., *"7 RESULTS · "Japan coastal towns""*
3. User optionally applies **filter chips** to narrow by tags (e.g., beach, culture, food).
4. User can change **sort order**: Relevance / Popularity / Budget tier.
5. Each result card shows:
   - Destination name
   - Region (uppercase badge)
   - Duration (e.g., "5–7 days")
   - Popularity score (star rating)
   - Budget tier (`$` to `$$$$`)
   - Summary text
   - Tag chips
6. User clicks a result card → the **right detail panel** opens.
7. **Detail panel** shows:
   - Full destination name + region
   - Duration + budget tier
   - Full summary
   - **Highlights** list (key activities/experiences)
   - **Trip-Fit indicator** — whether this destination fits the active trip's time window
   - If already in trip → badge: *"Already part of [Trip Name]"*
   - Action buttons: **Add to trip** / **Confirm stop** / **Ask AI about this**
8. If destination is not yet in trip → user clicks **"Add to trip"** → destination is added to shared trip state → trip context strip updates.
9. User can click **"Open day planner"** in the trip context strip → navigates to `/planner`.

---

## Key UI Elements

| Element | Behavior |
|---------|----------|
| Search bar | Live or submit-triggered text query |
| Clear (×) button | Clears search input and results |
| Filter chips | Multi-select tag filters on results |
| Sort dropdown | Relevance / Popularity / Budget tier |
| Result card | Shows destination summary, click to inspect |
| Result count label | e.g., "7 RESULTS · 'query'" |
| Detail panel: Trip-Fit | Checks if destination fits trip window |
| Detail panel: Highlights | Bullet list of key experiences |
| "Add to trip" button | Adds stop to shared trip state |
| "Already in trip" badge | Read-only — stop already added |
| Trip Context strip | Live trip totals at the bottom |
| "Open day planner" link | Navigates to `/planner` |

---

## Empty & Error States

- **No query** → empty state with compass icon and prompt to search.
- **No results** → empty state: *"No destinations matched"* + suggestion to try a different query.
- **Detail panel unselected** → right panel shows: *"Select a destination to inspect it and see how it fits your trip."*

---

## Navigation From This Page

| Action | Destination |
|--------|-------------|
| Click "Open day planner" | `/planner` |
| Add stop → auto-sync | Trip state updated across all pages |
