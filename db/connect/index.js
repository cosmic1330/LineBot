require("dotenv").config();
var MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

console.log({MONGODB_URI, MONGODB_DB, cached})

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const client = new MongoClient(MONGODB_URI);
    cached.promise = client.connect().then((client) => {
      console.log(`Connecting to MongoDB [${MONGODB_URI}]`);
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

process.on('SIGINT', () => {
  cached?.conn?.client?.close(() => {
    console.log('Close MongoDB');
    process.exit(0);
  });
});

module.exports = connectToDatabase;
