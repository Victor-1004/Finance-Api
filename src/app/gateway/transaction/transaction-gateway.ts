import type { UUID } from "node:crypto";
import type { Transaction, TransactionOutput } from "../../domain/transactions/transaction.js";
import type { Page } from "../../domain/user/output/page.js";

export interface TransactionGateway {
  create(transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  delete(transaction: Transaction): Promise<void>;
  findById(id: string): Promise<TransactionOutput | null>;
  findByUserId(
    userId: string,
    initialDate: Date | null,
    finalDate: Date | null,
    page: number,
    size: number,
  ): Promise<[TransactionOutput[], number]>;
  findBalanceByUserId(userId: UUID, initialDate?: Date | null, finalDate?: Date | null): Promise<number>;

}
