import type { Transaction } from "../../domain/transactions/transaction.js";
import type { Page } from "../../domain/user/output/page.js";

export interface TransactionGateway {
  create(userId: string, transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  delete(transaction: Transaction): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  findByUserId(
    userId: string,
    page: number,
    size: number,
  ): Promise<Transaction[]>;
  
  findByUserIdAndCategoryId(
    userId: string,
    categoryId: string,
  ): Promise<Transaction[]>;
}
