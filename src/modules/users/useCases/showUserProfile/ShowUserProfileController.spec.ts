import request from "supertest";

import { app } from "../../../../app";
import { dataSource } from "../../../../database/data-source";

import { v4 as uuidV4 } from "uuid";
import { hashSync } from "bcryptjs";

const id = uuidV4();
const password = hashSync("admin", 8);

describe("Create Statement Controller", () => {
  beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();

    await dataSource.query(
      `INSERT INTO USERS(id, name, email, password, created_at, updated_at)
      VALUES ('${id}', 'admin', 'admin@mail.com', '${password}', 'now()', 'now()')`
    );
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("should be able to show user Profile", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "admin@mail.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const userProfileResponse = await request(app)
      .get("/api/v1/profile/")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(userProfileResponse.status).toBe(200);
    expect(userProfileResponse.body).toHaveProperty("id");
  });
});
