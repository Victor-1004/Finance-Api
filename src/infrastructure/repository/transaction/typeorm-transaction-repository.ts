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
import { Between, LessThanOrEqual, MoreThanOrEqual, type FindOptionsWhere } from "typeorm";

export class TransactionRepository {
    private repo = AppDataSource.getRepository(TransactionEntity);

    private formatDateToString(d: Date | string): string {
        if (typeof d === 'string') {
            return d.split('T')[0]!;
        }
        return d.toISOString().split('T')[0]!;
    }

    async create(transaction: Transaction): Promise<TransactionEntity | null> {
        try {
            const categoryId = (transaction as any).category_id ?? (transaction as any).category ?? null;
            const { date, ...transactionData } = transaction;
            const newTransaction = this.repo.create({
                ...domainToEntity(transaction),
                date: this.formatDateToString(date),
                user: { id: transaction.user_id } as UserEntity,
                ...(categoryId ? { category: { id: categoryId } as CategoryEntity } : {})
            });
            const savedTransaction = await this.repo.save(newTransaction);
            return savedTransaction;
        } catch (error) {
            console.error("Error creating transaction:", error);
            throw error;
        }
    }

    async update(transaction: Transaction): Promise<TransactionEntity | null> {
        try {
            const transactionEntity = domainToEntity(transaction);
            const updated = await this.repo.save({ ...transactionEntity, id: transaction.id });
            return updated;
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

    async findById(id: UUID): Promise<TransactionEntity | null> {
        try {
            const transaction = await this.repo.findOne({
                where: { id },
                relations: ["user", "category"],
            });
            return transaction ? transaction : null;
        } catch (error) {
            console.error("Error finding transaction by id:", error);
            throw error;
        }
    }

    async findByUserId(
        userId: UUID,
        initialDate: Date | null = null,
        finalDate: Date | null = null,
        category: UUID | null = null,
        page: number,
        size: number
    ): Promise<[transactions: TransactionOutput[], total: number]> {
        try {

            const where: FindOptionsWhere<TransactionEntity> = { user: { id: userId } };

            if (initialDate && finalDate) {
                where.date = Between(this.formatDateToString(initialDate), this.formatDateToString(finalDate));
            } else if (initialDate) {
                where.date = MoreThanOrEqual(this.formatDateToString(initialDate));
            } else if (finalDate) {
                where.date = LessThanOrEqual(this.formatDateToString(finalDate));
            }

            if (category) {
                where.category = { id: category } as CategoryEntity;
            }
            const [trans, total] = await this.repo.findAndCount({
                where,
                relations: ["user", "category"],
                order: { date: "DESC" },
                skip: page * size,
                take: size,
            });
            return [entityArrayToOutput(trans), total];
        } catch (error) {
            console.error("Error finding transactions by user:", error);
            throw error;
        }
    }

    async findBalanceByUserId(userId: UUID, initialDate: Date | null = null, finalDate: Date | null = null, category: UUID | null = null): Promise<number> {
        let query = this.repo.createQueryBuilder("transaction")
            .select("SUM(CASE WHEN transaction.type = 'income' THEN transaction.amount ELSE -transaction.amount END)", "balance")
            .where("transaction.user_id = :userId", { userId });

        if (initialDate != null) {
            query = query.andWhere("transaction.date >= :initialDate", {
                initialDate: this.formatDateToString(initialDate)
            });
        }

        if (finalDate != null) {
            query = query.andWhere("transaction.date <= :finalDate", {
                finalDate: this.formatDateToString(finalDate)
            });
        }

        if (category) {
            query = query.andWhere("transaction.category_id = :categoryId", { categoryId: category });
        }
        
        const result = await query.getRawOne();
        const balance = result?.balance ? Number(result.balance) : 0;
        return balance;
    }
}

