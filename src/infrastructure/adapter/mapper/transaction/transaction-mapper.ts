import { Transaction, TransactionOutput } from "../../../../app/domain/transactions/transaction.js";
import type { TransactionEntity } from "../../../entity/transaction/transaction-entity.js";
import { entityToDomain as mapCategory } from "./category-mapper.js";
import { entityToSimpleDomain as mapUser } from "../user/user-mapper.js";

export function entityToDomain(transactionEntity: TransactionEntity | null): Transaction | null {
    if (!transactionEntity) return null;

    return new Transaction(
        transactionEntity.id,
        transactionEntity.user?.id || null,
        transactionEntity.category.id,
        transactionEntity.amount,
        transactionEntity.date,
        transactionEntity.description,
        transactionEntity.type,
        transactionEntity.created_at
    );
}

export function entityArrayToDomain(transactionEntities: TransactionEntity[] | null): Transaction[] {
    if (!transactionEntities) return [];

    return transactionEntities.map(transaction =>
        new Transaction(
            transaction.id,
            transaction.user?.id || null,
            transaction.category.id,
            transaction.amount,
            transaction.date,
            transaction.description,
            transaction.type,
            transaction.created_at
        )
    );
}

export function entityToOutput(transactionEntity: TransactionEntity | null): TransactionOutput | null {
    if (!transactionEntity || !transactionEntity.id) return null;

    const user = transactionEntity.user ? mapUser(transactionEntity.user) : null;

    if (!user) return null;

    const category = transactionEntity.category ? mapCategory(transactionEntity.category) : null;

    if (!category) return null;

    return new TransactionOutput(
        transactionEntity.id,
        user,
        category,
        transactionEntity.amount,
        transactionEntity.date,
        transactionEntity.description,
        transactionEntity.type,
        transactionEntity.created_at
    );
}
export function entityArrayToOutput(transactionEntities: TransactionEntity[] | null): TransactionOutput[] {
    if (!transactionEntities) return [];

    return transactionEntities
        .map(transaction => entityToOutput(transaction))
        .filter((output): output is TransactionOutput => output !== null);
}

export function domainToEntity(transaction: Transaction | null): Partial<TransactionEntity> {
    if (!transaction) return {};

    return {
        id: transaction.id,
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description,
        type: transaction.type,
    };
}

export function domainArrayToEntity(transactions: Transaction[] | null): Partial<TransactionEntity>[] {
    if (!transactions) return [];

    return transactions.map(transaction => ({
        id: transaction.id,
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description,
        type: transaction.type,
    }));
}
