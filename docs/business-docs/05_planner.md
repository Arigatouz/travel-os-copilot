# Page: Day Planner (`/planner`)

## Purpose
Sequence, time, and balance the trip stops across the available days. The user can reorder stops to reshape the route — all totals and the live map update in real time.

---

## What the User Sees

A page split into two areas:
- **Left / Timeline**: a vertical list of stops ordered by day, with a departure marker at the end.
- **Right / Map + Detail panel**: a live SVG route map and a detail panel for the selected stop.

An **"Optimize sequence"** button at the top lets the AI reorder stops to minimize backtracking.

---

## User Flow

1. User arrives at `/planner` (from dashboard, builder, or review).
2. The timeline shows all current stops in day order.
3. **Reorder stops**: user clicks left/right arrows on a stop to shift it to an earlier or later day. The map and totals update live.
4. **Select a stop**: user clicks a stop row → the **right detail panel** populates with:
   - Stop name, location, day number
   - Status badge (confirmed / suggested)
   - Night count, cost tier, activity count
   - Activity list
   - Action buttons: **Confirm stop** or **Mark suggested** (toggle)
   - **"Ask AI to optimize"** button → sends an optimize request to the co-pilot
5. **"Optimize sequence"** button (top) → triggers the AI to reorder all stops to minimize backtracking; a confirmation checkmark appears on success.
6. **"Add stop"** button → navigates to `/search` to find and add a new destination.
7. The **Live Map** renders a route preview with nodes for each confirmed stop.
8. If the map is loading → a skeleton loader is shown: *"LOADING SPATIAL CONTEXT…"*
9. If no stops exist → empty state: *"No route yet — Add destinations from search or the builder"* + CTA to `/search`.
10. **DEPART** marker at the end of the timeline shows the final departure day.

---

## Key UI Elements

| Element | Behavior |
|---------|----------|
| Stop row (timeline) | Click to select; shows day number, name, location, nights, cost, activities |
| Left (←) arrow on stop | Moves stop to an earlier day |
| Right (→) arrow on stop | Moves stop to a later day |
| Delete (×) on stop | Removes stop from itinerary |
| Status badge | confirmed / suggested — shown on each stop row |
| "Optimize sequence" button | Triggers AI reordering of all stops |
| Checkmark (after optimize) | Confirms optimization applied |
| "Add stop" button | Navigates to `/search` |
| Detail panel | Right side — shows full stop details for selected stop |
| "Confirm stop" button | Changes stop status to confirmed |
| "Mark suggested" button | Changes stop status to suggested |
| "Ask AI to optimize" (in panel) | Sends optimize request to co-pilot for this stop |
| Route map (SVG) | Live route with node markers; updates on reorder |
| Map skeleton | Loading state shown while map renders |
| DEPART marker | Fixed at end of timeline — final departure day |
| "Find destinations" CTA | Empty state — navigates to `/search` |

---

## Real-Time Behavior

- Reordering a stop immediately recalculates all day assignments and the route on the map.
- Confirming a stop changes its visual style in the timeline.
- AI optimization applies a new stop order to the shared trip state and reflects in all other pages.

---

## States

- **Stops present** → full timeline + map + detail panel.
- **No stops** → empty state: *"No route yet"* + "Find destinations" CTA.
- **Map loading** → skeleton loader: *"LOADING SPATIAL CONTEXT…"*
- **Stop selected** → right panel populated.
- **No stop selected** → right panel: *"Select a stop on the timeline to see its details."*

---

## Navigation From This Page

| Action | Destination |
|--------|-------------|
| "Add stop" / "Find destinations" | `/search` |
| "Ask AI to optimize" | `/copilot` (or inline AI action) |
| Nav links | Any other page |
