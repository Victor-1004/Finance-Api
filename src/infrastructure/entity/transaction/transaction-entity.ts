import type { UUID } from "node:crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category-entity.js";
import { UserEntity } from "../user/user-entity.js";

@Entity("transactions")
export class TransactionEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: UUID

    @Column({ type: "numeric", precision: 10, scale: 2 })
    amount!: number;

    @Column({ type: "date", nullable: false })
    date!: string;

    @Column({ type: "varchar" })
    description!: string;

    @Column({ type: "varchar" })
    type!: "income" | "expense";

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => CategoryEntity, category => category.transactions, { eager: true })
    @JoinColumn({ name: "category_id" })
    category!: CategoryEntity;

    @ManyToOne(() => UserEntity, user => user.transactions, { eager: true })
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;
}