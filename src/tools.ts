import { Tool } from '@modelcontextprotocol/sdk/types.js';
import profile from './profile/index.js';
import bands from './bands/index.js';
import posts from './posts/index.js';
import post from './post/index.js';
import comments from './comments/index.js';
import permissions from './permissions/index.js';
import albums from './albums/index.js';
import photos from './photos/index.js';
import writeComment from './writeComment/index.js';
import writePost from './writePost/index.js';
import removePost from './removePost/index.js';
import removeComment from './removeComment/index.js';

export const bandTools: Tool[] = [
  profile.ToolDefinition,
  bands.ToolDefinition,
  posts.ToolDefinition,
  post.ToolDefinition,
  comments.ToolDefinition,
  permissions.ToolDefinition,
  albums.ToolDefinition,
  photos.ToolDefinition,
  writeComment.ToolDefinition,
  writePost.ToolDefinition,
  removePost.ToolDefinition,
  removeComment.ToolDefinition
];

export function handleToolCall(name: string, args: any) {
  try {
    switch (name) {
      case "get_user_information":
        return profile.handleToolCall(args.band_key);
      case "get_bands":
        return bands.handleToolCall();
      case "get_posts":
        return posts.handleToolCall(args.band_key, args.locale, args.after, args.limit);
      case "get_post":
        return post.handleToolCall(args.band_key, args.post_key);
      case "get_comments":
        return comments.handleToolCall(args.band_key, args.post_key, args.sort);
      case "permissions":
        return permissions.handleToolCall(args.band_key, args.permissions);
      case "get_albums":
        return albums.handleToolCall(args.band_key);
      case "get_photos":
        return photos.handleToolCall(args.band_key, args.photo_album_key);
      case "write_comment":
        return writeComment.handleToolCall(args.band_key, args.post_key, args.body);
      case "write_post":
        return writePost.handleToolCall(args.band_key, args.content, args.do_push);
      case "remove_post":
        return removePost.handleToolCall(args.band_key, args.post_key);
      case "remove_comment":
        return removeComment.handleToolCall(args.band_key, args.post_key, args.comment_key);
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
