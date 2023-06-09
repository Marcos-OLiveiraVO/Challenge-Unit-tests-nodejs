import { Repository } from "typeorm";

import { User } from "../entities/User";
import { ICreateUserDTO } from "../useCases/createUser/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";
import { dataSource } from "../../../database/data-source";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOneBy({
      email,
    });
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        id: user_id,
      },
    });
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });

    return this.repository.save(user);
  }
}
