import type { UUID } from "node:crypto";
import type { Transaction, TransactionOutput } from "../../../app/domain/transactions/transaction.js";
import { AppDataSource } from "../../../database/config.js";
import { TransactionEntity } from "../../entity/transaction/transaction-entity.js";
import {
    entityToDomain,
    entityToOutput,
    entityArrayToOutput,
    domainToEntity,
} from "../../adapter/mapper/transaction/transaction-mapper.js";
import type { UserEntity } from "../../entity/user/user-entity.js";
import type { CategoryEntity } from "../../entity/transaction/category-entity.js";

export class TransactionRepository {
    private repo = AppDataSource.getRepository(TransactionEntity);

    async create(transaction: Transaction): Promise<Transaction | null> {
        try {
            const newTransaction = this.repo.create({
                ...domainToEntity(transaction),
                user: { id: transaction.user_id } as UserEntity,
                category: { id: transaction.category_id } as CategoryEntity
            });
            const savedTransaction = await this.repo.save(newTransaction);
            return entityToDomain(savedTransaction);
        } catch (error) {
            console.error("Error creating transaction:", error);
            throw error;
        }
    }

    async update(transaction: Transaction): Promise<Transaction | null> {
        try {
            const transactionEntity = domainToEntity(transaction);
            const updated = await this.repo.save({ ...transactionEntity, id: transaction.id });
            return entityToDomain(updated);
        } catch (error) {
            console.error("Error updating transaction:", error);
            throw error;
        }
    }

    async delete(id: UUID): Promise<void> {
        try {
            await this.repo.delete(id);
        } catch (error) {
            console.error("Error deleting transaction:", error);
            throw error;
        }
    }

    async findById(id: UUID): Promise<TransactionOutput | null> {
        try {
            const transaction = await this.repo.findOne({
                where: { id },
                relations: ["user", "category"],
            });
            return transaction ? entityToOutput(transaction) : null;
        } catch (error) {
            console.error("Error finding transaction by id:", error);
            throw error;
        }
    }

    async findByUserId(
        userId: UUID,
        page: number,
        size: number
    ): Promise<[transactions: TransactionOutput[], total: number]> {
        try {
            const [trans, total] = await this.repo.findAndCount({
                where: { user: { id: userId } },
                relations: ["user", "category"],
                order: { created_at: "DESC" },
                skip: page * size,
                take: size,
            });
            return [entityArrayToOutput(trans), total];
        } catch (error) {
            console.error("Error finding transactions by user:", error);
            throw error;
        }
    }
}   