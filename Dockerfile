# syntax=docker/dockerfile:1
# Stage 1: build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN --mount=type=secret,id=app_env,target=/app/.env.production,required=true npm run build


# Stage 2: runtime
FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]