const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

require("dotenv").config();

function update(index, data) {
  return new Promise(async function (resolve, reject) {
    try {
      const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_CLIENTEMAIL,
        key: process.env.GOOGLE_SERVICE_PRIVATEKEY.replace(/\\n/g, "\n"),
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });
      const doc = new GoogleSpreadsheet(
        process.env.GOOGLE_SHEETID,
        serviceAccountAuth
      );
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      await sheet.loadCells();
      for (let i = 0; i < data.length; i++) {
        const cell = sheet.getCell(index, i);
        cell.value = data[i];
      }
      await sheet.saveUpdatedCells();
      const rows = await sheet.getRows();
      resolve(rows[index - 1].toObject());
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = update;
