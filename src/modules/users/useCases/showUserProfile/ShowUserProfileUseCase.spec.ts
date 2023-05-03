import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Authenticate User", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
  });

  it("should be able to show user profile", async () => {
    const user = await createUserCase.execute({
      name: "XXX",
      email: "XXX@mail.com",
      password: "XXXX",
    });

    const userProfile = await showUserProfileUseCase.execute(user.id);

    expect(userProfile).toEqual(user);
  });
});
