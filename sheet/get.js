const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

require("dotenv").config();

function remove(type = "object") {
  return new Promise(async function (resolve, reject) {
    try {
      const result = [];
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
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (type === "object") {
          result.push({...row.toObject(), index: i+1});
        } else if (type === "array") {
          result.push([i+1,...row._rawData]);
        }
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = remove;
