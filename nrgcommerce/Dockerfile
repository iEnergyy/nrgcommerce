# Use Node 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files first for better caching
COPY nrgcommerce/package.json ./
COPY nrgcommerce/package-lock.json* ./

# Install dependencies and Alpine-specific binaries
# Use npm ci if package-lock.json exists, otherwise fall back to npm install
RUN if [ -f package-lock.json ]; then \
      npm ci --omit=dev; \
    else \
      npm install --omit=dev; \
    fi && \
    npm install @rollup/rollup-linux-x64-musl @swc/core-linux-x64-musl --save-optional && \
    npm cache clean --force

# Copy source code (from nrgcommerce directory)
COPY nrgcommerce/ .

# Build the admin panel with proper environment
RUN NODE_ENV=production npm run build

# Change to the built server directory and install dependencies
WORKDIR /app/.medusa/server
RUN npm install

# Copy environment file for production (if it exists)
# Note: Railway will inject environment variables at runtime, so this is optional
RUN if [ -f ../../.env ]; then cp ../../.env .env.production; fi

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S medusa -u 1001

# Change ownership of the app directory
# RUN chown -R medusa:nodejs /app
# USER medusa

# Expose port 9000 (Medusa default)
EXPOSE 9000

# # Health check
# HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
#   CMD curl -f http://localhost:9000/health || exit 1

# Start the application from the built server directory
CMD ["npm", "start"]
