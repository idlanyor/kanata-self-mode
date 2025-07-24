import fetch from 'node-fetch';
import { handleEmptyPrompt, withPluginHandling } from "../../helper/pluginUtils.js";

export const handler = 'npm';
export const description = 'Cari info package dari npmjs.com';

export default async ({ sock, m, id, psn }) => {
    if (!psn) {
        await handleEmptyPrompt(sock, id, "npm", "axios");
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(psn)}`);
        
        if (res.status === 404) {
            return await sock.sendMessage(id, { text: `❌ Package *${psn}* gak ketemu di NPM bos. Mungkin typo kek cinta dia ke kamu 😔` });
        }

        const data = await res.json();
        const latestVersion = data['dist-tags']?.latest || 'unknown';
        const latestData = data.versions[latestVersion];

        const responseText = `📦 *${data.name}* — v${latestVersion}\n` +
                             `📝 *Deskripsi:* ${data.description || 'Gak ada deskripsinya, misterius banget 😶'}\n` +
                             `👤 *Author:* ${latestData.author?.name || 'Gak tau siapa, mungkin alien 👽'}\n` +
                             `📅 *Diperbarui:* ${new Date(data.time[latestVersion]).toLocaleString()}\n` +
                             `🔗 *Link:* https://www.npmjs.com/package/${data.name}\n\n` +
                             `📥 *Install:* \`npm i ${data.name}\``;

        await sock.sendMessage(id, {
            text: responseText,
            contextInfo: {
                externalAdReply: {
                    title: `📦 ${data.name} - NPM Package`,
                    body: 'Klik buat lihat di npmjs.com',
                    thumbnailUrl: 'https://raw.githubusercontent.com/npm/logos/master/npm%20logo/npm-logo-red.png',
                    sourceUrl: `https://www.npmjs.com/package/${data.name}`,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                }
            }
        });
    });
};

export const help = {
    name: 'npm',
    description: 'Cari info package dari npmjs.com',
    usage: '.npm <nama-package>'
};
