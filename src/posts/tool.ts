/**
 * Get posts from a specific band.
 * @see https://developers.band.us/develop/guide/api/get_posts
 */
import { bandApiClient } from '../client.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const ToolDefinition : Tool = {
    name: "get_posts",
    description: "Get posts from a specific band in BAND.",
    inputSchema: {
        type: "object",
        properties: {
            band_key: {
                type: "string",
                title: "Band Key",
                description: "band identifier"
            },
            locale: {
                type: "string",
                required: true,
                default: "ja_JP",
                title: "Locale",
                description: "Region and language"
            },
            after: {
                type: "string",
                required: false,
                title: "After",
                description: "for paging"
            },
            limit: {
                type: "number",
                required: false,
                title: "Limit", 
                default: 20,
                description: "number of posts to load. min: 1, max: 100, default: 20"
            }
        },
        required: ["band_key"]
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
                    paging: {
                        type: "object",
                        description: "Paging information",
                        properties: {
                            previous_params: {
                                type: ["object", "null"],
                                description: "Previous page parameters"
                            },
                            next_params: {
                                type: ["object", "null"],
                                description: "Next page parameters"
                            }
                        }
                    },
                    items: {
                        type: "array",
                        description: "List of posts",
                        items: {
                            type: "object",
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

interface Post {
    content: string;
    post_key: string;
    created_at: number;
    photos: Photo[];
    comment_count: number;
    author: Author;
}

interface Paging {
    previous_params: any | null;
    next_params: any | null;
}

interface PostsResponse {
    result_code: number;
    result_data: {
        paging: Paging;
        items: Post[];
    };
}

export async function handleToolCall(band_key: string, locale: string, after?: string, limit?: number) {
    const params: Record<string, any> = { band_key, locale };
    if (after) params.after = after;
    if (limit) params.limit = limit;

    const postsData = await bandApiClient.get<PostsResponse>('/v2/band/posts', params);
    return {
        content: [{
            type: "text",
            text: JSON.stringify(postsData, null, 2)
        }]
    };
}
