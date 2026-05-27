# Mini Item Directory — Frontend

Angular UI for the Mini Item Directory: a small app where a user can add an item
(name + category) and search items by name. This repository holds the
**frontend**; the Spring Boot backend is in a separate repository.

## Live demo

- **App (this frontend):** https://miniitemdirectoryfrontend.onrender.com
- **API (backend):** https://miniitemdirectorybackend.onrender.com

Backend repo: https://github.com/Kk-1020/MiniItemDirectoryBackend

> Note: the backend runs on a free hosting tier, so the first action after a
> period of inactivity may take ~30–60 seconds while the service wakes up.

## Tech stack

- Angular 21 (standalone components, zoneless change detection)
- TypeScript
- Plain CSS (no design system — minimal styling, per the exercise)

## How to run locally

**Prerequisites:** Node.js 20+ and npm. The backend must also be running locally
on http://localhost:8080 (see the backend repo) — the dev build points there
automatically.

```bash
npm install
npm start
```

The app starts on http://localhost:4200.

The backend URL is configured in `src/environments/`:
`environment.development.ts` points at localhost for `npm start`, and
`environment.ts` points at the deployed API for the production build.

## How to test it

Open the app and try the two example cases:

1. **Add and search:** add a Book named `Atomic Habits`, then type `atom` in the
   search box and search — the item appears in the list.
2. **Validation:** leave the name empty and click *Add item* — the form shows a
   "Name is required" message and nothing is added. (An empty name is also
   rejected by the API with `400 Bad Request`.)

## Known limitations

- Data is stored in the backend's in-memory database, so all items are lost when
  the backend restarts.
- Search runs on button click, not live as you type.
- No edit or delete — only create and search (per the exercise scope).
- Minimal styling only; no design system.

## Approximate hours spent

~5 hours total across frontend and backend (build, environment setup,
deployment, and documentation).

## Use of AI coding tools

I used Claude (Anthropic) to scaffold the Angular project, generate the
component and API service, and draft this README. I reviewed all generated
code, ran the build and tests, and handled deployment myself.
