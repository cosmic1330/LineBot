const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

function filter({ column, str, type = "object" }) {
  return new Promise(async function (resolve, reject) {
    try {
      const result = [];
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETID, {
        apiKey: process.env.GOOGLE_APIKEY,
      });
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      rows = await sheet.getRows();
      // 取得最後一列
      for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const obj = row.toObject();
        const boolColumn = obj[column].includes(str);
        if (type === "object" && boolColumn) {
          result.push({...row.toObject(), index: i+1});
        } else if (type === "array" && boolColumn) {
          result.push([i+1,...row._rawData]);
        }
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = filter;
