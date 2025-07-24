import { handleEmptyPrompt, withPluginHandling } from "../../helper/pluginUtils.js";
import { hikaru } from "../../helper/hikaru.js";
import { yutub } from "../../lib/downloader.js";

export const description = "YouTube Video Downloader provided by *Roy*";
export const handler = "yd";

export default async ({ sock, m, id, psn, sender, noTel, caption }) => {
    if (psn === '') {
        await handleEmptyPrompt(sock, id, "yd", "https://www.youtube.com/watch?v=Ww4Ua --480");
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        // Extract quality flag if present
        let quality = '480'; // default quality
        const qualityMatch = psn.match(/--(\d+)/);
        if (qualityMatch) {
            quality = qualityMatch[1];
            psn = psn.replace(/--\d+/, '').trim();
        }

        // Call FastURL API
        // const response = await hikaru(`downup/ytmp4`, {
        //     params: {
        //         url: psn,
        //         quality: quality,
        //         server: 'server2'
        //     },
        //     headers: {
        //         'accept': 'application/json'
        //     }
        // });

        const result = await yutub(psn);
        
        caption = '*🎬 Hasil Video YouTube:*'
        
        caption += '📛 *Title:* ' + `*${result.title}*
`;
        caption += '⏱️ *Duration:* ' + `*${result.duration}*
`;
        
        await sock.sendMessage(id, {
            document: { url: result.video },
            mimetype: 'video/mp4',
            fileName: `${result.title}.mp4`,
            caption: caption
        }, { quoted:m });
    });
};
