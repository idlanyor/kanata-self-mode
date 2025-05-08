import pkg from '@fizzxydev/baileys-pro';
const { generateWAMessageFromContent, proto } = pkg;
export const handler = 'tesint'
export const description = ''
export default async ({ sock, m, id, psn, sender, noTel, caption, attf }) => {

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "Fizzxy Dev"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "Bot"
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: "Igna",
                        subtitle: "test",
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "single_select",
                                "buttonParamsJson": "{\"title\":\"title\",\"sections\":[{\".menu\":\".play dj webito\",\"highlight_label\":\"label\",\"rows\":[{\"header\":\"header\",\"title\":\"title\",\"description\":\"description\",\"id\":\"id\"},{\"header\":\"header\",\"title\":\"title\",\"description\":\"description\",\"id\":\"id\"}]}]}"
                            },
                            {
                                "name": "cta_reply",
                                "buttonParamsJson": "{\"display_text\":\"quick_reply\",\"id\":\"message\"}"
                            },
                            {
                                "name": "cta_url",
                                "buttonParamsJson": "{\"display_text\":\"url\",\"url\":\"https://www.google.com\",\"merchant_url\":\"https://www.google.com\"}"
                            },
                            {
                                "name": "cta_call",
                                "buttonParamsJson": "{\"display_text\":\"call\",\"id\":\"message\"}"
                            },
                            {
                                "name": "cta_copy",
                                "buttonParamsJson": "{\"display_text\":\"copy\",\"id\":\"123456789\",\"copy_code\":\"message\"}"
                            },
                            {
                                "name": "cta_reminder",
                                "buttonParamsJson": "{\"display_text\":\"Recordatorio\",\"id\":\"message\"}"
                            },
                            {
                                "name": "cta_cancel_reminder",
                                "buttonParamsJson": "{\"display_text\":\"cta_cancel_reminder\",\"id\":\"message\"}"
                            },
                            {
                                "name": "address_message",
                                "buttonParamsJson": "{\"display_text\":\"address_message\",\"id\":\"message\"}"
                            },
                            {
                                "name": "send_location",
                                "buttonParamsJson": ""
                            }
                        ],
                    })
                })
            }
        }
    }, {})

    return sock.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
};
