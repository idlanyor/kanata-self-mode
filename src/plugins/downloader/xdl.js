import { withPluginHandling } from "../../helper/pluginUtils.js";
import { hikaru } from "../../helper/hikaru.js";

export const description = "🐦 Simple Twitter/X Video Downloader by *FastURL*";
export const handler = "xd";

export default async ({ sock, m, id, psn }) => {
    if (psn === '') {
        await sock.sendMessage(id, {
            text: '📥 *Format salah bro!*\n\nKetik:\n`xd <url>`\n\nContoh:\n`xd https://x.com/i/status/1823260489704669415`'
        });
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        const res = await hikaru(`downup/twdown/simple?url=${encodeURIComponent(psn)}`, {
            headers: { 
                accept: 'application/json'
            }
        });

        const result = res.data?.result;

        if (!result?.videohd && !result?.videosd) {
            await sock.sendMessage(id, {
                text: `❌ *Gagal:* Video nggak ditemukan di URL itu 😢`
            });
            return;
        }

        // Kirim thumbnail (opsional)
        if (result.thumb) {
            await sock.sendMessage(id, {
                image: { url: result.thumb },
                caption: `📸 *Thumbnail Video*\n\n📝 ${result.desc || 'Tanpa deskripsi'}`
            });
        }

        // Kirim video (HD kalau ada, fallback ke SD)
        const videoUrl = result.videohd || result.videosd;
        await sock.sendMessage(id, {
            video: { url: videoUrl },
            caption: `🎞️ *Video berhasil diunduh!*\n📝 ${result.desc || 'Tanpa deskripsi'}\n\n👨‍💻 Antidonasi Inc.`
        });
    });
};
