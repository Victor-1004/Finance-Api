import type { UUID } from "node:crypto";
import {
  TransactionOutput,
  type Transaction,
} from "../../domain/transactions/transaction.js";
import type { TransactionGateway } from "../../gateway/transaction/transaction-gateway.js";
import type { UserGateway } from "../../gateway/user/user-gateway.js";
import type { CategoryGateway } from "../../gateway/transaction/category-gateway.js";
import { Page } from "../../domain/user/output/page.js";
import { ApiError } from "../../errors/api.js";

export class TransactionInteractor {
  constructor(
    private transactionGateway: TransactionGateway
  ) {}

  async create(userId: UUID, transaction: Transaction): Promise<void> {
    transaction.user_id = userId;
    await this.transactionGateway.create(transaction);
  }

  async update(transaction: Transaction): Promise<void> {
    await this.transactionGateway.update(transaction);
  }

  async delete(transaction: Transaction): Promise<void> {
    await this.transactionGateway.delete(transaction);
  }

  async findById(id: string): Promise<TransactionOutput | null> {
    return this.transactionGateway.findById(id);
  }

  async findByUserId(
    userId: string,
    initialDate: Date | null,
    finalDate: Date | null,
    category: UUID | null,
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
      initialDate,
      finalDate,
      category,
      page,
      size,
    );
    return new Page(
      Number(page),
      Number(size),
      transactionsData[1],
      transactionsData[0],
      Math.ceil(transactionsData[1] / Number(size)),
    );
  }

  async findBalanceByUserId(userId: UUID, initialDate?: Date | null, finalDate?: Date | null, category: UUID | null = null): Promise<number> {
    if(finalDate && initialDate && finalDate < initialDate) {
      throw new ApiError("Data final não pode ser anterior à data inicial.", 406);
    }
    return this.transactionGateway.findBalanceByUserId(userId, initialDate, finalDate, category);
  }
}
