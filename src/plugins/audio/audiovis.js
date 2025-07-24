import { handleNoAttachment, withPluginHandling } from "../../helper/pluginUtils.js";
import { processMediaWithFFmpeg } from "../../helper/pluginUtils.js";

export const handler = ["audiovis", "av"];
export const description = "🎵 Visualisasi audio (pilih style: 1-3)\n*.av 1* = wave\n*.av 2* = bars\n*.av 3* = spectrum";

export default async ({ sock, m, id, psn, sender, noTel, attf }) => {
    if (!Buffer.isBuffer(attf)) {
        await handleNoAttachment(sock, id, "av", "audio/voice note");
        return;
    }

    let style = "1";
    if (psn && ["1", "2", "3"].includes(psn.trim())) {
        style = psn.trim();
    }

    await withPluginHandling(sock, m.key, id, async () => {
        await sock.sendMessage(id, { text: '🎨 Bentar ya bestie... ⏳' });

        const resolution = "480x270";
        const baseFilters = `scale=${resolution},format=yuv420p`;
        const videoCodecSettings = "-c:v libx264 -preset ultrafast -crf 28 -maxrate 800k -bufsize 1600k";
        const audioCodecSettings = "-c:a aac -b:a 96k";

        let ffmpegCommand;
        switch (style) {
            case "1":
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -filter_complex "[0:a]showwaves=s=${resolution}:mode=line:rate=15:colors=white[wave];[wave]${baseFilters}[v]" -map "[v]" -map 0:a ${videoCodecSettings} ${audioCodecSettings} -r 15 -g 30 -shortest -y "OUTPUT_FILE"`;
                break;
                
            case "2":
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -filter_complex "[0:a]showwaves=s=${resolution}:mode=cline:rate=15:colors=white[wave];[wave]${baseFilters}[v]" -map "[v]" -map 0:a ${videoCodecSettings} ${audioCodecSettings} -r 15 -g 30 -shortest -y "OUTPUT_FILE"`;
                break;
                
            case "3":
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -filter_complex "[0:a]showspectrum=s=${resolution}:mode=combined:color=rainbow:scale=log:slide=scroll:fps=15[spectrum];[spectrum]${baseFilters}[v]" -map "[v]" -map 0:a ${videoCodecSettings} ${audioCodecSettings} -r 15 -g 30 -shortest -y "OUTPUT_FILE"`;
                break;
        }

        const videoBuffer = await processMediaWithFFmpeg(attf, ffmpegCommand, 'mp4');
        const fileSize = videoBuffer.length / (1024 * 1024);
        
        const styleNames = {
            "1": "Wave",
            "2": "Bars",
            "3": "Spectrum"
        };

        await sock.sendMessage(id, {
            video: videoBuffer,
            caption: `✨ Visualisasi ${styleNames[style]} (${fileSize.toFixed(2)}MB) 🎵`,
            mimetype: 'video/mp4',
            gifPlayback: false,
        }, { 
            quoted:m,
            mediaUploadTimeoutMs: 1000 * 60
        });
    });
}; 