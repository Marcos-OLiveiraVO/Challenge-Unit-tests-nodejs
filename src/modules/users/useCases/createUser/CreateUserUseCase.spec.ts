import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserCase.execute({
      name: "XXX",
      email: "XXX@mail.com",
      password: "55555",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a user with exists email", async () => {
    expect(async () => {
      await createUserCase.execute({
        name: "XXX",
        email: "XXX@mail.com",
        password: "55555",
      });

      await createUserCase.execute({
        name: "XXXTest",
        email: "XXX@mail.com",
        password: "55555",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
