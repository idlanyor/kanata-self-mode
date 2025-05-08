// variabel dasar
globalThis.owner = "Roynaldi";
globalThis.ownerNumber = ["62895395590009", "62"]
globalThis.botNumber = ""
globalThis.botMode = "self"
globalThis.botName = "Kanata"
globalThis.sessionName = 'kanata-bot'
globalThis.groupJid = '0@g.us'
globalThis.communityId = '0@g.us'
globalThis.newsLetterJid = '0@newsletter'
globalThis.newsLetterUrl = 'https://whatsapp.com/channel/0029VagADOLLSmbaxFNswH1m'
globalThis.kanataThumb = 'https://files.catbox.moe/2wynab.jpg'
globalThis.defaultProfilePic = 'https://files.catbox.moe/2wynab.jpg'
globalThis.ppUrl = 'https://files.catbox.moe/2wynab.jpg'
globalThis.kanataCover = 'https://files.catbox.moe/zpjs9i.jpeg'
globalThis.accessToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJ4NXQiOiJlX1lNbkc3dXNVbXJWVEhPSnhFQ1hKVW12eGsiLCJ6aXAiOiJERUYifQ.nsvbwIFKwXg7Vq9AtS0QE6dcoHXP-w5edohaorE2Eppr6HjewLu1MCvzb-1uamLcDscINy8nzrBPBAfXFhW5Ka_g8IVuZZ7YJLpo9GXOebtCjAFoAmjcN-IwuaXYbr1tf15VidUB82pLjRjO1Ln3gavWSa2duQHO6Rn0Q9ygFV94WUORIn4B0iEB0t7f5_-TJSRlrw24Fb1tafzBrdKFjXFGOd845o6MSlUumUZwPpL9op9vfT0b-DENIq1xhj4Xy7FmhyRTDzazxtorPrdfZdayExwrYoj2WH8U9ZGwBDuO5_KssHY4iGechb-t6xwqURLGl7mOSjRWq0ae5Ysl0A.zeQRO6d4dnZlrwr7MIRCLw.UjoZa-rjEgXlk2rrsFU7oHqeMTl5wE9Ho5E0EBLJwfmwFxId6mltBQrBR_oyNFvWQEROZI4SDzMovGhjE5n695y2_hsknHn4qpU5eHUWRindLLKUNX1pZzbZN11WYkoMYXniAWue2Go18U6NxdIj9hwvMT9Qw18VGNZZre0JV1lGwS1oAHHjRdBFR-WAIYrDqtj44HIq7937-l9h7jvQMBx6wir7cqofcoyiucAKyDldUiMi3vtKnlotKsSSH7pQznnvwpEM7IYsfa7c2v-5Fo7nLWLrt0Z19DiSjuxFSqreMuTbPDK-bdHksQasn_0SiffaJMy08AyUuxvnrgLJ0LuDOSPcoBOc-_gKsHqURNEA7V-LDGJYhey_wXvXXCjjFabDNpzMxs7RsqG8zgBPNU54su2TYHQbIVXm2jzkGFK6QNWyjrnUwpdcUfedAO2mDZwsS914415dB-zAOAFY320SBRLc1be1nnX0d5iuLvz6wwSt4z4F6ilv7zoedH8VYHk0i3AZQZ_uj0rzIluT3pAxxwpN_0aXOpTUst-FU5Zp3lxd0J2atTRYIvOBePvhZK_2anMQaWZrEi8z_RVSvrsf9-Huqrbl7EWqZnkc6A-rmDBYPbXrrcJ87ebJf0dKJl3XHGD0oVqyhhLYQtqvT8BMIGDiR-J-u93PKJXIE9y8V4RqvtCd3xMeaYrE6IAfUofryXsZhiv2z131qiv_ZUO7BqITlopVilynEQEMYIJ2phnynGGvdG0o4UY00hMtgI2N2Te7ugzDQBrHw2FOWAPJFdZvi2nEyMvahmlWGwI4F-GpjudYOiu676yYjVIBSPZplGqBoSkWyJvh39cYXHjrhquRn7zlL4NTtvA34dIPVum6TxL_moX1r0XO5KIUYjl9HSt7lO25aMWxOf7vmA38uquLfP6QLoJn_vhs36uIECzuSdnBb6-HNgXI5dC51gjV1nyoHzPKqwo5vwl2-sAUamX2Ky4qivW-xqeAX5WS1sHo9qfWaRhD2ESz5xDbraEjpncuWd7IFLmBUUnBbvlcvE8sfN0C_zwnOZUHgDCO6oB2luqL_1xvXTwAy1uOHktv1QfuGOEvaZSIctssOZ0Ri0ytNoJYahdyOC5onKElBLRYww9j7raqwml2sHRDhQ0eH9uWoQQqL9_FDitmoSRMwU_V4_CA4hxDh6f1agg06fkOjzeVKeCVwauHighPRTlxjYkYXU7w40l2aLx303FqOUavxrLaHfZ9eyoSGDUh3UyauDYNETSWL5VtKIS978M9fm3WMxEEuLfV_ZjF0EjclLWIFgafD2YknXaA7-AcMk7b7OkPvH59pyx7ltN9N0Je4oob-GTCxhlCYFNn3wb4hEtiK9TpfFPUYXs7KibpKHRHV7BX06nQ6LKzdA6iVzFLLokfmMRUrXpgRWIcQU2IsPeFGfW9MCZQJLxBPPY.WzgrV51c9RrND5MbIq3dpQ'


// fungsi dasar
globalThis.isOwner = (notel) => {
    return globalThis.ownerNumber.includes(notel)
}

globalThis.isBot = async (notel) => {
    return notel === botNumber
}

globalThis.isGroup = async (jid) => {
    return jid.endsWith('@g.us')
}

// variabel apikey
globalThis.apiKey = {
    gemini: '',
    removeBG: '',
    llama: '',
    groq: '',
    pdf: {
        secret: '',
        public: ''
    }
}
globalThis.hikaru = 'https://fastrestapis.fasturl.cloud/'

// variabel paired apikey with baseurl
globalThis.apiHelper = {
    medanpedia: {
        baseurl: 'https://api.medanpedia.co.id/',
        apiId: '',
        apiKey: ''
    },
    lolhuman: {

        apikey: '',

        baseUrl: 'https://api.lolhuman.xyz/api/'

    },
    neoxr: {

        apikey: '',

        baseUrl: 'https://api.neoxr.eu/api/'

    },
    ryzen: {

        apikey: '',

        baseUrl: 'https://api.ryzendesu.vip/api/'

    },
    fastapi: {

        apikey: '',

        baseUrl: 'https://fastrestapis.fasturl.cloud/'

    },

    betabotz: {

        apikey: '',

        baseUrl: 'https://api.betabotz.eu.org/api/'

    },

    skizotech: {

        apikey: '',

        baseUrl: 'https://skizoasia.xyz/api/'

    },
    nyxs: {
        apikey: '',
        baseUrl: 'https://api.nyxs.pw/'
    }

}
