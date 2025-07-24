import { mixtralGroq as mixtralGroqAI } from "../../lib/ai.js";
import { createAIHandler } from "./_helper.js";

export const description = "AI Mixtral provided by *Groq x Mixtral*";
export const handler = "mistral";

const mixtralGroq = async ({ prompt }) => {
    return await mixtralGroqAI(prompt);
}

export default createAIHandler(mixtralGroq, handler, "siapa presiden indonesia saat ini?");

