import { createAIHandler } from "./_helper.js";

export const handler = "summary";
export const description = "📝 Rangkum teks panjang jadi singkat dan padat";

const promptFn = (psn) => {
    return `Tolong rangkum teks ini dalam poin-poin penting (maksimal 5 poin):

${psn}

Format output:
📌 Rangkuman:
• [poin 1]
• [poin 2]
dst.

💡 Kata Kunci: [kata kunci penting]`;
}

const summary = async ({ prompt }) => {
    const model = globalThis.genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
        generationConfig: {
            temperature: 0.3,
            topK: 20,
            topP: 0.8
        }
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export default createAIHandler(summary, handler, "[teks panjang]", promptFn); 