const {
  updateData,
  getPomegranatePrice
} = require("./methods");
/*
回復種類參考:
https://developers.line.biz/en/docs/messaging-api/message-types/#confirm-template
 */

async function manager(words) {
  let regLike = /^我想找+/;
  let regAllPrice = /^查詢全部+/;
  let regPrice = /^查詢+/;
  try {
    // 實驗
    if (words === "#貼圖") {
      return {
        type: "sticker",
        packageId: "446",
        stickerId: "1988",
      };
    } else if (words === "#圖片") {
      return {
        type: "image",
        originalContentUrl: `https://tse3.mm.bing.net/th?id=OIP.m59pGYADt84jthK5J8LTowHaE8&pid=Api&P=0&h=180`,
        previewImageUrl: `https://media.newjobs.com/niche/images/articles/Liz/Job.jpg`,
        animated: true,
      };
    } else if (words === "#位置") {
      return {
        type: "location",
        title: "my location",
        address: "1-3 Kioicho, Chiyoda-ku, Tokyo, 102-8282, Japan",
        latitude: 35.67966,
        longitude: 139.73669,
      };
    } else if (words === "#選單") {
      return {
        type: "text", // 1
        text: "Select your text or send me your location!",
        quickReply: {
          // 2
          items: [
            {
              type: "action", // 3
              action: {
                type: "message",
                label: "image",
                text: "#圖片",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "sticker",
                text: "#貼圖",
              },
            },
            {
              type: "action", // 4
              action: {
                type: "location",
                label: "Send location",
              },
            },
          ],
        },
      };
    }
    // 指令
    if (words === "更新資料") {
      const count = await updateData();
      return { type: "text", text:`更新了${count}筆資料` };
    } else if (words === "芭樂行情") {
      const text = await getPomegranatePrice();
      return { type: "text", text };
    }
  } catch (error) {
    console.log(error);
    return {
      type: "text",
      text: "$出錯囉...$",
      emojis: [
        {
          index: 0,
          productId: "5ac1bfd5040ab15980c9b435",
          emojiId: "074",
        },
        {
          index: 7,
          productId: "5ac1bfd5040ab15980c9b435",
          emojiId: "042",
        },
      ],
    };
  }
}
module.exports = manager;

function notFound(res, str) {
  if (res) {
    return res;
  } else {
    return "你輸入的 " + str + " 找不到資訊。";
  }
}
