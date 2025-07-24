import { threadsDl } from "../../lib/downloader.js";
import { withPluginHandling } from "../../helper/pluginUtils.js";

export const handler = 'tdd'
export const description = 'Threads Video Downloader'
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (psn == "") {
        await sock.sendMessage(id, { text: 'linknya ga ada cuk' })
        return
    }
    await withPluginHandling(sock, m.key, id, async () => {
        const { downloadUrl: url, author, title } = await threadsDl(psn)
        caption = `${title} By : ${author}`
        await sock.sendMessage(id, { video: { url, caption } })
    });
};
