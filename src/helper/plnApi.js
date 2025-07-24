import axios from 'axios';

export const getPlnInfo = async (subscriberId) => {
    try {
        const options = {
            method: 'GET',
            url: `${globalThis.apiHelper.pln.baseUrl}/${subscriberId}/token_pln`,
            headers: {
                'x-rapidapi-key': globalThis.apiHelper.pln.apiKey,
                'x-rapidapi-host': 'cek-id-pln-pasca-dan-pra-bayar.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error in PLN API request:', error);
        throw new Error('Terjadi kesalahan saat menghubungi server PLN.');
    }
};