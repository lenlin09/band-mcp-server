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

- Node.js 18+ installed
- TypeScript knowledge
- Basic knowledge of Docker and containerization
- Band API access token (obtainable from [Band Developer Portal](https://developers.band.us))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd band-mcp-server

# Install dependencies
make install

# Build the project
make build

# Config MCP client with this json
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

## Architecture

The Band MCP Server consists of several key components:

- **MCP Server Core**: Handles MCP protocol communication
- **Authentication Module**: Manages access token validation
- **Band API Client**: Interfaces with the Band API
- **Resource Handlers**: Exposes Band data as MCP resources
- **Tool Handlers**: Implements read/write operations as MCP tools

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

## References

- [Band API Documentation](https://developers.band.us/develop/guide/api)
- [Band Developer Portal](https://developers.band.us)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Inspector Tool](https://github.com/modelcontextprotocol/inspector)

## License

MIT License - see LICENSE file for details.