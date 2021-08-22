const connectToDatabase = require("../connect");
const remove = async () => {
  const { db } = await connectToDatabase();
  const result = await db.collection("echo").remove();
  return result;
};
module.exports = remove;
