/**
 * Write a comment to BAND post.
 * @see https://developers.band.us/develop/guide/api/write_comment
 */
import { bandApiClient } from '../client.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const ToolDefinition : Tool = {
    name: "write_comment",
    description: "Write a comment to BAND post.",
    inputSchema: {
        type: "object",
        properties: {
            band_key: {
                type: "string",
                title: "Band Key",
                description: "band identifier"
            },
            post_key: {
                type: "string",
                title: "Post Key",
                description: "post identifier"
            },
            body: {
                type: "string",
                title: "Body",
                description: "comment content"
            }
        },
        required: ["band_key", "post_key", "body"]
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
                    comment_key: {
                        type: "string",
                        description: "created comment identifier"
                    }
                }
            }
        },
        required: ["result_code", "result_data"]
    }
};

interface WriteCommentResponse {
    result_code: number;
    result_data: {
        comment_key: string;
    };
}

export async function handleToolCall(band_key: string, post_key: string, body: string) {
    const commentData = await bandApiClient.post<WriteCommentResponse>(
        '/v2/band/post/comment/create',
        { band_key, post_key, body }
    );
    return {
        content: [{
            type: "text",
            text: JSON.stringify(commentData, null, 2)
        }]
    };
}
