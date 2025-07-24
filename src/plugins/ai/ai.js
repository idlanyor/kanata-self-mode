import { gpt4Hika } from "../../lib/ai.js";
import { createAIHandler } from "./_helper.js";

export const description = "🤖 *AI GPT 4* disediakan oleh *FastURL*";
export const handler = "ai";

export default createAIHandler(gpt4Hika, handler, "siapa presiden Indonesia saat ini?");

