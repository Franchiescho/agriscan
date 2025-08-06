# Stage 1: Install dependencies
FROM node:20-alpine AS deps

# Set working directory
WORKDIR /app

# Install git (for libraries that require it) and glibc compatibility
RUN apk add --no-cache libc6-compat git

# Copy only dependency-related files
COPY package.json package-lock.json* ./

# Install dependencies (no cache for a lighter image)
RUN npm install

# Stage 2: Build the Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy node_modules from the previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all project files into the container
COPY . .

# Run the Next.js build
RUN npm run build

# Stage 3: Final production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment variable
ENV NODE_ENV=production

# Copy only the necessary files to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose the default Next.js port
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]