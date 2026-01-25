<!--
 # Evermore Coding Challenge

 Welcome to the Evermore coding challenge. This repository is a **Monorepo** managed via NPM Workspaces, containing a frontend application, a backend API, and a dockerized database.

 This template provides a minimal setup and all the tools you will need for this challenge. Complete as much as you can or have the knowledge for! On the coding interview, we will ask for a quick demo of the challenge, walkthrough of the code and after which we will discuss and challenge your decisions. We might also ask you to extend the solution with some additional features on the call itself! Good luck!

 ## Instructions

 Checkout the repository, install dependencies and run the project.
 Design is entirely up to you, so be as creative as you want; we have prepared MaterialUI, but feel free to pick any framework that you are comfortable with.
 Typescript, TanStack, ReactQuery, and Zustand are included in the project and are encouraged to be used.
 Structure files and components according to the best coding practices that you are familiar with

 Once you are done, submit a Pull Request for a review and discussion

 ## 🏗 Project Architecture

 | Service      | Technology Stack                                                   | Location             |
 | :----------- | :----------------------------------------------------------------- | :------------------- |
 | **Frontend** | React, TypeScript, Material UI, Zustand, TanStack (Query & Router) | `/frontend`          |
 | **Backend**  | NestJS, TypeScript, Prisma ORM                                     | `/backend`           |
 | **Database** | PostgreSQL 15 (Docker)                                             | `docker-compose.yml` |

 ---

 ## 🚀 Getting Started

 ### 1. Prerequisites

 Ensure you have the following installed:

 - **Node.js** (v20+ recommended)
 - **Docker** & **Docker Compose**
 - **NPM** (v7+ comes with Node)

 ### 2. Install Dependencies

 From the root directory, install dependencies for all workspaces:

 ```bash
 npm install
 ```

 ### 3. Start Infrastructure

 Start the PostgreSQL database container. This must be running before starting the backend.

 ```bash
 npm run docker:up
 ```

 > **Note:** The database runs on port `5432`. Ensure no local Postgres instances are conflicting.

 ---

 ## 🛠 Development Workflows

 We have configured root-level scripts for convenience.

 | Command                | Description                                              |
 | :--------------------- | :------------------------------------------------------- |
 | `npm run docker:up`    | Starts the Postgres database container in detached mode. |
 | `npm run docker:down`  | Stops and removes the database container.                |
 | `npm run dev:backend`  | Starts the NestJS server in watch mode.                  |
 | `npm run dev:frontend` | Starts the React/Vite development server.                |

 ### Typical Startup Routine

 1. `npm run docker:up`
 2. Open a new terminal: `npm run dev:backend`
 3. Open a new terminal: `npm run dev:frontend`

 ---

 ## 📂 Documentation

 For specific details on the sub-projects, please refer to their respective READMEs:

 - [Frontend Documentation](./frontend/README.md)
 - [Backend Documentation](./backend/README.md)
 -->

# Evermore Calendar (Full-Stack)

![Evermore Calendar Screenshot](./frontend/public/featured.png)

Full-stack calendar application built as a monorepo:

- **Frontend**: Vite + React + TypeScript, TailwindCSS + shadcn/ui, TanStack Router, TanStack Query, Zustand, Motion
- **Backend**: NestJS + Prisma
- **Database**: PostgreSQL (Docker)

## Features

- **Calendar views**
  - Day / Week / Month
  - Switching views resets focus to **today**
  - Remembers last selected view across refresh (localStorage via Zustand persist)
- **Event management**
  - Create / Edit / Delete events
  - Quick add by clicking a time slot on the grid
- **Timezone handling**
  - Times are stored in **UTC**
  - Calendar renders in **browser timezone**
  - Edit form displays times in the event’s **original timezone**
- **Validation & correctness**
  - Frontend form validation (React Hook Form + Zod)
  - Backend validation (DTOs + Nest ValidationPipe)
  - Overlap prevention (backend validated, returns 409 Conflict)
- **Data fetching & caching**
  - Date-range fetching per view (no “fetch all events”)
  - TanStack Query caching keyed by date range + invalidation on mutations
  - Optimistic updates:
    - Update: optimistic in calendar (dialog waits for API to show validation errors)
    - Delete: optimistic removal with rollback
- **UX & UI polish**
  - Loading feedback (button loading states)
  - Subtle grid pulse while fetching events
  - Page transitions (fade)
  - Staggered event entrance animations (day / week / month)
  - Responsive navigation (mobile drawer + desktop nav)
- **Development helpers**
  - Dev-only backend delay to simulate real network latency
  - Dev-only DB seed (auto-inserts mock events when Event table is empty)

## Prerequisites

- Node.js v20+
- Docker + Docker Compose

## Quick Start

1.  Install dependencies (root installs both workspaces):

```bash
npm install
```

2.  Start Postgres:

```bash
npm run docker:up
```

3.  Sync database schema:

```bash
npm run db:override --workspace=backend
```

4.  Start backend:

```bash
npm run dev:backend
```

5.  Start frontend:

```bash
npm run dev:frontend
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000` (API base: `http://localhost:3000/api`)

## Environment Variables

### Frontend

`frontend/.env`:

```bash
VITE_API_URL=http://localhost:3000/api
```

### Backend

`backend/.env` (already provided, matches docker-compose defaults):

- `DATABASE_URL=postgresql://user:password@localhost:5432/challenge_db?schema=public`

## API

All endpoints are prefixed with `/api`.

- `GET /api/events?from=<ISO>&to=<ISO>`
  - Returns events overlapping the requested range
- `GET /api/events/:id`
- `POST /api/events`
- `PUT /api/events/:id`
- `DELETE /api/events/:id` (204)

## Development Notes

- **Dev delay**: backend includes a development-only delay interceptor to simulate slower network responses.
- **Seed data**: on backend startup (non-production), if the `Event` table is empty, mock events are inserted.

## Scripts

Root:

- `npm run docker:up`
- `npm run docker:down`
- `npm run dev:backend`
- `npm run dev:frontend`

Backend (workspace):

- `npm run db:override --workspace=backend`
- `npm run start:dev --workspace=backend`

## Troubleshooting

- **Port 5432 already in use**:
  - Stop local Postgres or change the docker port mapping.
- **Frontend can’t reach backend**:
  - Confirm `VITE_API_URL` points to `http://localhost:3000/api`.
- **Seed data not appearing**:
  - Seed runs only when `Event` table is empty.
