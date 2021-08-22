const request = require("request");

function getTodayPrice() {
  return new Promise(function (resolve, reject) {
    request.get(
      {
        url: `https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx`,
      },
      (error, response, body) => {
        if (error) reject(error);
        try {
          resolve(body);
        } catch (error) {
          resolve(false);
        }
      }
    );
  });
}
module.exports = getTodayPrice;