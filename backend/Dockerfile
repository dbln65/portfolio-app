# --- Stage 1: Dependencies ---
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

# --- Stage 2: Runtime ---
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache wget

RUN addgroup -S nodegrp && adduser -S nodeusr -G nodegrp

COPY --from=build /app/node_modules ./node_modules
COPY . .

RUN chown -R nodeusr:nodegrp /app

USER nodeusr

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/health || exit 1

CMD ["node", "server.js"]
