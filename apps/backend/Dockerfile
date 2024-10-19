FROM node:20.9.0-slim AS base

# Install builder dependencies
FROM base AS builder-deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Build the source code
FROM base AS builder
WORKDIR /app

COPY --from=builder-deps /app/node_modules ./node_modules/
COPY . ./

RUN npm run backend:build

# Setup runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder-deps /app/node_modules ./node_modules/
COPY --from=builder /app/dist/apps/backend ./
COPY --from=builder /app/apps/backend/start.sh /app/start.sh

CMD ["./start.sh"]
