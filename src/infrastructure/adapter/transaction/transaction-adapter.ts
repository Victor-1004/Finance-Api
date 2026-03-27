import type { TransactionGateway } from "../../../app/gateway/transaction/transaction-gateway.js";
import type { Transaction } from "../../../app/domain/transactions/transaction.js";
import { TransactionRepository } from "../../repository/transaction/transaction-repository.js";
import { db } from "../../../database/config.js";

export class TransactionAdapter implements TransactionGateway {
  constructor(
    private transactionRepository: TransactionRepository = new TransactionRepository(
      db,
    ),
  ) {}

  async create(userId: string, transaction: Transaction): Promise<void> {
    await this.transactionRepository.create(userId, transaction);
  }

  async update(transaction: Transaction): Promise<void> {
    await this.transactionRepository.update(transaction);
  }

  async delete(transaction: Transaction): Promise<void> {
    await this.transactionRepository.delete(transaction);
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findById(id);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async findByUserId(
    userId: string,
    page: number,
    size: number,
  ): Promise<Transaction[]> {
    return this.transactionRepository.findByUserId(userId, page, size);
  }

  async findByUserIdAndCategoryId(
    userId: string,
    categoryId: string,
  ): Promise<Transaction[]> {
    return this.transactionRepository.findByUserIdAndCategoryId(
      userId,
      categoryId,
    );
  }
}
