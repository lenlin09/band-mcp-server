import { Tool } from '@modelcontextprotocol/sdk/types.js';
import profile from './profile/index.js';
import bands from './bands/index.js';
import posts from './posts/index.js';

export const bandTools: Tool[] = [
  profile.ToolDefinition,
  bands.ToolDefinition,
  posts.ToolDefinition
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
