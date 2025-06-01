.PHONY: help install build dev

# Default target
help:
	@echo "Available commands:"
	@echo "  help          Show help information"
	@echo "  install       Install dependencies"
	@echo "  build         Build project"
	@echo "  dev           Run in development mode (hot reload)"

# Install dependencies
install:
	npm install

# Build project
build:
	npm run build

# Development mode (hot reload)
dev:
	npm run dev