import { google } from 'googleapis'
import fs from 'fs'

// Load credential
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const client = await auth.getClient()
const sheets = google.sheets({ version: 'v4', auth: client })

// Ganti ID dan nama Sheet
const SPREADSHEET_ID = '1ABCDE12345xxxxx' // ID dari URL Google Sheets
const RANGE = 'Sheet1!A1' // atau Sheet1!A:A biar nambah ke baris kosong

// Fungsi nulis data
async function tulisKeSpreadsheet(nama, pesan) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[nama, pesan, new Date().toLocaleString()]],
    },
  })

  console.log('✅ Data masuk bosku!')
}

// Contoh pakai (panggil ini dari handler message WA)
await tulisKeSpreadsheet('Bang Roy', 'Bot-nya makin jago nih 😎')
