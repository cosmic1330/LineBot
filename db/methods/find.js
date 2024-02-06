const connectToDatabase = require("../connect");
const find = async (collection, query={}) => {
  const { db } = await connectToDatabase();
  const result = await db.collection(collection).find(query).toArray();
  return result;
};
module.exports = find;
