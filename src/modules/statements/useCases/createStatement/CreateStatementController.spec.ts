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

  it("should be able to create a statement with type deposit", async () => {
    const authentication = await request(app).post("/api/v1/sessions").send({
      email: "admin@mail.com",
      password: "admin",
    });

    const { token } = authentication.body;

    const response = await request(app)
      .post("/api/v1/statements/deposit")
      .send({
        amount: 50,
        description: "deposit",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });
});
