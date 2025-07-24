import { mediafire } from '../../lib/scraper/mediafire.js';
import { handleEmptyPrompt, withPluginHandling } from "../../helper/pluginUtils.js";

export const description = "MediaFire Downloader";
export const handler = "mf";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await handleEmptyPrompt(sock, id, "mf", "https://www.mediafire.com/file/xxx");
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        await sock.sendMessage(id, {
            text: `📥 *Memproses Download*\n\n` +
                `Link: ${psn}\n` +
                `Status: Mengunduh...\n`
        });

        const result = await mediafire(psn);

        if (!result.status) {
            throw new Error(result.error);
        }

        const { filename, filesize, downloadUrl } = result.data;

        // Kirim info file
        await sock.sendMessage(id, {
            text: `✅ *File Ditemukan*\n\n` +
                `📂 Nama: ${filename}\n` +
                `📊 Ukuran: ${filesize}\n` +
                `⏳ Sedang mengirim file...`
        });

        // Kirim file
        await sock.sendMessage(id, {
            document: { url: downloadUrl },
            fileName: filename,
            mimetype: 'application/octet-stream'
        }, { quoted: m });
    });
};
