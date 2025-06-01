/**
 * Get the list of bands that the user joined.
 * @see https://developers.band.us/develop/guide/api/get_bands
 */
import { bandApiClient } from '../client.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const ToolDefinition : Tool = {
    name: "get_user_bands",
    description: "Get the list of bands that the user joined from BAND.",
    inputSchema: {
        type: "object",
        properties: {},
        required: []
    },
    outputSchema: {
        type: "object",
        properties: {
        success: {
            type: "boolean",
            description: "Indicates if the operation was successful."
        },
        data: {
            type: "object",
            description: "User's bands data returned from BAND API.",
            properties: {
            bands: {
                type: "array",
                description: "List of bands the user joined.",
                items: {
                type: "object",
                properties: {
                    band_key: {
                    type: "string",
                    description: "Band ID."
                    },
                    name: {
                    type: "string",
                    description: "Band name."
                    },
                    description: {
                    type: "string",
                    description: "Band description."
                    },
                    cover_url: {
                    type: "string",
                    description: "URL of a cover image."
                    },
                    band_url: {
                    type: "string",
                    description: "URL of a band."
                    },
                    member_count: {
                    type: "number",
                    description: "Number of band members."
                    },
                    created_at: {
                    type: "number",
                    description: "Band creation time in timestamp format."
                    }
                }
                }
            }
            }
        }
        },
        required: ["success", "data"]
    }
};

interface Band {
  band_key: string;
  name: string;
  description: string;
  cover_url?: string;
  band_url: string;
  member_count: number;
  created_at: number;
}

interface BandsResponse {
  bands: Band[];
}

export async function handleToolCall() {
    const bandsData = await bandApiClient.get<BandsResponse>('/v2/bands');
    return {
        content: [{
            type: "text",
            text: JSON.stringify(bandsData, null, 2)
        }]
    };
}
