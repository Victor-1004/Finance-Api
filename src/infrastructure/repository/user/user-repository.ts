import { Category } from "../../../app/domain/transactions/category.js";
import { Page } from "../../../app/domain/user/output/page.js";
import { UserOutput } from "../../../app/domain/user/output/user-output.js";
import { User } from "../../../app/domain/user/user.js";
import type { Knex } from "knex";

export class UserRepository {
  constructor(
    private db: Knex,
    private tableName: string = "users",
  ) {}

  private toRow(user: User) {
    const { categories, ...row } = user;
    return row;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db(this.tableName).where({ email }).first();
    if (!result) {
      return null;
    }
    return User.mapUser(result);
  }

  async create(user: User): Promise<void> {
    await this.db(this.tableName).insert(this.toRow(user));
  }

  async update(user: User): Promise<User> {
    const result = await this.db(this.tableName)
      .where({ id: user.id })
      .update(this.toRow(user))
      .returning("*");
    return User.mapUser(result[0]);
  }

  async delete(user: User): Promise<User> {
    const result = await this.db(this.tableName)
      .where({ id: user.id })
      .delete()
      .returning("*");
    return User.mapUser(result[0]);
  }

  async findById(id: string): Promise<User> {
    const result = await this.db(this.tableName).where({ id }).first();
    return User.mapUser(result);
  }

  async findAll(): Promise<UserOutput[]> {
    const usersRaw = await this.db(this.tableName);
    const users = usersRaw.map(User.mapUser);
    await this.distributeCategories(users);
    return users.map(UserOutput.fromUser);
  }

  async find(page: number, size: number): Promise<Page> {
    const usersRaw = await this.db(this.tableName)
      .limit(size)
      .offset(page * size);

    const users = usersRaw.map(User.mapUser);
    await this.distributeCategories(users);

    return new Page(page, size, users.length, users.map(UserOutput.fromUser));
  }

  private async distributeCategories(users: User[]): Promise<void> {
    if (users.length === 0) return;
    const userIds = users.map((u) => u.id);
    const categoriesRaw = await this.db("categories").whereIn(
      "user_id",
      userIds,
    );

    users.forEach((user) => {
      user.categories = categoriesRaw
        .filter((c) => c.user_id === user.id)
        .map((c) => Category.mapCategory(c));
    });
  }
}
