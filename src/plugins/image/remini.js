import { uploadGambar2 } from "../../helper/uploader.js";
import { handleNoImage, withPluginHandling } from "../../helper/pluginUtils.js";
import { hikaru } from "../../helper/hikaru.js";

export const handler = "remini";
export const description = "✨ Remini: Ubah gambar burik menjadi HD! 📸";

export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (!Buffer.isBuffer(attf)) {
        await handleNoImage(sock, id, "remini");
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        await sock.sendMessage(id, { text: `⏱️ Bentar, gambar burikmu sedang diproses` });

        const imageUrl = await uploadGambar2(attf);
        const { url } = await hikaru(`aiimage/upscale?imageUrl=${imageUrl}&resize=2`, {
            headers: {
                'accept': 'application/json'
            }
        }).then(res => res.data);

        await sock.sendMessage(id, {
            image: { url },
            caption: '📷 HD Image berhasil! Gambar burikmu telah dikonversi ke kualitas HD 🎉'
        }, { quoted:m });
    });
};
