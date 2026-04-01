import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user-entity.js";
import type { UUID } from "node:crypto";
import { TransactionEntity } from "./transaction-entity.js";

@Entity("categories")
export class CategoryEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: UUID;

    @Column({ type: "varchar" })
    name!: string;

    @ManyToOne(() => UserEntity, user => user.categories)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;

    @Column({ type: "boolean", default: false })
    is_default!: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @OneToMany(() => TransactionEntity, transaction => transaction.category)
    transactions!: TransactionEntity[];
}