# ============================
# 1) Base image for dependencies
# ============================
FROM node:18-alpine AS deps

# Create app directory
WORKDIR /app

# Copy only package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies (use npm ci for reproducible builds)
RUN npm ci --production


# ============================
# 2) Builder stage
# ============================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy app source code
COPY . .

# Copy installed dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Optional: build step if you have one
# RUN npm run build


# ============================
# 3) Runtime stage (non-root, lightweight)
# ============================
FROM node:18-alpine AS runner

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy application and dependencies
COPY --from=builder /app ./

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]

