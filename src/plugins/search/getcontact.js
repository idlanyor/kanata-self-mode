import fs from 'fs';
import path from 'path';
import { withPluginHandling } from "../../helper/pluginUtils.js";
import { hikaru } from "../../helper/hikaru.js";

// Simpan data penggunaan di file JSON
const usageFile = path.join(process.cwd(), 'getcontact_usage.json');

// Fungsi untuk memuat data penggunaan
const loadUsage = () => {
    try {
        if (fs.existsSync(usageFile)) {
            return JSON.parse(fs.readFileSync(usageFile));
        }
        return {};
    } catch (error) {
        return {};
    }
};

// Fungsi untuk menyimpan data penggunaan
const saveUsage = (data) => {
    fs.writeFileSync(usageFile, JSON.stringify(data, null, 2));
};

// Fungsi untuk mereset penggunaan harian
const resetDailyUsage = () => {
    const usage = loadUsage();
    const today = new Date().toISOString().split('T')[0];
    
    Object.keys(usage).forEach(userId => {
        if (usage[userId].lastReset !== today) {
            usage[userId].count = 0;
            usage[userId].lastReset = today;
        }
    });
    
    saveUsage(usage);
};

export const handler = 'getcontact'
export const description = 'Retrieve Tags & User Information From Getcontact'
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {
    if (!psn) return await sock.sendMessage(id, { text: 'Silahkan Masukkan nomor telepon dengan format `.getcontact 62xxxx`' })
    
    // Cek penggunaan harian
    const usage = loadUsage();
    const today = new Date().toISOString().split('T')[0];
    
    // Reset penggunaan harian jika perlu
    resetDailyUsage();
    
    // Cek apakah user adalah owner (ganti dengan ID owner yang sesuai)
    const isOwner = sender === '6281234567890@s.whatsapp.net'; // Ganti dengan ID owner
    
    if (!isOwner) {
        if (!usage[sender]) {
            usage[sender] = { count: 0, lastReset: today };
        }
        
        if (usage[sender].count >= 2) {
            return await sock.sendMessage(id, { 
                text: 'Maaf, Anda telah mencapai batas penggunaan harian (2x). Silakan coba lagi besok.' 
            });
        }
    }
    
    await withPluginHandling(sock, m.key, id, async () => {
        // Format nomor telepon
        let formattedNumber = psn
        if (psn.startsWith('@')) {
            formattedNumber = psn.substring(1)
        }
        if (psn.startsWith('08')) {
            formattedNumber = '62' + psn.substring(1)
        }
        
        const { data } = await hikaru(`tool/getcontact?number=${formattedNumber}`, {
            headers: {
                'accept': 'application/json'
            }
        })
        const text = `\nUser Data:\n- Name: ${data.result.userData.name}\n- Phone: ${data.result.userData.phone}\n- Provider: ${data.result.userData.provider}\n\nTags:\n- ${data.result.tags.join('\n- ')}\n`;
        
        // Update penggunaan jika bukan owner
        if (!isOwner) {
            usage[sender].count++;
            saveUsage(usage);
        }
        
        await sock.sendMessage(id, { text })
    });
};
