# Co-Pilot Travel OS — Routes Overview

A summary of all routes (pages) in the agentic travel workspace.

| Route | File | Purpose |
|-------|------|---------|
| `/auth` | auth.html | Authentication gateway — sign in to access the workspace |
| `/` or `/dashboard` | index.html | Trip control center — active trip overview and co-pilot status |
| `/search` | search.html | Destination search — resource-backed discovery |
| `/builder` | builder.html | Itinerary builder — structured multi-step trip creation |
| `/planner` | planner.html | Day planner — sequence, time, and balance stops |
| `/copilot` | copilot.html | AI workspace — streaming co-pilot with tool visibility |
| `/review` | review.html | Trip review & finalize — validate, budget, and publish |
| `/states` | states.html | State gallery — all UI states (dev/QA reference page) |

## Shared Concept

All routes share a **single trip state** — every action the user takes (search, build, sequence, ask the AI) mutates the same data model. The AI co-pilot uses the same 6 tools available to the user, making every AI change visible and reversible.
