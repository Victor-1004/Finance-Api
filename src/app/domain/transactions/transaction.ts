import type { User } from "../user/user.js";
import type { Category } from "./category.js";

export class Transaction {
  constructor(
    public id: string,
    public user_id: string | null,
    public category_id: string,
    public amount: number,
    public date: Date,
    public description: string,
    public type: "income" | "expense",
    public createdAt: Date,
  ) {}
}

export class TransactionOutput {
  constructor(
    public id: string,
    public user: User,
    public category: Category,
    public amount: number,
    public date: Date,
    public description: string,
    public type: "income" | "expense",
    public createdAt: Date,
  ) {}
}
