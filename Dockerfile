FROM node:24.1.0-alpine3.21

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcpserver -u 1001

# Change ownership
RUN chown -R mcpserver:nodejs /app
USER mcpserver

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
