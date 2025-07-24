import { hikaru } from "../../helper/hikaru.js";
import { createAIHandler } from "./_helper.js";

export const description = "AI GPT 4o-mini provided by *FastURL*";
export const handler = "ai2";

const ai2 = async ({ prompt }) => {
    const { data } = await hikaru('aillm/gpt-4o-mini', {
        params: {
            ask: prompt
        }
    });
    return data.result;
}

export default createAIHandler(ai2, handler, "siapa presiden indonesia saat ini?");

