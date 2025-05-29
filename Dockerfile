FROM node:22-alpine AS base

ENV NODE_ENV=production
RUN corepack enable && corepack enable pnpm

FROM base AS builder
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/out ./out

FROM nginx:latest AS prod-nginx
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]