import type { TransactionGateway } from "../../../app/gateway/transaction/transaction-gateway.js";
import type { Transaction, TransactionOutput } from "../../../app/domain/transactions/transaction.js";
import type { TransactionRepository } from "../../repository/transaction/typeorm-transaction-repository.js";
import type { UUID } from "node:crypto";
import { entityArrayToOutput, entityToOutput } from "../mapper/transaction/transaction-mapper.js";

export class TransactionAdapter implements TransactionGateway {
  constructor(
    private transactionRepository: TransactionRepository
  ) { }

  async create(transaction: Transaction): Promise<void> {
    await this.transactionRepository.create(transaction);
  }

  async update(transaction: Transaction): Promise<void> {
    await this.transactionRepository.update(transaction);
  }

  async delete(transaction: Transaction): Promise<void> {
    await this.transactionRepository.delete(transaction.id);
  }

  async findById(id: UUID): Promise<TransactionOutput | null> {
     return entityToOutput(await this.transactionRepository.findById(id));
  }


  async findByUserId(
    userId: UUID,
    initialDate: Date | null = null,
    finalDate: Date | null = null,
    category: UUID | null = null,
    page: number,
    size: number,
  ): Promise<[TransactionOutput[], number]> {
    const [transactions, total] = await this.transactionRepository.findByUserId(userId, initialDate, finalDate, category, page, size);
    return [entityArrayToOutput(transactions), total];
  }

  async findBalanceByUserId(userId: UUID, initialDate?: Date | null, finalDate?: Date | null, category: UUID | null = null): Promise<number> {
    return this.transactionRepository.findBalanceByUserId(userId, initialDate, finalDate, category);
  }
}
