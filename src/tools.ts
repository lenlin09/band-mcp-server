import { Tool } from '@modelcontextprotocol/sdk/types.js';
import profile from './profile/index.js';
import bands from './bands/index.js';

export const bandTools: Tool[] = [
  profile.ToolDefinition,
  bands.ToolDefinition
];

export function handleToolCall(name: string, args: any) {
  try {
    switch (name) {
      case "get_band_user_profile":
        return profile.handleToolCall(args);
      case "get_user_bands":
        return bands.handleToolCall();
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
