# Travel OS Copilot

An AI-assisted travel planning workspace, built step by step on camera for the Angular and AI series on [@ArabicAngular](https://www.youtube.com/@ArabicAngular).

Explanations are in Egyptian Arabic. All code, identifiers and file names are in English.

النسخة العربية: [README.ar.md](README.ar.md)

## The idea

Each episode builds one small slice of the application and teaches one Angular feature clearly. The application itself is the teaching vehicle, not a throwaway demo.

Intended technical foundation:

- All routes share a single trip state model.
- The AI co-pilot uses the same six domain tools available to the user: `search`, `add_stop`, `remove_stop`, `reorder_itinerary`, `edit_stop`, `get_trip_state`.
- Every change the AI makes must be visible and reversible.

## Current status

Early planning. There is no working build, no AI wired up and no authentication yet.

The first episode, TOS-001, is limited to a guest demo screen with fixture data and one visible outcome.

Not in TOS-001: real authentication, live travel data, AI responses, persistence, deployment.

## Episodes

The episode-to-route map and the scope of each one live in [`docs/episodes.md`](docs/episodes.md).
Details for the first episode are in [`docs/tos-001-scope.md`](docs/tos-001-scope.md).

## Code for each episode

Every episode has a git tag with its number, so `tos-001` is exactly the code shown in that video.

```bash
git clone https://github.com/Arigatouz/travel-os-copilot.git
cd travel-os-copilot
git checkout tos-001
npm install
npm start
```

`main` keeps moving after each episode, so check out the matching tag when following a specific video.

## Running locally

The actual installed Angular and Node versions are recorded in [`docs/versions.md`](docs/versions.md) alongside the first code commit. They are deliberately not stated here before being verified against the installed `package.json`.

## Contributing

This repository is primarily teaching material. If you find a technical mistake or something unclear in an episode, open an issue with the episode number and the timestamp.
