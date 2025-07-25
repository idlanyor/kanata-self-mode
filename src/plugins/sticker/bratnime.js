import { StickerTypes, createSticker } from "wa-sticker-formatter";

export const handler = 'bratnime'
export const description = 'Anime Brat Generator'
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (!psn) return m.reply('teksnya mana cik?')
    sock.sendMessage(id, { react: { text: '⏱️', key: m.key } })
    const { url } = await fetch(globalThis.hikaru.baseUrl + `maker/animbrat?text=${encodeURIComponent(psn)}&mode=image&position=center`, {
        headers: {
            'x-api-key': globalThis.hikaru.apiKey
        }
    }).then(res => res.json())
    const stickerOption = {
        pack: "Antidonasi Inc.Bot",
        author: "Roy",
        type: StickerTypes.FULL,
        quality: 100,
    }
    try {
        const generateSticker = await createSticker(url, stickerOption);
        await sock.sendMessage(id, { sticker: generateSticker })
        sock.sendMessage(id, { react: { text: '✅', key: m.key } })

    } catch (error) {
        console.log('Error creating sticker:', error);
        await sock.sendMessage(id, { text: `Error creating bratt\n Reason :\n ${error}` })
    }
};
