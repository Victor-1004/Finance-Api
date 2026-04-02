import type { UUID } from "node:crypto";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { CategoryEntity } from "../transaction/category-entity.js";
import { TransactionEntity } from "../transaction/transaction-entity.js";
import { GoalEntity } from "../goals/goals-entity.js";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => CategoryEntity, category => category.user)
  categories!: CategoryEntity[];

  @OneToMany(() => TransactionEntity, transaction => transaction.user)
  transactions!: TransactionEntity[];

  @OneToMany(() => GoalEntity, goal => goal.user)
  goals!: GoalEntity[];
}