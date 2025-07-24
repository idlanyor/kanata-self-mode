import { llamaGroq as llamaGroqAI } from "../../lib/ai.js";
import { createAIHandler } from "./_helper.js";

export const description = "AI GPT 3.5 provided by *Groq x Facebook Meta*";
export const handler = "llama";

const llamaGroq = async ({ prompt }) => {
    return await llamaGroqAI(prompt);
}

export default createAIHandler(llamaGroq, handler, "siapa presiden indonesia saat ini?");

