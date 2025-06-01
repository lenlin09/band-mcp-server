import { Tool } from '@modelcontextprotocol/sdk/types.js';
import profile from './profile/index.js';

export const bandTools: Tool[] = [
  profile.ToolDefinition
];

export function handleToolCall(name: string, args: any) {
  try {
    switch (name) {
      case "get_band_user_profile":
        return profile.handleToolCall(args);
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
