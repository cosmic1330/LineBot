const connectToDatabase = require("../connect");
const remove = async (collection) => {
  const { db } = await connectToDatabase();
  const result = await db.collection(collection).deleteMany({});
  return result;
};
module.exports = remove;
