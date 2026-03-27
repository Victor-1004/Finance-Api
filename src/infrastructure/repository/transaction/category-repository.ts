import type { Knex } from "knex";
import { Category } from "../../../app/domain/transactions/category.js";

export default class CategoryRepository {
  constructor(
    private db: Knex,
    private tableName: string = "categories",
  ) {}

  async create(userId: string, category: Category): Promise<void> {
    category.user_id = userId;
    category.is_default = false;
    await this.db(this.tableName).insert(category);
  }

  async update(category: Category): Promise<Category> {
    const result = await this.db(this.tableName)
      .where({ id: category.id })
      .update(category)
      .returning("*");
    return Category.mapCategory(result[0]);
  }

  async delete(category: Category): Promise<void> {
    await this.db(this.tableName).where({ id: category.id }).delete();
  }

  async findById(id: string): Promise<Category> {
    const result = await this.db(this.tableName)
      .select([
        "categories.*",
        "users.id as u_id",
        "users.name as u_name",
        "users.email as u_email",
        "users.password as u_password",
      ])
      .leftJoin("users", "users.id", "categories.user_id")
      .where("categories.id", id)
      .first();
    return Category.mapCategory(result);
  }

  async findAll(): Promise<Category[]> {
    const result = await this.db(this.tableName)
      .select([
        "categories.*",
        "users.id as u_id",
        "users.name as u_name",
        "users.email as u_email",
        "users.password as u_password",
      ])
      .leftJoin("users", "users.id", "categories.user_id");

    return result.map(Category.mapCategory);
  }
  async findByUserId(userId: string): Promise<Category[]> {
    const result = await this.db(this.tableName)
      .select([
        "categories.*",
        "users.id as u_id",
        "users.name as u_name",
        "users.email as u_email",
        "users.password as u_password",
      ])
      .leftJoin("users", "users.id", "categories.user_id")
      .where("categories.user_id", userId)
      .orWhere("categories.is_default", true);

    return result.map(Category.mapCategory);
  }
}
