import fetch from 'node-fetch';
import { handleEmptyPrompt, withPluginHandling } from "../../helper/pluginUtils.js";

export const handler = 'short';
export const description = 'Memendekkan URL menggunakan is.gd';

export default async ({ sock, m, id, psn, sender }) => {
    if (!psn) {
        await handleEmptyPrompt(sock, id, "short", "https://google.com atau .short https://google.com googleku");
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        const args = psn.split(' ');
        const url = args[0];
        const customAlias = args[1];

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            throw new Error('URL tidak valid! URL harus dimulai dengan http:// atau https://');
        }

        let apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`;
        
        // Jika ada custom alias
        if (customAlias) {
            apiUrl += `&shorturl=${encodeURIComponent(customAlias)}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.errorcode) {
            throw new Error(data.errormessage);
        }

        const message = `╭─「 *URL SHORTENER* 」\n` +
                        `├ *Original URL:* \n` +
                        `├ ${url}\n` +
                        `├ \n` +
                        `├ *Shortened URL:* \n` +
                        `├ ${data.shorturl}\n` +
                        `╰──────────────────\n\n` +
                        `_Powered by is.gd_`;

        await sock.sendMessage(id, {
            text: message,
            contextInfo: {
                externalAdReply: {
                    title: '乂 URL Shortener 乂',
                    body: 'Powered by is.gd',
                    thumbnailUrl: 'https://files.catbox.moe/2wynab.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VagADOLLSmbaxFNswH1m',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    });
}; 