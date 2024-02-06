const find = require("./find");
const insert = require("./insert");

describe("Express Test", () => {
  beforeEach(async () => {});

  afterEach(async () => {});

  it("find P1", async () => {
    const res = await find("P1");
    expect(res).not.toHaveLength(0);
  });

  it("insert P1", async () => {
    const res = await insert("P1");
    expect(res).not.toBe(0);
  });
});
