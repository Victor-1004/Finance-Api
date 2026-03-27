import { Page } from "../../../app/domain/user/output/page.js";
import { UserOutput } from "../../../app/domain/user/output/user-output.js";
import { User } from "../../../app/domain/user/user.js";
import type { UserGateway } from "../../../app/gateway/user/user-gateway.js";
import type { Knex } from "knex";

export class UserRepository {
  constructor(
    private db: Knex,
    private tableName: string = "users",
  ) {}

  async findByEmail(email: string): Promise<User> {
    const result = await this.db(this.tableName).where({ email }).first();
    return new User(result.id, result.name, result.email, result.password);
  }

  async create(user: User): Promise<void> {
    await this.db(this.tableName).insert(user);
  }

  async update(user: User): Promise<User> {
    const result = await this.db(this.tableName)
      .where({ id: user.id })
      .update(user)
      .returning("*");
    return new User(
      result[0].id,
      result[0].name,
      result[0].email,
      result[0].password,
    );
  }

  async delete(user: User): Promise<User> {
    const result = await this.db(this.tableName)
      .where({ id: user.id })
      .delete()
      .returning("*");
    return new User(
      result[0].id,
      result[0].name,
      result[0].email,
      result[0].password,
    );
  }

  async findById(id: string): Promise<User> {
    const result = await this.db(this.tableName).where({ id }).first();
    return new User(result.id, result.name, result.email, result.password);
  }

  async findAll(): Promise<UserOutput[]> {
    const result = await this.db(this.tableName);
    return result.map((user: any) => {
      return new UserOutput(user.id, user.name, user.email);
    });
  }

  async find(page: number, size: number): Promise<Page> {
    const result = await this.db(this.tableName)
      .limit(size)
      .offset(page * size);
    return new Page(page, size, result.length, result);
  }
}
