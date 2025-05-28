# Band MCP Server

This project aims to build a Model Context Protocol (MCP) server that integrates with the [Band API](https://developers.band.us/develop/guide/api). The server will allow users to fetch posts from their Band groups and perform read/write operations on Band data using the Band API. The server will be implemented in TypeScript and deployed using Docker.

## Objectives

1. **OAuth 2.0 Authentication**: Use the Band API's OAuth 2.0 flow to authenticate users and obtain access tokens.
2. **Fetch Posts**: Provide an MCP resource to fetch posts from a user's Band groups.
3. **Read/Write Operations**: Implement MCP tools to read and write data to Band groups using the Band API.
4. **MCP Integration**: Expose Band API functionality through MCP primitives such as resources and tools.
5. **Docker Deployment**: Package the MCP server into a Docker container for easy deployment.

## Features

- **OAuth 2.0 Authorization**: Securely authenticate users and manage access tokens.
- **MCP Resources**: Fetch and expose Band posts as MCP resources.
- **MCP Tools**: Enable read/write operations on Band data via MCP tools.
- **TypeScript Implementation**: Leverage TypeScript for type safety and maintainability.
- **Dockerized Deployment**: Simplify deployment with a Docker container.

## Quick Start

### Prerequisites

- Node.js 18+ installed
- TypeScript knowledge
- Understanding of OAuth 2.0 authorization flows
- Basic knowledge of Docker and containerization
- Access to the Band API and developer credentials

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd band-mcp-server

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

### Testing

```bash
# Run unit tests
npm test

# Test the MCP server manually
node dist/index.js
```

## Architecture

The Band MCP Server consists of several key components:

- **MCP Server Core**: Handles MCP protocol communication
- **OAuth 2.0 Module**: Manages user authentication and token handling
- **Band API Client**: Interfaces with the Band API
- **Resource Handlers**: Exposes Band data as MCP resources
- **Tool Handlers**: Implements read/write operations as MCP tools

## Configuration

Create a `.env` file in the project root:

```env
BAND_CLIENT_ID=your_band_client_id
BAND_CLIENT_SECRET=your_band_client_secret
BAND_REDIRECT_URI=http://localhost:3000/callback
```

## Usage

The server exposes the following MCP capabilities:

### Resources
- `band://posts/{group_id}` - Fetch posts from a specific Band group
- `band://groups` - List user's Band groups

### Tools
- `create_post` - Create a new post in a Band group
- `update_post` - Update an existing post
- `delete_post` - Delete a post
- `get_group_info` - Get information about a Band group

## Docker Deployment

```bash
# Build the Docker image
docker build -t band-mcp-server .

# Run the container
docker run -p 3000:3000 --env-file .env band-mcp-server
```

## References

- [Band API Documentation](https://developers.band.us/develop/guide/api)
- [OAuth 2.0 Specification](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Inspector Tool](https://github.com/modelcontextprotocol/inspector)

## Contributing

Please see [WORK_PLAN.md](./WORK_PLAN.md) for detailed development roadmap and contribution guidelines.

## License

MIT License - see LICENSE file for details.
