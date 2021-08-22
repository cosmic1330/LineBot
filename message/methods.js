const distinct = require("../db/methods/distinct");
const find = require("../db/methods/find");
const aggregate = require("../db/methods/aggregate");

async function findAllMarket() {
  let dbData = await distinct("市場名稱");
  dbData = dbData.join( '\n');
  console.log(dbData);
  return dbData;
}

async function findAllFruit() {
  let dbData = await aggregate({
    group: { _id: "$作物名稱", uuid: { $first: "$作物代號" } },
  });
  dbData = dbData.map((item) => `${item["uuid"]} ${item["_id"]}`);
  dbData = dbData.join( '\n');
  console.log(dbData);
  return dbData;
}

async function findFruit(data) {
  let reg = new RegExp(data);
  let dbData = await aggregate({
    match: {作物名稱 : reg},
    group: { _id: "$作物名稱", uuid: { $first: "$作物代號" } },
  });
  dbData = dbData.map((item) => `${item["uuid"]} ${item["_id"]}`);
  dbData = dbData.join( '\n');
  console.log(dbData);
  return dbData;
}

async function findAllPrice(data){
  let dbData = await find({ 作物代號: data });
  newData = dbData.map((item) => `${item["市場名稱"]}:\n上價:${item["上價"]}\n中價:${item["中價"]}\n下價:${item["下價"]}\n`);
  newData = newData.join('\n\n');
  newData = `${dbData[0]["作物名稱"]}\n日期:${dbData[0]["交易日期"]}\n` + newData
  return newData;
}

async function findPrice(data) {
  let dbData = await find({
    $or: [{ 市場代號: "104" }, { 市場代號: "109" }, { 市場代號: "830" }, { 市場代號: "800" }],
    作物代號: data,
  });
  newData = dbData.map(
    (item) =>
      `${item["市場名稱"]}:\n上價:${item["上價"]}\n中價:${item["中價"]}\n下價:${item["下價"]}\n`
  );
  newData = newData.join("\n\n");
  newData =
    `${dbData[0]["作物名稱"]}\n日期:${dbData[0]["交易日期"]}\n` + newData;
  console.log(newData);
  return newData;
}

// async function findFruit(data) {
//   let reg = new RegExp(data);
//   let dbData = await find(
//     { 作物名稱: reg },
//     { 作物名稱: 1,作物代號:1, _id: 0 }
//     // { 上價: 1, 中價: 1, 下價: 1, 作物名稱: 1,作物代號:1, 市場名稱:1, _id: 0 }
//   );
//   // dbData.map(item=> `${item['作物代號']} ${item['作物名稱']}\n`)
//   console.log(dbData);
//   return JSON.stringify(dbData[0]);
// }

module.exports = { findAllMarket, findFruit, findAllFruit, findPrice, findAllPrice };
