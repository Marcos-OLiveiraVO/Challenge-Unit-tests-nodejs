import "reflect-metadata";
import { DataSource } from "typeorm";
import { Statement } from "../modules/statements/entities/Statement";
import { User } from "../modules/users/entities/User";

require("dotenv/config");

const isTestEnv = process.env.NODE_ENV === "test";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "20041650",
  database: isTestEnv ? "ignite-challenge-finapi-test" : "fin_api",
  entities: [Statement, User],
  migrations: ["./src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: false,
});

dataSource
  .initialize()
  .then(() => {})
  .catch((error) => console.log(error));

export { dataSource };
