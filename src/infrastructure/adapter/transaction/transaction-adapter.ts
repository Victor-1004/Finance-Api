import type { TransactionGateway } from "../../../app/gateway/transaction/transaction-gateway.js";
import type { Transaction, TransactionOutput } from "../../../app/domain/transactions/transaction.js";
import type { TransactionRepository } from "../../repository/transaction/typeorm-transaction-repository.js";
import type { UUID } from "node:crypto";

export class TransactionAdapter implements TransactionGateway {
  constructor(
    private transactionRepository: TransactionRepository
  ) {}

  async create(userId: UUID, transaction: Transaction): Promise<void> {
    await this.transactionRepository.create(userId, transaction);
  }

  async update(transaction: Transaction): Promise<void> {
    await this.transactionRepository.update(transaction);
  }

  async delete(transaction: Transaction): Promise<void> {
    await this.transactionRepository.delete(transaction.id);
  }

  async findById(id: UUID): Promise<TransactionOutput | null> {
    return this.transactionRepository.findById(id);
  }


  async findByUserId(
    userId: UUID,
    page: number,
    size: number,
  ): Promise<[TransactionOutput[], number]> {
    return this.transactionRepository.findByUserId(userId, page, size);
  }
}
