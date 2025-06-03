# Band MCP Server

This project aims to build a Model Context Protocol (MCP) server that integrates with the [Band API](https://developers.band.us/develop/guide/api). The server will allow users to fetch posts from their Band groups and perform read/write operations on Band data using the Band API. The server will be implemented in TypeScript and deployed using Docker.

## Objectives

1. **Access Token Authentication**: Use Band API access tokens for authentication.
2. **Fetch Posts**: Provide an MCP resource to fetch posts from Band groups.
3. **Read/Write Operations**: Implement MCP tools to read and write data to Band groups using the Band API.
4. **MCP Integration**: Expose Band API functionality through MCP primitives such as resources and tools.
5. **Docker Deployment**: Package the MCP server into a Docker container for easy deployment.

## Features

- **Access Token Authentication**: Securely authenticate using Band API access tokens.
- **MCP Resources**: Fetch and expose Band posts as MCP resources.
- **MCP Tools**: Enable read/write operations on Band data via MCP tools.
- **TypeScript Implementation**: Leverage TypeScript for type safety and maintainability.
- **Dockerized Deployment**: Simplify deployment with a Docker container.

## Quick Start

### Prerequisites

- Node.js 23.11.0+ installed
- TypeScript knowledge
- Basic knowledge of Docker and containerization
- Band API access token (obtainable from [Band Developer Portal](https://developers.band.us))

### Installation

#### Option 1: Using Docker (Recommended)

```bash
# Pull the latest image from GitHub Container Registry
docker pull ghcr.io/USERNAME/band-mcp-server:latest

# Run the container with your Band access token
docker run --rm -it \
  -e BAND_ACCESS_TOKEN="your_band_access_token" \
  ghcr.io/USERNAME/band-mcp-server:latest

# For MCP client configuration, use:
{
  "mcpServers": {
    "band-mcp-server": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i",
        "-e", "BAND_ACCESS_TOKEN=your_band_access_token",
        "ghcr.io/USERNAME/band-mcp-server:latest"
      ]
    }
  }
}
```

#### Option 2: Local Development

```bash
# Clone the repository
git clone <repository-url>
cd band-mcp-server

# Install dependencies
make install

# Build the project
make build

# Run locally
BAND_ACCESS_TOKEN="your_token" node dist/index.js

# Or for MCP client configuration:
{
  "mcpServers": {
    "band-mcp-server": {
      "command": "node",
      "args": [
        "/path/to/your/band-mcp-server/dist/index.js"
      ],
      "env": {
        "BAND_ACCESS_TOKEN": "your_band_access_token"
      }
    }
  }
}
```

### Docker Development

```bash
# Build Docker image locally
make docker-build

# Run Docker container locally
make docker-run

# Available Docker commands:
make help  # Show all available commands
```

## Architecture

The Band MCP Server consists of several key components:

- **MCP Server Core**: Handles MCP protocol communication
- **Authentication Module**: Manages access token validation
- **Band API Client**: Interfaces with the Band API
- **Resource Handlers**: Exposes Band data as MCP resources
- **Tool Handlers**: Implements read/write operations as MCP tools

## CI/CD and Docker

### Automated Builds

This project uses GitHub Actions for continuous integration and deployment:

- **Automatic Docker builds**: Every push to `main`/`master` branch triggers a Docker build
- **Multi-platform support**: Builds for both `linux/amd64` and `linux/arm64`
- **GitHub Container Registry**: Images are automatically published to `ghcr.io`
- **Version tagging**: Git tags create versioned Docker images

### Docker Image Tags

- `latest` - Latest build from main branch
- `v1.0.0` - Specific version tags
- `main` - Latest main branch build

### Using Pre-built Images

The easiest way to use this MCP server is with the pre-built Docker images:

```bash
# Pull and run the latest version
docker pull ghcr.io/YOUR_USERNAME/band-mcp-server:latest
docker run --rm -it -e BAND_ACCESS_TOKEN="your_token" ghcr.io/YOUR_USERNAME/band-mcp-server:latest
```

### Development Workflow

1. Fork the repository
2. Make your changes
3. Push to your fork
4. GitHub Actions will build and test your changes
5. Create a pull request
6. Once merged, a new Docker image will be built automatically

## Usage

The server exposes the following MCP capabilities:

### Tools
- `get_user_information` - Get user profile information for a Band
- `get_bands` - Get list of Bands the authenticated user belongs to
- `get_posts` - Get posts from a specific Band with pagination support
- `get_post` - Get detailed information about a specific post
- `get_comments` - Get comments for a specific post with sorting options
- `permissions` - Check user permissions for a specific Band
- `get_albums` - Get photo albums in a Band
- `get_photos` - Get photos from a specific album
- `write_comment` - Add a comment to a post
- `write_post` - Create a new post in a Band
- `remove_comment` - Delete a comment from a post
- `remove_post` - Delete a post from a Band

## References

- [Band API Documentation](https://developers.band.us/develop/guide/api)
- [Band Developer Portal](https://developers.band.us)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Inspector Tool](https://github.com/modelcontextprotocol/inspector)

## License

MIT License - see LICENSE file for details.