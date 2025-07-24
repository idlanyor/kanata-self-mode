import { createAIHandler } from "./_helper.js";
import { withPluginHandling } from "../../helper/pluginUtils.js";

export const handler = "grammar";
export const description = "✍️ Perbaiki grammar dan tata bahasa";

const promptFn = (psn) => {
    return `Tolong periksa dan perbaiki grammar dari teks ini. Berikan:
1. Teks yang sudah diperbaiki
2. Penjelasan kesalahan
3. Saran perbaikan

Teks: "${psn}"`;
}

const grammar = async ({ prompt }) => {
    const model = globalThis.genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite"
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export default createAIHandler(grammar, handler, "I am go to school yesterday", promptFn); 