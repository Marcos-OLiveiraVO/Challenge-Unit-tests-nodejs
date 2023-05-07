import request from "supertest";

import { app } from "../../../../app";
import { dataSource } from "../../../../database/data-source";

import { v4 as uuidV4 } from "uuid";
import { hashSync } from "bcryptjs";

const id = uuidV4();
const password = hashSync("admin", 8);

describe("Get Statement Operation Controller", () => {
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

  it("should be able to get an statement operation", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "admin@mail.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const deposit = await request(app)
      .post("/api/v1/statements/deposit")
      .send({
        amount: 100,
        description: "deposit test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get(`/api/v1/statements/${deposit.body.id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(deposit.body).toHaveProperty("type");
  });
});
