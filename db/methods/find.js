const connectToDatabase = require("../connect");
const find = async (query={}, projection={}) => {
  const { db } = await connectToDatabase();
  const result = await db.collection("echo").find(query).project(projection).toArray();
  return result;
};
module.exports = find;
