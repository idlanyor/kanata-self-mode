import { withPluginHandling } from "../../helper/pluginUtils.js";
import { hikaru } from "../../helper/hikaru.js";

export const description = "✨ Downloader Instagram Video & Image provided by *FastURL*";
export const handler = "ig";

export default async ({ sock, m, id, psn }) => {
    if (psn === '') {
        await sock.sendMessage(id, {
            text: '📹 *Gunakan format:* \n\n`ig <url>`\n\nContoh:\n`ig https://www.instagram.com/reel/DF4oOlavxSq/`'
        });
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        const res = await hikaru(`downup/igdown/simple?url=${encodeURIComponent(psn)}`, {
            headers: {
                accept: 'application/json'
            }
        });

        const result = res.data?.result;

        if (!result?.status || !result?.data?.length) {
            await sock.sendMessage(id, {
                text: `❌ *Gagal:* Tidak ada data ditemukan atau URL tidak valid.`
            });
            return;
        }

        for (const item of result.data) {
            if (item.url) {
                if (item.url.includes('/thumb?')) {
                    await sock.sendMessage(id, {
                        image: { url: item.url },
                        caption: '🖼️ *Gambar berhasil diunduh!*\n\n👨‍💻 By: Antidonasi Inc. ~201~'
                    });
                } else {
                    await sock.sendMessage(id, {
                        video: { url: item.url },
                        caption: '🎥 *Video berhasil diunduh!*\n\n👨‍💻 By: Antidonasi Inc. ~201~'
                    });
                }
            }
        }
    });
};
