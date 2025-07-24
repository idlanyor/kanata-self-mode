import { googleLyrics } from "../../lib/scraper/lyrics.js";
import { handleEmptyPrompt, withPluginHandling } from "../../helper/pluginUtils.js";

export const handler = 'lirik';
export const description = 'Get Lyrics by title';

export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (!psn) {
        await handleEmptyPrompt(sock, id, "lirik", "judul lagu");
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        const response = await googleLyrics(psn);
        const message = `🎶 *${response.title}* 🎶\n` +
                        `👤 *Artist:* ${response.artist}\n` +
                        `📀 *Album:* ${response.album}\n` +
                        `🎵 *Genre:* ${response.genre}\n` +
                        `��� *Released:* ${response.released}\n\n` +
                        `🔗 *Available on:* ${response.platform.join(", ")}\n\n` +
                        `📝 *Lyrics:*\n` +
                        "```\n${response.lyrics}\n```\n";
        await sock.sendMessage(id, { text: message });
    })
};
