import { Page } from "../../app/domain/output/page.js";
import { UserOutput } from "../../app/domain/output/user-output.js";
import { User } from "../../app/domain/user.js";
import type { UserGateway } from "../../app/gateway/user-gateway.js";
import type { Knex } from "knex";

export class UserRepository {
  constructor(
    private db: Knex,
    private tableName: string = "users",
  ) {}

  async create(user: User): Promise<User> {
    const result = await this.db(this.tableName).insert(user).returning("*");
    return new User(
      result[0].id,
      result[0].name,
      result[0].email,
      result[0].password,
    );
  }
  async test() {
    const result = await this.db(this.tableName).select("*");
    return result;
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
