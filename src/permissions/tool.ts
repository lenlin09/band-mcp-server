/**
 * Get post permission information.
 * @see https://developers.band.us/develop/guide/api/get_post_permission
 */
import { bandApiClient } from '../client.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const ToolDefinition : Tool = {
    name: "permissions",
    description: "Get post permission information from BAND.",
    inputSchema: {
        type: "object",
        properties: {
            band_key: {
                type: "string",
                title: "Band ID",
                description: "Band ID"
            },
            permissions: {
                type: "string",
                title: "Permissions",
                description: "Comma-separated permission types: posting (Post write permission), commenting (Comment write permission), contents_deletion (Post/Comment delete permission)"
            }
        },
        required: ["band_key", "permissions"]
    },
    outputSchema: {
        type: "object",
        properties: {
            result_code: {
                type: "number",
                description: "Result code"
            },
            result_data: {
                type: "object",
                description: "Result data",
                properties: {
                    create_post: {
                        type: "boolean",
                        description: "permission to create post"
                    },
                    create_comment: {
                        type: "boolean",
                        description: "permission to create comment"
                    },
                    invite_member: {
                        type: "boolean",
                        description: "permission to invite member"
                    }
                }
            }
        },
        required: ["result_code", "result_data"]
    }
};

interface PostPermissionResponse {
    result_code: number;
    result_data: {
        create_post: boolean;
        create_comment: boolean;
        invite_member: boolean;
    };
}

export async function handleToolCall(band_key: string, permissions: string) {
    const permissionData = await bandApiClient.get<PostPermissionResponse>(
        '/v2/band/permissions', 
        { band_key, permissions }
    );
    return {
        content: [{
            type: "text",
            text: JSON.stringify(permissionData, null, 2)
        }]
    };
}
