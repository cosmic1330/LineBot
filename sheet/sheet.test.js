const getSheet = require("./getSheet");
const filter = require("./filter");
const append = require("./append");
const remove = require("./remove");
const update = require("./update");
const get = require("./get");

describe("Sheet Test", () => {
  beforeEach(async () => {
  });
  afterEach(async () => {});

  it("getSheet", async () => {
    const res = await getSheet();
    expect(res.values[0]).toEqual(["訂單編號", "姓名", "下訂時間", "特殊需求"]);
  });

  it("get", async () => {
    const res = await get();
    length = res.length; // data length 不包含 header
    expect(res.length).toEqual(res[res.length-1].index);
  });

  it("filter", async () => {
    const res = await filter({
      column: "姓名",
      str: "測試人員1",
      type: "array",
    });
    expect(res).toEqual([[1, "1", "測試人員1", "2022/2/6 上午 8:00:00", "無"]]);
  });

  it("append", async () => {
    const res = await append();
    length = length+1;
    expect(res).toEqual({"下訂時間": "2022/2/8 上午 8:00:00", "姓名": "Jest", "特殊需求": "no", "訂單編號": "2"});
  });


  it("update", async () => {
    const res = await update(length, [8, "New Jest", "2022/2/8 下午 8:00:00", "clear"]);
    expect(res).toEqual({"下訂時間": "2022/2/8 下午 8:00:00", "姓名": "New Jest", "特殊需求": "clear", "訂單編號": "8"});
  });

  it("remove", async () => {
    const res = await remove(length);
    expect(res).toEqual(length);
  });
});
