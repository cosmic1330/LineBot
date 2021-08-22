const connectToDatabase = require("../connect");
const getTodayPrice = require("./api");

const insertData = async () => {
  const { db } = await connectToDatabase();
  let todayPrice = await getTodayPrice();
  todayPrice = JSON.parse(todayPrice);
  const collection = db.collection("echo");
  const result = await collection.insert(todayPrice);
  return result;
};
module.exports = insertData;
