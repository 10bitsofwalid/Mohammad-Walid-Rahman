# Stage 1: Build React Vite SPA Application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root & frontend dependency definitions
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm --prefix frontend ci

# Copy frontend source code
COPY frontend/ ./frontend/

# Build static production bundle
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=$VITE_API_URL

RUN npm --prefix frontend run build

# Stage 2: Serve static production assets with Nginx
FROM nginx:alpine AS runner

# Copy compiled SPA static assets to Nginx html directory
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
