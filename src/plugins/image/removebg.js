import { uploadGambar2 } from "../../helper/uploader.js";
import { removeBg } from "../../lib/mediaMsg/image.js";
import { handleNoImage, withPluginHandling } from "../../helper/pluginUtils.js";
import { hikaru } from "../../helper/hikaru.js";

export const handler = "removebg";
export const description = "✨ Ubah latar belakang gambar 📸";

export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (!Buffer.isBuffer(attf)) {
        await handleNoImage(sock, id, "removebg");
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        await sock.sendMessage(id, { text: `⏱️ Bentar, gambarmu sedang diproses` });

        let response = await removeBg(attf, psn);
        const gambarBurik = await uploadGambar2(response);
        const { url } = await hikaru('aiimage/imgenlarger?url=' + gambarBurik, {
            headers: {
                'accept': 'application/json'
            }
        }).then(res => res.data);

        await sock.sendMessage(m.key.remoteJid, {
            document: { url },
            mimetype: 'image/png',
            fileName: `Antidonasi Inc.Ghoib-${Math.floor(Math.random(2 * 5))}.png`
        }, { quoted:m });
    });
};
