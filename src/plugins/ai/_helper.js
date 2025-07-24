import { handleEmptyPrompt, withPluginHandling } from "../../helper/pluginUtils.js";

export function createAIHandler(aiFunction, handlerName, emptyPromptExample, promptFn = null) {
    return async ({ sock, m, id, psn }) => {
        if (psn.trim() === '') {
            await handleEmptyPrompt(sock, id, handlerName, emptyPromptExample);
            return;
        }

        await withPluginHandling(sock, m.key, id, async () => {
            const prompt = promptFn ? promptFn(psn) : psn;
            const text = await aiFunction({ prompt, id });
            await sock.sendMessage(id, { text });
        });
    };
}