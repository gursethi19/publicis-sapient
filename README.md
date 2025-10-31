# Publicis Sapient Assignment

This repository contains a small full-stack demo used for an assignment. It includes:

- backend/publicis.sapient — Spring Boot (Java, Maven) REST API
- frontend — React (Vite) single-page app

This README explains how to run the project locally and where to look for the main pieces.

## Quick start (development)

Prerequisites

- Java 17
- Maven (optional) — project includes Maven wrapper `mvnw`
- Node.js (16+) and npm/yarn

Backend

1. Open a terminal and change to the backend folder:

```bash
cd backend/publicis.sapient
```

2. Build and run with the Maven wrapper:

```bash
./mvnw -DskipTests package
./mvnw spring-boot:run
```

The backend starts on port 8080 by default.

Useful endpoints

- POST /api/users/load — loads users from an external dataset into the in-memory H2 DB
- GET /api/users/search?query=<query> — free-text search (firstName, lastName, ssn)
- GET /api/users/{id} — get user by numeric id
- GET /api/users/email/{email} — get user by email

Frontend

1. Open a new terminal and change to the frontend folder:

```bash
cd frontend
```

2. Install and run the dev server:

```bash
npm install
npm run dev
```

The frontend runs on port 5173 by default and calls the backend at http://localhost:8080.

## Notes for submission

- Folder name contains a space: `publicis sapient`. Some CI or tooling may not like spaces in paths. Consider renaming to `publicis-sapient` before zipping or uploading.
- There are IDE metadata files (`.idea/`) and a runtime log file (`backend/publicis.sapient/app.log`). Remove them before submission if you want a cleaner archive.

## Troubleshooting

- If the backend fails to start, run `./mvnw -X spring-boot:run` to see a full stacktrace.
- If an endpoint returns 404, ensure the backend is running and CORS allows the frontend origin (frontend runs on port 5173).
- To inspect the database: the app uses H2 in-memory DB; you can enable the H2 console if needed in `application.properties`.

## Optional cleanup tasks

- Remove `.idea/` from git tracking and add it to `.gitignore`.
- Delete `backend/publicis.sapient/app.log`.
- Add a small CI workflow that runs `./mvnw -DskipTests package` and `npm ci && npm run build` if you need automated validation.

If you want, I can:

- Rename the project folder to remove spaces.
- Add a `.gitignore` update that excludes IDE files and logs.
- Add a GitHub Actions workflow that builds backend and frontend.
