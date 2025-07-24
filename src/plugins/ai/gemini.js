import { gemini as geminiAI } from "../../lib/ai.js";
import { createAIHandler } from "./_helper.js";

export const description = "AI Gemini provided by *Google Inc*";
export const handler = "gemini";

const gemini = async ({ prompt }) => {
    return await geminiAI(prompt);
}

export default createAIHandler(gemini, handler, "siapa presiden indonesia saat ini?");
