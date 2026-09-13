# Page: Auth (`/auth`)

## Purpose
The authentication gateway. Protects the planner workspace — users must sign in (or continue as guest) before accessing any other route.

---

## What the User Sees

A centered, minimal sign-in screen branded **Co-Pilot — TRAVEL OS** with the tagline *"Agentic Travel Workspace"*.

Below the branding, a short value proposition is shown:
- Live destination search
- Structured itinerary builder
- Tool-driven AI co-pilot

A status badge indicates the app version and number of tools online (`v1.0.0-stable · SSR-ready · 6 tools online`).

---

## User Flow

1. User lands on `/auth` (redirected here if they try to access any protected route without a session).
2. User sees the **WELCOME BACK** sign-in panel.
3. User can authenticate via one of three methods:
   - **Google** — OAuth social login
   - **GitHub** — OAuth social login
   - **Email + Password** — standard credential form
4. For Email/Password:
   - User enters their **Email** and **Password**.
   - If credentials are incorrect → inline error message: *"Incorrect credentials. Try again."*
   - Optional: **Keep me signed in** checkbox (persistent session).
   - Optional: **Forgot password?** link → triggers password reset flow.
5. User clicks **"Enter workspace"** → authenticated, redirected to `/dashboard`.
6. New users: **"No account? Request access"** link → registration or waitlist flow.
7. Alternative: User clicks **"Continue as guest"** → enters the workspace with a temporary session, no data persistence.

---

## Key UI Elements

| Element | Behavior |
|---------|----------|
| Google button | OAuth redirect |
| GitHub button | OAuth redirect |
| Email field | Text input, required |
| Password field | Password input, required |
| "Keep me signed in" | Checkbox — persists session token |
| "Forgot password?" | Link — opens reset flow |
| "Enter workspace" | Primary CTA — submits credentials |
| "Request access" | Link — new user registration |
| "Continue as guest" | Secondary CTA — guest session |

---

## Error States

- **Wrong credentials** → inline error below form: *"Incorrect credentials. Try again."*
- **Empty fields** → form validation prevents submission.

---

## Navigation After Auth

- Successful login → `/dashboard` (index.html)
- Guest session → `/dashboard` with limited persistence
