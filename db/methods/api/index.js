require("dotenv").config();



function getTodayPrice(date, CropCode) {
  return new Promise(function (resolve, reject) {
    const params = new URLSearchParams({
      Start_time: date,
      End_time: date,
      CropCode
    });
    console.log(`[INFO]${params}`)
    const url = `https://data.moa.gov.tw/api/v1/AgriProductsTransType?${params.toString()}`;

    fetch(url, {
      headers: {
        api_key: process.env.COA_APIKEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
module.exports = getTodayPrice;
