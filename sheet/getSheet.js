require("dotenv").config();

function get() {
  return new Promise(function (resolve, reject) {
    const params = new URLSearchParams({
      key: process.env.GOOGLE_APIKEY,
    });
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETID}/values/order?${params.toString()}`;

    fetch(url, {
      headers: {},
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
module.exports = get;
