
import { withPluginHandling } from "../../helper/pluginUtils.js";

export const handler = 'deepseek'
export const description = "Deepseek AI Provided by Ryzendesu";
export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        sock.sendMessage(id, {
            text: "prefix *deepseek* Tanyakan sesuatu kepada AI DeepSeek\n contoh : deepseek What is Quantum Physics mean?"

        })
        return
    }
    await withPluginHandling(sock, m.key, id, async () => {
        const prompt = "be a helpfull assistant"
        const response = await fetch(`https://api.ryzendesu.vip/api/ai/deepseek?text=${psn}&prompt=${prompt}`);

        const data = await response.json();


        await sock.sendMessage(id, { text: data.answer });
    });
};
