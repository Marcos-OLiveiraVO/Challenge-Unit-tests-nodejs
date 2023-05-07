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

  it("should be able to authenticate user", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "admin@mail.com",
      password: "admin",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
