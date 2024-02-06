const connectToDatabase = require("../connect");
const getTodayPrice = require("./api");
const getCurrentDate = require("../../utils/getCurrentDate");

const insertData = async (CropCode) => {
  try {
    const { db } = await connectToDatabase();
    const date = getCurrentDate();
    const { RS, Data } = await getTodayPrice(date, CropCode);

    const data = Data.filter((item) => item.CropCode === CropCode);
    if (RS) {
      const collection = db.collection(CropCode);
      await collection.deleteMany({})
      const result = await collection.insertMany(data);
      const date_collection = db.collection("date");
      const count = await date_collection.estimatedDocumentCount();

      if (count === 0) {
        await date_collection.insertOne({ [`${CropCode}_date`]: date });
      } else {
        await date_collection.updateOne({}, { $set: { [`${CropCode}_date`]: date } });
      }

      return result;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = insertData;
