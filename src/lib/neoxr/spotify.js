import { hikaru } from "../../helper/hikaru.js";

export const spotifySearch = async (name) => {
    try {
        const { data } = await hikaru('music/spotify', {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            },
            params: {
                name
            }
        })
        return data.result
    } catch (error) {
        throw error
    }
}

export const spotifySong = async (q) => {
    try {
        const result = await spotifySearch(q)
        const { data } = await hikaru('downup/spotifydown', {
            params: {
                url: result[0].url,
                player: true,
                server: 'server2'
            }
        })
        return {
            thumbnail: data.result.metadata.cover || 'https://files.catbox.moe/2wynab.jpg',
            title: data.result.metadata.title || 'GTW Judulnya',
            author: data.result.metadata.artists || 'YNTKTS',
            audio: data.result.url,
            cover: data.result.player
        }
    } catch (error) {
        throw error
    }
}

export const spotifyUrl = async (url) => {
    try {
        const { data } = await hikaru('downup/spotifydown', {
            params: {
                url: url,
                player: true
            }
        })
        return {
            thumbnail: data.result.metadata.cover || 'https://files.catbox.moe/2wynab.jpg',
            title: data.result.metadata.title || 'GTW Judulnya',
            author: data.result.metadata.artists || 'YNTKTS',
            audio: data.result.url,
            cover: data.result.player
        }
    } catch (error) {
        throw error
    }
}

// export const spotifyCanvas = ({ artist, album, img, timeStart, timeEnd, title }) => {
//     return canvafy.Spotify()
//         .setAlbum(album)
//         .setAuthor(artist)
//         .setImage(img)
//         .setTitle(title)
//         .setTimestamp(timeStart, timeEnd)
//         .setSpotifyLogo(true)
//         .setBlur(5)
// }

// (async () => { console.log(await spotifySong('jkt48 sanjou')) })()