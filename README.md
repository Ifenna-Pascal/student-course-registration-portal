# Student Portal

A school portal where students sign in, manage their profile and register for courses.

| Folder | What it is | Stack |
| --- | --- | --- |
| [`apps/api`](apps/api) | REST API with auth, pagination and search | NestJS, TypeScript, MongoDB, JWT, Swagger |
| [`apps/web`](apps/web) | Student web app | React, TypeScript, Vite, Tailwind CSS |

## Run it locally

You need Node 18+ and MongoDB (or Docker).

```bash
# 1. API
cd apps/api
cp .dev.env.example .dev.env   # fill in the values
npm install
npm run dev                    # http://localhost:8080

# 2. Web app (new terminal)
cd apps/web
npm install
npm run dev                    # http://localhost:5173, calls the API at localhost:8080
```

Both apps also ship a `Dockerfile`.

This repo combines the former `portal` and `portal-frontend` repos, with their full commit history.
