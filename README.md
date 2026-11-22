# TGI Admin – Frontend

Web interface of the school administration application of Collège Saint Michel (TGI Amparibe).
React 18, Vite, Tailwind CSS and axios. It works with the TGI Admin backend.

## Features by role

| Role      | Screens                                                                                                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin     | dashboard (create users, announcements, subjects, grade sessions, attendance slots; validate and correct submitted grades), students list and files, staff list and profiles, teacher attendance, announcements, own profile |
| Secretary | grade sessions entry (draft and submit), announcements, own profile                                                                                                                                                          |
| Student   | home, grades and report cards (PDF export), discipline history, announcements, own profile                                                                                                                                   |

## Requirements

- Node.js 20 or later
- A running TGI Admin backend (see its README)

## Getting started

```bash
npm install
# create a .env file containing VITE_API_URL
npm run dev
```

## Environment variables

| Variable       | Description                                                                          |
| -------------- | ------------------------------------------------------------------------------------ |
| `VITE_API_URL` | base URL of the API including the prefix, for example `http://localhost:3000/api/v1` |

The specification is read from `<VITE_API_URL>/spec`. After a change of `.env`, restart the dev server.

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | development server                 |
| `npm run build`   | production build in `dist/`        |
| `npm run preview` | serve the production build locally |

## How the frontend talks to the API

The API client (`src/services/api.js`) does not contain any route.

1. It downloads the OpenAPI document once (`GET /spec`).
2. `callOperation(operationId, { pathParams, query, body })` finds the path and method of the operation,
   fills the path parameters and sends the request with axios (15 seconds timeout, bearer token added automatically).
3. Services in `src/services/` only call `callOperation` with an `operationId`.

```js
const data = await callOperation("getStudentHistory", {
  pathParams: { studentId },
});
```

Adding a call means using an `operationId` that exists in the backend `docs/openAPI.yml`.

## Live data, loading and connection errors

- `useLiveResource` (`src/utils/useLiveResource.js`) loads each resource and refreshes it every 8 seconds,
  when the window gets the focus, when the connection comes back, and after every successful action
  (`notifyDataChanged`). No page refresh is needed.
- While data is loading, a "Chargement..." panel replaces the page.
- When the server cannot be reached, "Pas de connexion, veuillez réessayer" is displayed; clicking it reloads
  the data. If the data was already loaded, a banner is shown above the page and the last data stays visible.
- A network failure never logs the user out.

## Project structure

```
src/
  App.jsx                 state, live resources, actions
  main.jsx                entry point
  assets/                 logo
  components/
    auth/                 Login
    common/               Toast, ResourceStatus, GradeSessionEditor
    layout/               Sidebar, Topbar
    modals/               user, subject, announcement, attendance, grade session, history and remark forms
  pages/
    AppRouter.jsx         chooses the page from the role and the active tab
    admin/                dashboard, students, attendance
    secretary/            grade sessions, dashboard
    student/              home, grades, history
    shared/               profile, staff list, announcements
  services/               axios client and one file per API domain
  styles/                 Tailwind class constants, one file per screen
  utils/                  helpers, labels, useLiveResource
```

## Conventions

- Code, identifiers and documentation are in English; only the texts displayed in the interface are in French.
- Only `const` is used. Styles are `UPPER_SNAKE_CASE` constants in `src/styles`.
- Every function is used; the code favours readability over brevity.
- The project contains no comments.

## Behaviour worth knowing

- Staff list: "Voir le profil" opens the same page as "Mon profil" with a "← Retour à la liste" button.
- Students list: sorted by class level (Seconde, Première, Terminale, Ancien), then by matricule.
- Student file: discipline history and remarks are shown as cards; the report card opens inside the students
  tab with a "← Retour au profil" button and the sidebar stays on "Liste des étudiants".
- Creating a user asks only for identity, matricule, gender, role and academic information; email and contact
  are added when the profile is edited.
- Grades are entered out of 20 and are optional: an empty grade means the student is absent. The admin can
  correct submitted grades and write the absence motif from the "Modifier" button of the validation list.
- Report card cells show the grade multiplied by the coefficient; an empty cell is an absence and is not counted.
- The super administrator cannot be deleted and is only visible to himself.

## Deployment (Vercel)

- Framework preset: Vite, build command `npm run build`, output directory `dist`.
- Set `VITE_API_URL` to the public API URL (with `/api/v1`).
- The backend must allow the frontend origin (CORS is open by default).
