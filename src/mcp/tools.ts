import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { bandApiClient } from '../band/client.js';

export const bandTools: Tool[] = [
  {
    name: "get_band_user_profile",
    description: "Get user profile information from BAND. Optionally specify a band_key to get user info within a specific band context.",
    inputSchema: {
      type: "object",
      properties: {
        band_key: {
          type: "string",
          required: false,
          title: "Band Key",
          default: "",
          description: "Band ID to get the user's profile from a specific band. If not provided, the default profile of the user will be returned."
        }
      },
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
          description: "User profile data returned from BAND API.",
          properties: {
            user_key: {
              type: "string",
              description: "User ID."
            },
            name: {
              type: "string",
              description: "User's name."
            },
            profile_image_url: {
              type: "string",
              description: "URL of a profile image."
            },
            is_app_member: {
              type: "boolean",
              description: "Boolean value indicating whether the user account is connected to your app or not."
            },
            message_allowed: {
              type: "boolean",
              description: "Boolean value indicating whether the user allowed to receive messages or not."
            }
          }
        }
      },
      required: ["success", "data"]
    }
  }
];

export async function handleToolCall(name: string, args: any) {
  try {
    switch (name) {
      case "get_band_user_profile": {
          const { band_key } = args || {};
          const userProfile = await bandApiClient.getUserInformation(band_key);
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                data: userProfile,
                band_key: band_key || null
              }, null, 2)
            }]
          };
        }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : "Failed to get user information"
        }, null, 2)
      }]
    };
  }
}
