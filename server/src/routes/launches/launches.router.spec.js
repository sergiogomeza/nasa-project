const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Test Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({
          mission: "mockedMission",
          rocket: "mockedRocket",
          target: "Kepler-62 f",
          launchDate: "January 1,2030",
        })
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toStrictEqual({
        customers: ["Zero to Mastery", "NASA"],
        flightNumber: 100,
        launchDate: "2030-01-01T05:00:00.000Z",
        mission: "mockedMission",
        rocket: "mockedRocket",
        success: true,
        target: "Kepler-62 f",
        upcoming: true,
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({
          mission: "mockedMission",
          rocket: "mockedRocket",
          target: "Kepler-62 f",
          launchDate: "aasd",
        })
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({})
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
  });

  describe("Test DELETE /launches", () => {
    test("It should abort launch", async () => {
      await request(app).delete("/v1/launches/100").expect(200);
    });
    test("It should catch launch not found", async () => {
      await request(app).delete("/v1/launches/11").expect(404);
    });
  });
});
