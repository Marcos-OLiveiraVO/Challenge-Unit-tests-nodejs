import request from "supertest";

import { app } from "../../../../app";
import { dataSource } from "../../../../database/data-source";

describe("Create Statement Controller", () => {
  beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("should be able to create an user", async () => {
    const userResponse = await request(app).post("/api/v1/users/").send({
      name: "XXX",
      email: "XXX@mail.com",
      password: "XXXX",
    });

    expect(userResponse.status).toBe(201);
  });
});
