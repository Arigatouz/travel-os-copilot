# Page: Itinerary Builder (`/builder`)

## Purpose
A structured, multi-step wizard for creating or editing a trip. Each step collects typed, validated data — trip basics, traveler profiles, stop management — producing a clean itinerary ready for sequencing in the day planner.

---

## What the User Sees

A **step-by-step wizard** with a step indicator at the top showing current progress (e.g., `STEP 02 / 04`). Each step has a label and the header updates as the user moves forward.

A **Live Summary sidebar** is always visible on the right:
- Trip name + completion percentage
- Step status indicators (Editing / Complete / Pending)
- Conflict/validation notices
- Live stats: days, nights, stops, travelers, est. cost

---

## Wizard Steps

### Step 1 — Trip Basics
The user fills in the foundational trip metadata:
- **Trip name** (text input, required)
- **Start date** (date picker, required)
- **End date** (date picker, required)
- **Trip style** (select chips): Urban + Culture / Beach + Relax / Adventure + Outdoors / Food-focused / Mixed
- **Pace** (select chips): Relaxed / Balanced / Packed
- **Budget** (number input, optional)

An info banner shows the computed trip window: *"Your trip window is X days / Y nights"*.

### Step 2 — Traveler Profiles
Dynamic traveler management:
- A numbered list of traveler profiles
- Each traveler has: **name** (text), **type** (Adult / Child / Senior), **notes** (optional text)
- **"Add traveler"** button adds a new profile row
- **Minus button** removes a traveler

### Step 3 — Trip Stops
The core of the builder:
- A numbered list of stops
- Each stop has: **destination name**, **day assignment** (move left/right arrows), **nights**, **status** (suggested / confirmed), and a delete (×) button
- **"Add stop"** button adds a blank stop
- **"Find in search"** button navigates to `/search` to import a destination
- Reorder arrows shift the stop to an earlier or later day
- Below the stop list: a **notes/activities preview** — optional notes and priority activities per stop, flowing into the day planner

### Step 4 — Validation & Review
Before finishing:
- The builder runs validation checks and shows:
  - Conflicts (danger level): e.g., *"Stops exceed trip window"*
  - Notices (info level): e.g., *"2 stops not yet confirmed"*
  - Success state: *"No conflicts. Plan is valid and ready to save."*
- User can click **"Save draft"** at any step or **"Finish & review"** on the last step

---

## User Flow

1. User arrives at `/builder` (from dashboard, search, or nav).
2. Step indicator shows current step.
3. User fills in Step 1 (trip basics) → clicks **Next**.
4. User fills in Step 2 (travelers) → adds/removes profiles → clicks **Next**.
5. User fills in Step 3 (stops) → adds stops manually or clicks **"Find in search"** to import → reorders using arrows → clicks **Next**.
6. Step 4 shows validation results:
   - If conflicts → user resolves (goes back) or accepts warnings.
   - If clean → user clicks **"Finish & review"** → navigates to `/review`.
7. At any step: **"Save draft"** saves the current state to shared trip store.
8. **Back** button navigates to the previous step.

---

## Key UI Elements

| Element | Behavior |
|---------|----------|
| Step indicator bar | Shows all steps, current highlighted, completed steps show a checkmark |
| Trip name field | Text input, required |
| Start / End date fields | Date pickers |
| Trip style chips | Single-select: Urban+Culture, Beach+Relax, Adventure+Outdoors, Food-focused, Mixed |
| Pace chips | Single-select: Relaxed / Balanced / Packed |
| Budget field | Number input, optional |
| "Add traveler" button | Appends a new traveler row |
| Traveler type selector | Adult / Child / Senior |
| Minus button on traveler | Removes that traveler |
| "Add stop" button | Appends a new blank stop |
| "Find in search" button | Navigates to `/search` |
| Day arrows on stop | Shift stop to earlier or later day |
| Stop status chips | suggested / confirmed |
| Delete (×) on stop | Removes the stop |
| Validation panel | Shows conflict/notice/success messages |
| "Save draft" button | Saves to shared trip state without finishing |
| "Back" button | Returns to previous wizard step |
| "Next" button | Advances to next step |
| "Finish & review" button | Final step CTA → navigates to `/review` |

---

## Validation Rules

- End date must come after start date.
- At least 1 stop required to finish.
- Stop nights cannot exceed the total trip window.
- Conflicts shown inline in validation step.

---

## Live Summary Sidebar

Always visible, auto-updates:
- Trip name
- Completion %
- Each step's status (Editing / Complete / Pending)
- Conflict count badge
- Stats: total days, nights, stop count, traveler count, est. cost

---

## Navigation From This Page

| Action | Destination |
|--------|-------------|
| "Find in search" | `/search` |
| "Finish & review" | `/review` |
| "Save draft" | Stays on `/builder`, state saved |
