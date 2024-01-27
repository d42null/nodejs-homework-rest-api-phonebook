/* eslint-disable no-undef */
const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");
const { User } = require("./models/user");

describe("test login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB);
    await request(app).post('/api/users/register').send({email:"testuser@mail.com",password:"test_password"})
  });
  afterAll(async () => {
    await User.findOneAndDelete({email:"testuser@mail.com"})
    await mongoose.disconnect();
  });
  test("should respond with status code 200 and return token and user object", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "testuser@mail.com", password: "test_password" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
    expect(response.body.token).not.toBe("");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user).toHaveProperty("subscription");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
