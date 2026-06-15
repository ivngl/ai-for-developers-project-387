FROM node:20-alpine AS base
RUN apk add --no-cache openssl

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json client/
COPY server/package.json server/
COPY server/prisma ./server/prisma
RUN npm ci

FROM deps AS client-builder
WORKDIR /app
COPY client/ client/
RUN npm run build -w client

FROM deps AS server-builder
WORKDIR /app
COPY server/ server/
RUN npx prisma generate --schema=server/prisma/schema.prisma
RUN npm run build -w server

FROM base AS runtime
WORKDIR /app

COPY --from=client-builder /app/client/dist ./client/dist
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=server-builder /app/server/prisma ./server/prisma
COPY package.json ./
COPY server/package.json ./server/

ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_URL="file:./dev.db"

EXPOSE 3001

CMD ["sh", "-c", "cd server && npx prisma db push && node dist/index.js"]
