# Mohammad Walid Rahman — Portfolio

Full-stack personal portfolio site. React + TypeScript frontend, Express + MongoDB backend, monorepo w/ npm workspaces. Sections: hero, about, skills, experience, projects, education, certificates, GitHub activity, testimonials, blog, contact. Admin dashboard for content management.

## Stack

**Frontend** — React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Zustand, TanStack Query, Zod, react-github-calendar

**Backend** — Node.js, Express, TypeScript, MongoDB (Mongoose), JWT auth, Zod validation, Helmet, rate limiting

**Infra** — Docker, Docker Compose, Vercel deploy config, GitHub Actions CI/CD (lint, typecheck, build, docker-check)

## Repo structure

```
frontend/    React app (Vite)
backend/     Express API
api/         Vercel serverless entry
nginx/       Frontend nginx config
docker-compose.yml
```

## Setup

Requires Node 20+, MongoDB.

```bash
npm install                    # installs frontend + backend workspaces
cp backend/.env.example backend/.env   # fill in MONGODB_URI, JWT_SECRET, etc.

npm run dev:backend            # start API (port 5000)
npm run dev:frontend           # start frontend (port 3000/Vite default)

npm run seed:backend           # seed DB w/ initial data
```

## Scripts (root)

| Script                | Does                           |
| --------------------- | ------------------------------ |
| `npm run dev`         | frontend dev server            |
| `npm run dev:backend` | backend dev server (tsx watch) |
| `npm run build`       | build backend then frontend    |
| `npm run typecheck`   | typecheck both workspaces      |
| `npm run lint`        | lint both workspaces           |
| `npm run format`      | prettier format both           |

## Docker

```bash
docker compose up --build
```

Spins up MongoDB, backend (`:5000`), frontend/nginx (`:80`).

## API routes

Mounted under `/api`: `/auth`, `/experiences`, `/projects`, `/education`, `/skills`, `/socials`, `/testimonials`, `/messages`, `/settings`, `/blogs`.

## Env vars (backend)

```
PORT=5000
NODE_ENV=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
CLIENT_ORIGIN=http://localhost:3000
```

## CI/CD

GitHub Actions on push/PR to `main`/`master`: lint + typecheck → build verification → docker build check.

## License

Personal project. All rights reserved unless stated otherwise.
