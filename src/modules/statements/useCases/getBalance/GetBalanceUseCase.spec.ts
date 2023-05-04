import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { GetBalanceError } from "./GetBalanceError";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

let createUserCase: CreateUserUseCase;

let getBalanceUseCase: GetBalanceUseCase;

describe("Get Balance", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();

    createUserCase = new CreateUserUseCase(inMemoryUsersRepository);

    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to get the user balance", async () => {
    const user = await createUserCase.execute({
      name: "XXX",
      email: "XXX@mail.com",
      password: "XXXX",
    });

    const userBalance = await getBalanceUseCase.execute({
      user_id: user.id,
    });

    expect(userBalance.balance).toBe(0);
  });

  it("should not be able to get the user balance for non exists user", async () => {
    expect(async () => {
      await getBalanceUseCase.execute({
        user_id: "2222",
      });
    }).rejects.toBeInstanceOf(GetBalanceError);
  });
});
