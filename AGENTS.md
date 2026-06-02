# Simple Cal — Project Context

## Overview
Calendar scheduling web app (simplified cal.com). Users can register, create events (time slots), and share availability.

## Tech Stack
| Layer    | Technology |
|----------|------------|
| Client   | React 18, TypeScript, Vite, React Router v6 |
| Server   | Node.js, Express, TypeScript |
| Database | SQLite via Prisma ORM |
| Dev tools| tsx (server dev), concurrently (run both), npm workspaces |

## Project Structure
```
/client/              # React frontend
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  src/
    main.tsx          # Entry point
    components/       # Reusable UI
    pages/            # Route pages
    hooks/            # Custom hooks
    api/              # API client helpers
/server/              # Express API
  package.json
  tsconfig.json
  src/
    index.ts          # Entry point
    routes/           # Express route handlers
    middleware/       # Auth, validation, etc.
    lib/              # Utilities
  prisma/
    schema.prisma     # DB schema + migrations
```

## Database Models (Prisma)
- **User**: id, email (unique), name, password, events[], timestamps
- **Event**: id, title, description?, startTime, endTime, userId (FK → User), timestamps

## API Routes (convention)
```
GET    /api/health
POST   /api/auth/register
POST   /api/auth/login
GET    /api/events
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

## Conventions
- TypeScript strict mode everywhere
- Prisma client generated in server's node_modules (not checked in)
- API returns JSON; errors use `{ error: string }`
- Auth via JWT stored in localStorage, sent as Bearer token
- React components: functional + hooks, no class components
- File/folder naming: kebab-case for files, PascalCase for components

## Dev Commands
| Command | Location | Action |
|---------|----------|--------|
| `npm run dev` | root | Start both client + server |
| `npm run dev` | client/ | Vite dev server only |
| `npm run dev` | server/ | tsx watch server only |
| `npm run build` | root | Build both |
| `npm run db:generate` | server/ | Generate Prisma client |
| `npm run db:push` | server/ | Push schema to SQLite |
| `npm run db:studio` | server/ | Open Prisma Studio |
