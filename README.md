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

- Band API access token (obtainable from [Band Developer Portal](https://developers.band.us/develop/myapps/list))

### Installation

```bash
# settings.json in vscode:
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "band_access_token",
        "description": "BAND Access Token",
        "password": true
      }
    ],
    "servers": {
      "band-mcp-server": {
        "command": "docker",
        "args": ["run", "--rm", "-i", "-e", "BAND_ACCESS_TOKEN", "kanghouchao/band-mcp-server:latest"],
        "env": {
          "BAND_ACCESS_TOKEN": "${input:band_access_token}"
        }
      }
    }
  }
}
```

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