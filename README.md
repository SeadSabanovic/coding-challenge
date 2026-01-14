# Evermore Coding Challenge

Welcome to the Evermore coding challenge. This repository is a **Monorepo** managed via NPM Workspaces, containing a frontend application, a backend API, and a dockerized database.

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
