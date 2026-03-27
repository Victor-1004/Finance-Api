import type { Knex } from "knex";
import type { Transaction } from "../../../app/domain/transactions/transaction.js";

export class TransactionRepository {
  constructor(
    private db: Knex,
    private tableName: string = "transactions",
  ) {}

  async create(userId: string, transaction: Transaction): Promise<void> {
    const { id, createdAt, ...rest } = transaction;
    rest.user_id = userId;
    await this.db(this.tableName).insert(rest);
  }
  async update(transaction: Transaction): Promise<void> {
    const { id, user_id, createdAt, ...rest } = transaction;
    await this.db(this.tableName).where({ id }).update(rest);
  }
  async delete(transaction: Transaction): Promise<void> {
    await this.db(this.tableName).where({ id: transaction.id }).delete();
  }
  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.db(this.tableName).where({ id }).first();
    return transaction || null;
  }
  async findAll(): Promise<Transaction[]> {
    const transactions = await this.db(this.tableName).select("*");
    return transactions;
  }

  async findByUserId(userId: string, page: number, size: number): Promise<Transaction[]> {
    const transactions = await this.db(this.tableName).where("user_id", userId).limit(size).offset(page * size);
    return transactions;
  }

  async findByUserIdAndCategoryId(
    userId: string,
    categoryId: string,
  ): Promise<Transaction[]> {
    const transactions = await this.db(this.tableName).where({
      userId,
      categoryId,
    });
    return transactions;
  }
}
