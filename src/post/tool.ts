/**
 * Get a single post from BAND.
 * @see https://developers.band.us/develop/guide/api/get_post
 */
import { bandApiClient } from '../client.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const ToolDefinition : Tool = {
    name: "get_post",
    description: "Get a single post from BAND.",
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
            }
        },
        required: ["band_key", "post_key"]
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
                    content: {
                        type: "string",
                        description: "post content"
                    },
                    post_key: {
                        type: "string",
                        description: "post identifier"
                    },
                    created_at: {
                        type: "number",
                        description: "created time"
                    },
                    photos: {
                        type: "array",
                        description: "post photos",
                        items: {
                            type: "object",
                            properties: {
                                width: {
                                    type: "number",
                                    description: "photo width"
                                },
                                height: {
                                    type: "number",
                                    description: "photo height"
                                },
                                photo_key: {
                                    type: "string",
                                    description: "photo identifier"
                                },
                                photo_album_key: {
                                    type: ["string", "null"],
                                    description: "photo album identifier"
                                },
                                author: {
                                    type: "object",
                                    description: "photo author",
                                    properties: {
                                        name: {
                                            type: "string",
                                            description: "author name"
                                        },
                                        description: {
                                            type: "string",
                                            description: "author description"
                                        },
                                        profile_image_url: {
                                            type: "string",
                                            description: "author profile image url"
                                        }
                                    }
                                },
                                url: {
                                    type: "string",
                                    description: "photo url"
                                },
                                comment_count: {
                                    type: "number",
                                    description: "photo comment count"
                                },
                                emotion_count: {
                                    type: "number",
                                    description: "photo emotion count"
                                },
                                created_at: {
                                    type: "number",
                                    description: "photo created time"
                                },
                                is_video_thumbnail: {
                                    type: "boolean",
                                    description: "is video thumbnail"
                                }
                            }
                        }
                    },
                    comment_count: {
                        type: "number",
                        description: "post comment count"
                    },
                    author: {
                        type: "object",
                        description: "post author",
                        properties: {
                            name: {
                                type: "string",
                                description: "author name"
                            },
                            description: {
                                type: "string",
                                description: "author description"
                            },
                            profile_image_url: {
                                type: "string",
                                description: "author profile image url"
                            }
                        }
                    }
                }
            }
        },
        required: ["result_code", "result_data"]
    }
};

interface Author {
    name: string;
    description: string;
    profile_image_url: string;
}

interface Photo {
    width: number;
    height: number;
    photo_key: string;
    photo_album_key: string | null;
    author: Author;
    url: string;
    comment_count: number;
    emotion_count: number;
    created_at: number;
    is_video_thumbnail: boolean;
}

interface PostResponse {
    result_code: number;
    result_data: {
        content: string;
        post_key: string;
        created_at: number;
        photos: Photo[];
        comment_count: number;
        author: Author;
    };
}

export async function handleToolCall(band_key: string, post_key: string) {
    const postData = await bandApiClient.get<PostResponse>(
        '/v2/band/post', 
        { band_key, post_key }
    );
    return {
        content: [{
            type: "text",
            text: JSON.stringify(postData, null, 2)
        }]
    };
}
