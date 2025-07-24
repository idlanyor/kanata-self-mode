import { withPluginHandling } from "../../helper/pluginUtils.js";

export const handler = 'cuaca';
export const description = 'Cek cuaca terkini dari nama kota';

export default async ({ sock, m, id, psn }) => {
    if (!psn) {
        await sock.sendMessage(id, {
            text: `⚠️ *Format salah!\n\nContoh: *.cuaca purbalingga*`
        });
        return;
    }

    await withPluginHandling(sock, m.key, id, async () => {
        const API_KEY = '48d0d41a45c0d9f4f20dc5547e2e74dc'; // Hati-hati bocor bang 😬
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(psn)}&appid=${API_KEY}&units=metric&lang=id`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            throw new Error(`Gagal ambil data cuaca untuk kota *${psn}*\nCek lagi nama kotanya ya bos.`);
        }

        const weather = data.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        const emoji = weather.main === 'Rain' ? '🌧️'
                     : weather.main === 'Clouds' ? '☁️'
                     : weather.main === 'Clear' ? '☀️'
                     : '🌦️';

        const text = `
${emoji} *Cuaca di ${data.name}, ${data.sys.country}*

🌡️ Suhu: ${data.main.temp}°C
🥵 Terasa seperti: ${data.main.feels_like}°C
💧 Kelembapan: ${data.main.humidity}%
🌥️ Cuaca: ${weather.description}
🌬️ Angin: ${data.wind.speed} m/s
📍 Koordinat: ${data.coord.lat}, ${data.coord.lon}
🕒 Zona Waktu: UTC${data.timezone / 3600 >= 0 ? '+' : ''}${data.timezone / 3600}

Powered by OpenWeatherMap
        `.trim();

        await sock.sendMessage(id, {
            image: { url: iconUrl },
            caption: text
        });
    });
};

