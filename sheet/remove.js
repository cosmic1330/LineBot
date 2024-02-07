const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

require("dotenv").config();

function remove(length) {
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
      const rows = await sheet.getRows();
      await rows[length-1].delete();
      resolve(rows.length);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = remove;
