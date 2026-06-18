# Simple Cal

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

# Push database schema
npm run db:push -w server

# Generate Prisma client
npm run db:generate -w server

# Start both client and server in dev mode
npm run dev
```

- Client runs at **http://localhost:5173**
- Server runs at **http://localhost:3001**

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start client + server concurrently |
| `npm run build` | Build both client and server |
| `npm run lint` | Type-check both workspaces |
| `npm run db:push -w server` | Push schema to SQLite |
| `npm run db:generate -w server` | Generate Prisma client |
| `npm run db:studio -w server` | Open Prisma Studio |
| `npm run test:e2e` | Run Playwright e2e tests |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in (returns JWT) |
| GET | `/api/events` | List user's events |
| POST | `/api/events` | Create an event |
| PUT | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |

### Hexlet tests and linter status:
[![Actions Status](https://github.com/ivngl/ai-for-developers-project-387/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ivngl/ai-for-developers-project-387/actions)
