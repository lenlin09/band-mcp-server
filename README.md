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
- **Authentication Module**: Manages access token validation
- **Band API Client**: Interfaces with the Band API
- **Resource Handlers**: Exposes Band data as MCP resources
- **Tool Handlers**: Implements read/write operations as MCP tools

## Configuration

Create a `.env` file in the project root:

```env
BAND_ACCESS_TOKEN=your_band_access_token
```

## Usage

The server exposes the following MCP capabilities:

### Resources
- `band://posts/{band_key}` - Fetch posts from a specific Band
- `band://bands` - List user's accessible Bands
- `band://albums/{band_key}` - Get photo albums from a Band
- `band://members/{band_key}` - Get members of a Band

### Tools
- `create_post` - Create a new post in a Band
- `get_band_info` - Get information about a Band
- `get_band_posts` - Get posts from a Band with pagination
- `get_band_albums` - Get photo albums from a Band
- `get_band_members` - Get members of a Band

## Band API Integration

This server integrates with the following Band API endpoints:

- **Band Information**: `/v2/band/information` - Get Band details
- **Band Posts**: `/v2.2/band/posts` - Get posts from a Band
- **Create Post**: `/v2/band/post/create` - Create a new post
- **Photo Albums**: `/v2/band/albums` - Get photo albums
- **Band Members**: `/v2/band/members` - Get Band members

For detailed API documentation, visit [Band API Guide](https://developers.band.us/develop/guide/api).

## Docker Deployment

```bash
# Build the Docker image
docker build -t band-mcp-server .

# Run the container
docker run -p 3000:3000 --env-file .env band-mcp-server
```

## References

- [Band API Documentation](https://developers.band.us/develop/guide/api)
- [Band Developer Portal](https://developers.band.us)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Inspector Tool](https://github.com/modelcontextprotocol/inspector)

## Contributing

Please see [WORK_PLAN.md](./WORK_PLAN.md) for detailed development roadmap and contribution guidelines.

## License

MIT License - see LICENSE file for details.
