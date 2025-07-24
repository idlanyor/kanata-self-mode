import { mixtralGroq as mixtralGroqAI } from "../../lib/ai.js";
import { createAIHandler } from "./_helper.js";

export const description = "AI Mixtral7B provided by *Mixtral AI*";
export const handler = "mixtral";

const mixtralGroq = async ({ prompt }) => {
    return await mixtralGroqAI(prompt);
}

export default createAIHandler(mixtralGroq, handler, "siapa presiden indonesia saat ini?");

