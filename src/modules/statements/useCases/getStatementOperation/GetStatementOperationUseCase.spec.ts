import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";
import { GetStatementOperationError } from "./GetStatementOperationError";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

let createUserCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

let getBalanceUseCase: GetBalanceUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Get StatementOperation", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();

    createUserCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );

    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );

    getStatementOperationUseCase = new GetStatementOperationUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able to get user StatementOperation", async () => {
    const user = await createUserCase.execute({
      name: "XXX",
      email: "XXX@mail.com",
      password: "XXX",
    });

    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      amount: 500,
      type: OperationType.DEPOSIT,
      description: "XXX",
    });

    const statementOperation = await getStatementOperationUseCase.execute({
      user_id: statement.user_id,
      statement_id: statement.id,
    });

    expect(statementOperation).toHaveProperty("id");
    expect(statementOperation.amount).toBe(500);
  });

  it("should not be able to get user StatementOperation for non exists user", async () => {
    expect(async () => {
      await getStatementOperationUseCase.execute({
        user_id: "XXXX",
        statement_id: "XXX",
      });
    }).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound);
  });

  it("should not be able to get statement found", async () => {
    expect(async () => {
      const user = await createUserCase.execute({
        name: "XXX",
        email: "XXX@mail.com",
        password: "XXX",
      });

      await getStatementOperationUseCase.execute({
        user_id: user.id,
        statement_id: "Wrong id",
      });
    }).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound);
  });
});
