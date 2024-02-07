const insert = require("../db/methods/insert");
const find = require("../db/methods/find");


async function updateData() {
  const addCount = await insert("P1");
  return addCount;
}

async function getPomegranatePrice(){
  const data = await find("P1");
  if(data.length > 0){
    const text = data.map(item=>`市場:${item.MarketName}\n價格區間:\n上->${item.Upper_Price}\n中->${item.Middle_Price}\n下->${item.Lower_Price}`).join("\n\n");
    return `日期:${data[0].TransDate}\n品項:${data[0].CropName}\n${text}`;
  }else{
    return "無資料，或請更新資料。"
  }
}

module.exports = { updateData, getPomegranatePrice };
