import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

let createUserCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("Create Statement", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserCase = new CreateUserUseCase(inMemoryUsersRepository);

    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able to create a new deposit statement", async () => {
    const user = await createUserCase.execute({
      name: "XXX",
      email: "XXX@mail.com",
      password: "XXXX",
    });

    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 500.0,
      description: "statement test",
    });

    expect(statement).toHaveProperty("id");
    expect(statement.amount).toBe(500.0);
  });

  it("should not be able to create a new deposit statement with non exists user", async () => {
    expect(async () => {
      await createStatementUseCase.execute({
        user_id: "123",
        type: OperationType.DEPOSIT,
        amount: 500.0,
        description: "statement test",
      });
    }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound);
  });
});
