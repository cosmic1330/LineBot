const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

require("dotenv").config();

function append() {
  return new Promise(async function (resolve, reject) {
    const data = {"訂單編號":"2", "姓名":"Jest", "下訂時間":"2022/2/8 上午 08:00:00", "特殊需求":"no"}
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
      await sheet.addRow(data);
      const rows = await sheet.getRows();
      resolve(rows[rows.length - 1].toObject());
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = append;
