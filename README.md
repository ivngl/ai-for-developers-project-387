### Hexlet tests and linter status:
[![Actions Status](https://github.com/ivngl/ai-for-developers-project-387/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ivngl/ai-for-developers-project-387/actions)

# Simple Cal

[![Live Demo](https://img.shields.io/badge/Live%20Demo-brightgreen?style=for-the-badge)](https://ai-for-developers-project-387-pezd.onrender.com)

Calendar scheduling web app — simplified [cal.com](https://cal.com). Users can register, create events (time slots), and share availability.

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Client   | React 18, TypeScript, Vite, React Router v6, Mantine UI |
| Server   | Node.js, Express, TypeScript |
| Database | SQLite via Prisma ORM |
| Auth     | JWT (Bearer token) |

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp server/.env.example server/.env

# Full setup (install deps, generate Prisma client, push schema)
make setup

# Start both client and server in dev mode
make dev
```

- Client runs at **http://localhost:5173**
- Server runs at **http://localhost:3001**

## Available Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start client + server concurrently |
| `make build` | Build both client and server |
| `make lint` | Type-check both workspaces |
| `make db-push` | Push schema to SQLite |
| `make db-generate` | Generate Prisma client |
| `make db-studio` | Open Prisma Studio |
| `make test` | Run Playwright e2e tests |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in (returns JWT) |
| GET | `/api/events` | List user's events |
| POST | `/api/events` | Create an event |
| PUT | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |
