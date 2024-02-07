const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

/*
 Line 不支援傳送圖片
 待處理
 */
function exportExcel() {
  return new Promise(async function (resolve, reject) {
    try {
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETID, { apiKey: process.env.GOOGLE_APIKEY });
      const xlsxBuffer = await doc.downloadAsXLSX();
      resolve(xlsxBuffer);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = exportExcel;
