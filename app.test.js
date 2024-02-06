const request = require("supertest");
const app = require("./app");
require("dotenv").config();

describe("Express Test", () => {
  beforeEach(async () => {});

  afterEach(async () => {});

  it("Get /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  it("Post test_api", async () => {
    const res = await request(app)
      .post("/test_api")
      .send({ date: "113.02.06", CropCode: "P1" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.RS).toBe("OK");
  });

  it("Post test_message", async () => {
    const requestBody = {
      text: "#貼圖",
    };
    const res = await request(app).post("/test_message").send(requestBody);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      packageId: "446",
      stickerId: "1988",
      type: "sticker",
    });
  });
});
