import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const handleEmptyPrompt = async (sock, id, commandName, example) => {
    await sock.sendMessage(id, {
        text: `Gunakan prefix *${commandName}* untuk bertanya sesuatu.\nContoh: *${commandName} ${example}*`,
    });
};

export const handleError = async (sock, id, error) => {
    console.error("Plugin Error:", error);
    await sock.sendMessage(id, {
        text: `⚠️ *Ups, terjadi kesalahan*:\n${error.message || "Terjadi kesalahan yang tidak diketahui."}`,
    });
};

export const sendReaction = async (sock, key, emoji) => {
    await sock.sendMessage(key.remoteJid, { react: { text: emoji, key: key } });
};

export const withPluginHandling = async (sock, messageKey, chatId, pluginLogic) => {
    try {
        await sendReaction(sock, messageKey, '⏳');
        await pluginLogic();
        await sendReaction(sock, messageKey, '✅');
    } catch (error) {
        await handleError(sock, chatId, error);
        await sendReaction(sock, messageKey, '❌');
    }
};

export const handleNoAttachment = async (sock, id, commandName, mediaType = "media") => {
    await sock.sendMessage(id, {
        text: `Kirim atau balas ${mediaType} dengan caption *${commandName}* untuk memprosesnya.`,
    });
};
export const handleNoImage = async (sock, id, commandName, mediaType = "media") => {
    await sock.sendMessage(id, {
        text: `Kirim atau balas ${mediaType} dengan caption *${commandName}* untuk memprosesnya.`,
    });
};

export const processMediaWithFFmpeg = async (attf, ffmpegCommand, outputExtension = 'mp3') => {
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const timestamp = Date.now();
    const inputFile = path.join(tempDir, `input_${timestamp}.tmp`); // Use .tmp for generic input
    const outputFile = path.join(tempDir, `output_${timestamp}.${outputExtension}`);
    
    fs.writeFileSync(inputFile, attf);

    try {
        await execAsync(ffmpegCommand.replace('INPUT_FILE', inputFile).replace('OUTPUT_FILE', outputFile));

        if (!fs.existsSync(outputFile)) {
            throw new Error('Output file not created by FFmpeg');
        }

        const outputBuffer = fs.readFileSync(outputFile);
        return outputBuffer;
    } finally {
        // Cleanup
        if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
        if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    }
};

