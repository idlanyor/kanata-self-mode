import { createSticker, StickerTypes } from "wa-sticker-formatter";
import { withPluginHandling } from "../../helper/pluginUtils.js";

export const description = "Sticker maker";
export const handler = "s"
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {

  if (!Buffer.isBuffer(attf)) {
    if (!m.message?.conversation && !m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
        return await sock.sendMessage(id, { text: 'Kirim/reply gambar dengan caption s' });
    }
  }

  await withPluginHandling(sock, m.key, id, async () => {
    const stickerOption = {
      pack: "Antidonasi Inc.",
      author: "Antidonasi Inc.Bot",
      type: StickerTypes.ROUNDED,
      quality: 100
    }

    const generateSticker = await createSticker(attf, stickerOption);
    await sock.sendMessage(id, { sticker: generateSticker }, { quoted:m });
  });
};
