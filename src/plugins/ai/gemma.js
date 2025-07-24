import { gemmaGroq as gemmaGroqAI } from "../../lib/ai.js";
import { createAIHandler } from "./_helper.js";

export const description = "AI Gemma provided by *Groq x Google*";
export const handler = "gemma";

const gemmaGroq = async ({ prompt }) => {
    return await gemmaGroqAI(prompt);
}

export default createAIHandler(gemmaGroq, handler, "siapa presiden indonesia saat ini?");

