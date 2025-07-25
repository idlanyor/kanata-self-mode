<div align="center">
  
# 🌟 Antidonasi Inc. - WhatsApp Bot
### _Powerful, Modular, Intelligent_

[![GitHub repo size](https://img.shields.io/github/repo-size/idlanyor/Antidonasi Inc.-self-mode?style=for-the-badge)](https://github.com/idlanyor/Antidonasi Inc.-self-mode)
[![GitHub stars](https://img.shields.io/github/stars/idlanyor/Antidonasi Inc.-self-mode?style=for-the-badge)](https://github.com/idlanyor/Antidonasi Inc.-self-mode)
[![GitHub license](https://img.shields.io/github/license/idlanyor/Antidonasi Inc.-self-mode?style=for-the-badge)](https://github.com/idlanyor/Antidonasi Inc.-self-mode)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-43853D?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Baileys](https://img.shields.io/badge/Baileys-Latest-blue?style=for-the-badge)](https://github.com/whiskeysockets/baileys)

<img src="https://files.catbox.moe/2wynab.jpg" width="400px" style="border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

</div>

<div align="center">
  <h3>🌈 Fitur Unggulan</h3>
</div>

<div align="center">
  
| 🔌 Modular | 🤖 AI-Powered | 🖼️ Media Tools | 🎮 Fun & Games |
|------------|---------------|----------------|----------------|
| Plugin Architecture | Multi-Model AI | Image Processing | Interactive Games |
| Easy Integration | Smart Responses | PDF Conversion | Group Management |
| Custom Commands | Context Aware | Media Generation | Analytics & Logs |

</div>

## 📋 `

| Kebutuhan | Versi |
|-----------|-------|
| Node.js | v18 atau lebih tinggi |
| NPM/Yarn | Versi terbaru |
| WhatsApp | Akun aktif |
| API Keys | Lihat konfigurasi |

## 👌 How to install
1. **Clone the repository**
```bash
git clone https://github.com/idlanyor/Antidonasi Inc.-self-mode.git
cd Antidonasi Inc.-self-mode
```

2. **Install dependencies**
```bash
npm install
# or using yarn
yarn install
```

3. **Configure the bot**
   - Rename `global.example.js` to `global.js`
   - Fill in your API keys and configuration

4. **Start the bot**
```bash
npm start
# or using yarn
yarn start
```

## ⚙️ Configuration

Copy `globalThis.example.js` to `globalThis.js` and configure your settings:

```javascript
// Basic configuration
globalThis.owner = "YOUR_NAME";
globalThis.ownerNumber = ["YOUR_NUMBER","SECOND_NUMBER"]
globalThis.botNumber = ""
globalThis.botName = "Antidonasi Inc."
globalThis.sessionName = 'Antidonasi Inc.-bot'
globalThis.groupJid = '0@g.us'
globalThis.communityId = '0@g.us'
globalThis.newsLetterJid = '0@newsletter'
globalThis.newsLetterUrl = 'https://whatsapp.com/channel/0029VagADOLLSmbaxFNswH1m'
globalThis.kanataThumb = 'https://files.catbox.moe/2wynab.jpg'


// Basic functions
globalThis.isOwner = (notel) => {
    return globalThis.ownerNumber.includes(notel)
}

globalThis.isBot = async (notel) => {
    return notel === botNumber
}

globalThis.isGroup = async (jid) => {
    return jid.endsWith('@g.us')
}

// API keys
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
globalThis.hikaru = 'https://api.fasturl.link/'

// Paired API keys with baseurl
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

        baseUrl: 'https://api.fasturl.link/'

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

```

## 🔌 API Integration

Antidonasi Inc. integrates with multiple powerful APIs to provide enhanced functionality:

### AI Services
- 🧠 Google Generative AI - Advanced language processing
- ⚡ Groq - Fast AI inference
- 🤖 Llama - Open-source AI model
- 🚀 Hikaru AI LLM

### Image & Media
- 🖼️ RemoveBG - Background removal
- 📑 ILovePDF - PDF manipulation
- 🎨 Hikaru - AI Media conversion

### Additional Services
- 🚀 Hikaru FastURL
- ⚡ Ryzen Api
- 🛠️ BetaBotz
- 🔧 SkizoTech

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/idlanyor">
        <img src="https://github.com/idlanyor.png" width="100px;" alt="Roynaldi"/><br />
        <sub><b>Roynaldi</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/puanmahalini">
        <img src="https://github.com/puanmahalini.png" width="100px;" alt="Puan Mahalini"/><br />
        <sub><b>Puan Mahalini</b></sub>
      </a>
    </td>
  </tr>
</table>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/idlanyor">Roy</a>
</div>
