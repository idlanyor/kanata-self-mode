import { uploadGambar } from "../../helper/uploader.js";
import { copilotHika } from "../../lib/ai.js";
import { withPluginHandling } from "../../helper/pluginUtils.js";

export const handler = 'copilot'
export const description = 'Realtime Copilot AI Provided by FastURL'
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (psn.trim() === '') {
        sock.sendMessage(id, {
            text: "Gunakan prefix *copilot* untuk bertanya apa saja ke AI(support gambar juga).\nContoh: _*copilot siapa presiden Indonesia saat ini?*_\n\n",
        });
        return;
    }
    await withPluginHandling(sock, m.key, id, async () => {
        const result = await copilotHika({ prompt: psn, id, imageUrl: Buffer.isBuffer(attf) ? await uploadGambar(attf) : null });
        await sock.sendMessage(id, { text: result.text });
        if (result.images.length > 0) {
            result.images.forEach(async (img) => {
                await sock.sendMessage(id, { image: { url: img.url } })
            });
        }
    });
};
