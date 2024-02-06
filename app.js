const express = require("express");
const line = require("@line/bot-sdk");
const manager = require("./message/manager");
const connectToDatabase = require("./db/connect");
require("dotenv").config();

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESSTOKEN,
};

// create LINE SDK client
const client = new line.Client(config);

const app = express();

app.get("/", function (req, res) {
  res.send("<h1>online!</h1>");
});

app.post("/linewebhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.post("/mongodb", async (req, res) => {
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

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  let replyMsg = await manager(event.message.text);
  const echo = { type: "text", text: replyMsg };

  return client.replyMessage(event.replyToken, echo);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
