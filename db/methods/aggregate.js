const connectToDatabase = require("../connect");
const aggregate = async ({match ={},group={}}) => {
  const { db } = await connectToDatabase();
  const result = await db.collection("echo").aggregate([{ $match: match },{ $group: group }]).toArray();
  return result;
};
module.exports = aggregate;
