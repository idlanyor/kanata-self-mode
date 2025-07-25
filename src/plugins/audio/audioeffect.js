import { handleNoAttachment, withPluginHandling, processMediaWithFFmpeg } from "../../helper/pluginUtils.js";

export const handler = ["ae", "audioeffect"];
export const description = `🎵 Audio effects:
*.ae nc* = nightcore
*.ae bass* = bass boosted
*.ae robot* = robot voice
*.ae slow* = slow motion
*.ae fast* = fast motion
*.ae reverb* = reverb effect
*.ae echo* = echo effect`;

export default async ({ sock, m, id, psn, sender, noTel, attf }) => {
    if (!Buffer.isBuffer(attf)) {
        await handleNoAttachment(sock, id, "ae", "audio/voice note");
        return;
    }

    if (!psn) {
        await sock.sendMessage(id, {
            text: "🎵 Pilih efek yang mau dipakai ya bestie!\n\n" + description
        });
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        await sock.sendMessage(id, { text: '🎧 Bentar ya bestie, lagi proses... ⏳' });

        let ffmpegCommand;
        let effectName;
        const effect = psn.toLowerCase().trim();

        switch (effect) {
            case 'nc':
            case 'nightcore':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "asetrate=44100*1.25,aresample=44100,atempo=1" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Nightcore";
                break;

            case 'bass':
            case 'bass boost':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "bass=g=15:frequency=110:width_type=h" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Bass Boosted";
                break;

            case 'robot':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)',aresample=44100" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Robot Voice";
                break;

            case 'slow':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "atempo=0.75" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Slow Motion";
                break;

            case 'fast':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "atempo=1.5" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Fast Motion";
                break;

            case 'reverb':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "aecho=0.8:0.9:1000:0.3" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Reverb";
                break;

            case 'echo':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "aecho=0.8:0.88:60:0.4" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Echo";
                break;

            default:
                throw new Error("Efek tidak tersedia!\n\n" + description);
        }

        const audioBuffer = await processMediaWithFFmpeg(attf, ffmpegCommand, 'mp3');
        const fileSize = audioBuffer.length / (1024 * 1024); // Size in MB

        await sock.sendMessage(id, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            ptt: false,
            caption: `✨ ${effectName} Effect (${fileSize.toFixed(2)}MB) 🎵`
        }, { quoted:m });
    });
}; 