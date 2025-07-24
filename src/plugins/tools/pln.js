import { handleEmptyPrompt, withPluginHandling } from "../../helper/pluginUtils.js";
import { getPlnInfo } from "../../helper/plnApi.js";

export const handler = 'pln';
export const description = 'Cek informasi PLN';

export default async ({ sock, m, id, psn }) => {
  if (!psn) {
    return sock.sendMessage(id, {
      text: '⚠️ Mohon masukkan ID Pelanggan PLN.\n\nContoh: .pln 56213840202',
    });
  }

  await withPluginHandling(sock, m.key, id, async () => {
    const data = await getPlnInfo(psn);

    if (data.success) {
      let reply = `*Informasi PLN untuk ID ${psn}*\n\n`;
      reply += `*Nomor Meter:* ${data.data.meter_number}\n`;
      reply += `*ID Pelanggan:* ${data.data.subscriber_id}\n`;
      reply += `*Nama Pelanggan:* ${data.data.subscriber_name}\n`;
      reply += `*Segmen Daya:* ${data.data.segment_power}\n`;

      sock.sendMessage(id, { text: reply });
    } else {
      sock.sendMessage(id, { text: 'Gagal mengambil informasi PLN. ID Pelanggan mungkin tidak valid.' });
    }
  });
};
