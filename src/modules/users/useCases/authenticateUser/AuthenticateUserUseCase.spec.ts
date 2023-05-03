import { AppError } from "@shared/errors/AppError";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate a user", async () => {
    const user = {
      name: "userTestName",
      email: "user@mail.com",
      password: "1234",
    };

    await createUserCase.execute(user);

    const result = await authenticateUserUseCase.execute(user);

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non exists user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "XXX@mail.com",
        password: "XXX",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with password incorrect", async () => {
    expect(async () => {
      await createUserCase.execute({
        name: "XXX",
        email: "XXX@mail.com",
        password: "XXX",
      });

      await authenticateUserUseCase.execute({
        email: "XXX@mail.com",
        password: "XXX2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with email incorrect", async () => {
    expect(async () => {
      await createUserCase.execute({
        name: "XXX",
        email: "XXX@mail.com",
        password: "XXX",
      });

      await authenticateUserUseCase.execute({
        email: "XXX2@mail.com",
        password: "XXX",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
