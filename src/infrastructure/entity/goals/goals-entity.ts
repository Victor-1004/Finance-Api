import type { UUID } from "node:crypto";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { UserEntity } from "../user/user-entity.js";
import { Category } from "../../../app/domain/transactions/category.js";
import { CategoryEntity } from "../transaction/category-entity.js";

@Entity("goals")
export class GoalEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: UUID

    @ManyToOne(() => UserEntity, user => user.goals, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: UserEntity

    @Column({ type: "varchar" })
    name!: string

    @Column({ type: "numeric" })
    target_amount!: number

    @Column({ type: "date", default: () => "CURRENT_DATE" })
    start_date!: string

    @Column({ type: "date" })
    deadline!: string

    @OneToOne(() => CategoryEntity, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "category_id" })
    category!: CategoryEntity | null

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    
}