import { handleNoAttachment, withPluginHandling, processMediaWithFFmpeg } from "../../helper/pluginUtils.js";

export const handler = ["ae", "audioeffect"];
export const description = `🎵 Audio effects:
*.ae nc* = nightcore
*.ae bass* = bass boosted
*.ae robot* = robot voice
*.ae slow* = slow motion
*.ae fast* = fast motion
*.ae reverb* = reverb effect
*.ae echo* = echo effect
*.ae 8d* = 8D Audio
*.ae vaporwave* = vaporwave
*.ae earrape* = earrape
*.ae chipmunk* = chipmunk
*.ae vibrato* = vibrato
*.ae blown* = blown bass
*.ae deep* = deep voice`;

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
            
            case '8d':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "apulsator=hz=0.125,stereotools=phaseinv=1:mode=lr>rr" -b:a 192k "OUTPUT_FILE"`;
                effectName = "8D Audio";
                break;

            case 'vaporwave':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "asetrate=44100*0.8,aresample=44100,atempo=0.8" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Vaporwave";
                break;

            case 'earrape':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "acrusher=level_in=8:level_out=18:bits=8:mode=log:aa=1" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Earrape";
                break;

            case 'chipmunk':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "asetrate=44100*1.4,aresample=44100,atempo=0.8" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Chipmunk";
                break;

            case 'vibrato':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "vibrato=f=6.5:d=0.5" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Vibrato";
                break;

            case 'blown':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "bass=g=25:frequency=40:width_type=h,dynaudnorm" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Blown Bass";
                break;

            case 'deep':
                ffmpegCommand = `ffmpeg -i "INPUT_FILE" -af "asetrate=44100*0.8,aresample=44100,atempo=1.1" -b:a 192k "OUTPUT_FILE"`;
                effectName = "Deep Voice";
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