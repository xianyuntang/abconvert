FROM node:20.9.0-slim AS base

# Install builder dependencies
FROM base AS builder-deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Install runner dependencies
FROM base AS runnder-deps
WORKDIR /app

ENV NODE_ENV production

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts

# Build the source code
FROM base AS builder
WORKDIR /app

COPY --from=builder-deps /app/node_modules ./node_modules/
COPY . ./

RUN npm run event-worker:build

# Setup runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=runnder-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/event-worker ./
COPY --from=builder /app/apps/event-worker/start.sh /app/start.sh

CMD ["./start.sh"]
