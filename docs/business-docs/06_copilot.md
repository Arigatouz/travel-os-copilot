# Page: AI Co-Pilot Workspace (`/copilot`)

## Purpose
The agentic AI workspace. The user talks to the co-pilot in natural language. The co-pilot uses the same 6 tools the user has (search, add stop, reorder, edit, etc.) — all actions are streamed live, visible, and reversible. This is not a chatbot bolted on; it is a shared operator on the trip state.

---

## What the User Sees

A header badge confirms: **AGENT ONLINE · 6 TOOLS · SHARED TRIP STATE · LIVE**

The page is split into three vertical panels:

1. **Center / Chat area**: streaming conversation with the co-pilot.
2. **Left / Tool Activity log**: every tool call the AI makes, its status, and the diff it produced.
3. **Right / Shared Trip State**: the current stop list and live trip metrics — identical to what the user sees everywhere else.

Suggested prompt chips appear above the chat input.

---

## User Flow

1. User arrives at `/copilot` (from dashboard prompt chip, nav, or planner's "Ask AI" button).
2. If a prompt was pre-loaded (from dashboard) → it is pre-filled in the input.
3. User types a message or clicks a **suggested prompt chip** (e.g., *"Optimize my route to cut backtracking"*).
4. User submits message → co-pilot starts streaming a response.
5. **Tool Activity panel** updates in real time:
   - Each tool the AI invokes shows its name and status: `RUNNING` → `APPLIED` / `FAILED`
   - Each `APPLIED` action shows a **diff** of what changed (lines prefixed with `+`, `−`, `~`)
   - Each applied action has an **"Undo"** button and a **"Review changes"** button
6. The **Shared Trip State panel** (right) reflects the updated stop list immediately after any AI action.
7. If the AI adds a destination from a search: the destination card appears in the chat with an **"Add"** button — the user can accept or ignore.
8. If the user wants to undo an AI action: they click **"Undo"** on the diff card → the change is reverted and a **"CHANGE REVERTED"** confirmation is shown in the chat.
9. The user can continue the conversation naturally — asking follow-up questions, requesting edits, or asking the AI to explain its reasoning.
10. **"Refresh"** button at the top clears the conversation and resets tool activity.

---

## Key UI Elements

| Element | Behavior |
|---------|----------|
| AGENT ONLINE badge | Status indicator — confirms agent is live |
| Suggested prompt chips | Clickable shortcuts for common co-pilot tasks |
| Chat input | Free-text message to the co-pilot |
| Submit button | Sends the message |
| Streaming response | Co-pilot response renders word-by-word |
| Tool Activity panel | Left side — live log of every tool call |
| Tool status badges | RUNNING → APPLIED / FAILED |
| Diff view on applied action | Shows `+` additions, `−` removals, `~` edits |
| "Undo" button (per action) | Reverts that specific AI action |
| "Review changes" button | Opens the affected stop/plan for inspection |
| "CHANGE REVERTED" message | Inline confirmation after undo |
| "Retry action" button (on FAILED) | Retries a failed tool call |
| Shared Trip State panel | Right side — live stop list matching `/planner` |
| Destination card in chat | Shows found destination; "Add" button inserts it into trip |
| "Add" → "ADDED" state | Destination card changes to a confirmed added state |
| Tool list in right panel | Shows all 6 tools with live metrics |
| Refresh button | Clears chat history |

---

## 6 Available Tools (co-pilot and user share these)

1. **search** — query the destination database
2. **add_stop** — add a destination to the itinerary
3. **remove_stop** — remove a stop
4. **reorder_itinerary** — resequence all stops
5. **edit_stop** — modify stop details (days, nights, status, activities)
6. **get_trip_state** — read the current trip state (used for context)

---

## Key Behaviors

- Every AI action is **reversible** — undo is always available.
- AI actions happen on the **same shared trip state** — visible immediately in all other pages.
- Tool calls are **transparent** — users can see exactly what the AI did and why.
- The AI does not have hidden capabilities — it only uses the same 6 tools the user can access manually.

---

## States

- **No tool calls yet** → Tool Activity panel: *"No tool calls yet. Ask the co-pilot to do something."*
- **No stops** → Shared Trip State panel: *"No stops."*
- **Tool running** → spinner dots next to tool name.
- **Tool failed** → red `FAILED` badge + "Retry action" button.
- **Change reverted** → inline "CHANGE REVERTED" message in chat.

---

## Navigation From This Page

| Action | Destination |
|--------|-------------|
| "Review changes" button | `/planner` or `/builder` depending on change type |
| Nav links | Any other page |
