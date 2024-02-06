const express = require("express");
const line = require("@line/bot-sdk");
const manager = require("./message/manager");
const connectToDatabase = require("./db/connect");
const getTodayPrice = require("./db/methods/api")
require("dotenv").config();

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESSTOKEN,
};

// create LINE SDK client
const client = new line.Client(config);

const app = express();

// 解析 application/json 格式的请求体
app.use(express.json());
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("<h1>online!</h1>");
});

app.post("/line_webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.post("/test_mongodb", async (req, res) => {
  try {
    const { client } = await connectToDatabase();
    if (client) {
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      res.send("MongoDB 連接成功");
    } else {
      res.send("MongoDB 未連接");
    }
  } catch (error) {
    console.log(error)
    res.send("MongoDB 連接失敗");
  }
});

app.post("/test_api", async (req, res) => {
  try {
    const data = await getTodayPrice(req.body);
    res.send(data);
  } catch (error) {
    console.log(error)
    res.send("連接失敗");
  }
});

app.post("/test_message", async (req, res) => {
  try {
    const data = await manager(req.body.text);
    res.send(data);
  } catch (error) {
    console.log(error)
    res.send("manager出現錯誤");
  }
});

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  const echo = await manager(event.message.text);
  return client.replyMessage(event.replyToken, echo);
}

module.exports = app;
