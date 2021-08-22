const connectToDatabase = require("../connect");
const distinct = async (query) => {
  const { db } = await connectToDatabase();
  const result = await db.collection("echo").distinct(query);
  return result;
};
module.exports = distinct;
