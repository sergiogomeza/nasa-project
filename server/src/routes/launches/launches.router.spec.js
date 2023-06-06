const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        mission: "mockedMission",
        rocket: "mockedRocket",
        target: "mockedDestination",
        launchDate: "January 1,2030",
      })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toStrictEqual({
      customer: ["Zero to Mastery", "NASA"],
      flightNumber: 101,
      launchDate: "2030-01-01T05:00:00.000Z",
      mission: "mockedMission",
      rocket: "mockedRocket",
      success: true,
      target: "mockedDestination",
      upcoming: true,
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        mission: "mockedMission",
        rocket: "mockedRocket",
        target: "mockedDestination",
        launchDate: "aasd",
      })
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app).post("/launches").send({}).expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
});

describe("Test DELETE /launches", () => {
  test("It should abort launch", async () => {
    await request(app).delete("/launches/10").expect(200);
  });
  test("It should catch launch not found", async () => {
    await request(app).delete("/launches/11").expect(404);
  });
});
