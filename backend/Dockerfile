# Stage 1: Build TypeScript application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root & backend dependency definitions
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm --prefix backend ci

# Copy backend source code
COPY backend/ ./backend/

# Build TypeScript output
RUN npm --prefix backend run build

# Stage 2: Production runner image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Create non-root system group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built package definitions and install production dependencies only
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy compiled JavaScript output from builder stage
COPY --from=builder /app/backend/dist ./dist

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5000

# Health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "dist/server.js"]
