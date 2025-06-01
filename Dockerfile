FROM node:24.1.0-alpine3.21

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# 临时移除prepare脚本来避免构建时的循环问题
RUN npm pkg delete scripts.prepare

# Install all dependencies (including devDependencies for building)
RUN npm ci

# Copy source code and config files
COPY tsconfig.json ./
COPY src ./src

# Debug: 检查文件结构
RUN echo "=== Debug: 检查文件结构 ===" && \
    ls -la && \
    echo "=== src目录内容 ===" && \
    ls -la src/ && \
    echo "=== tsconfig.json内容 ===" && \
    cat tsconfig.json

# Build the application
RUN npm run build

# Debug: 检查构建结果
RUN echo "=== Debug: 检查构建结果 ===" && \
    ls -la dist/

# Remove devDependencies to reduce image size
RUN npm ci --only=production && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp -u 1001

# Change ownership
RUN chown -R mcp:nodejs /app
USER mcp

# Start the MCP server in stdio mode
CMD ["npm", "start"]
