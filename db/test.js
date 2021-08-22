const find = require("./methods/find");
const remove = require("./methods/remove");
const insertData = require("./methods/insertData");

async function run() {
  let result = await find();
  console.log(result);
}

async function save(){
    let result = await insertData();
    console.log(result);
}

save()
// run()
// remove()