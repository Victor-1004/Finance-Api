import type { UUID } from "node:crypto";
import {
  TransactionOutput,
  type Transaction,
} from "../../domain/transactions/transaction.js";
import type { TransactionGateway } from "../../gateway/transaction/transaction-gateway.js";
import type { UserGateway } from "../../gateway/user/user-gateway.js";
import type { CategoryGateway } from "../../gateway/transaction/category-gateway.js";
import { Page } from "../../domain/user/output/page.js";

export class TransactionInteractor {
  constructor(
    private transactionGateway: TransactionGateway,
    private userGateway: UserGateway,
    private categoryGateway: CategoryGateway,
  ) {}

  async create(userId: UUID, transaction: Transaction): Promise<void> {
    transaction.user_id = userId;
    await this.transactionGateway.create(userId, transaction);
  }

  async update(transaction: Transaction): Promise<void> {
    await this.transactionGateway.update(transaction);
  }

  async delete(transaction: Transaction): Promise<void> {
    await this.transactionGateway.delete(transaction);
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionGateway.findById(id);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionGateway.findAll();
  }

  async findByUserId(
    userId: string,
    page?: number,
    size?: number,
  ): Promise<Page> {
    if (page === null || page === undefined) {
      page = 0;
    }
    if (size === null || size === undefined) {
      size = 20;
    }
    const transactionsData = await this.transactionGateway.findByUserId(
      userId,
      page,
      size,
    );
    const transactions = await Promise.all(
      transactionsData.map(async (transaction) => {
        return new TransactionOutput(
          transaction.id,
          await this.userGateway.findById(transaction.user_id!),
          await this.categoryGateway.findById(transaction.category_id!),
          transaction.amount,
          transaction.date,
          transaction.description,
          transaction.type,
          transaction.createdAt,
        );
      }),
    );
    return new Page(
      Number(page),
      Number(size),
      transactions.length,
      transactions,
    );
  }

  async findByUserIdAndCategoryId(
    userId: string,
    categoryId: string,
  ): Promise<Transaction[]> {
    return this.transactionGateway.findByUserIdAndCategoryId(
      userId,
      categoryId,
    );
  }
}
