const { findAllMarket, findFruit, findAllFruit, findPrice, findAllPrice } = require("./methods");

async function manager(data) {
  let regLike = /^我想找+/;
  let regAllPrice = /^查詢全部+/;
  let regPrice = /^查詢+/;
  try {
    let response;
    if (data === "市場") {
      response = await findAllMarket();
    } else if (data === "水果") {
      response = await findAllFruit();
    } else if (regLike.test(data)) {
      let str = data.replace("我想找", "");
      res = await findFruit(str);
      response = notFound(res,str);
    } else if (regAllPrice.test(data)) {
      let str = data.replace("查詢全部", "");
      res = await findAllPrice(str);
      response = notFound(res,str);
    } else if (regPrice.test(data)) {
      let str = data.replace("查詢", "");
      res = await findPrice(str);
      response = notFound(res,str);
    } else {
      response = `你輸入的關鍵字:${data},目前不提供支援。\n\n支援關鍵字:\n- 市場\n- 我想找<水果名稱>\n- 查詢全部<水果代碼>\n- 查詢<水果代碼> \n(台北一、台北二、高雄、鳳山)`;
    }
    return response;
  } catch (error) {
    console.log(error);
    return "系統錯誤:" + error;
  }
}
module.exports = manager;


function notFound(res,str){
  if(res){
    return res;
  }else{
    return "你輸入的 "+str+" 找不到資訊。"
  }
}