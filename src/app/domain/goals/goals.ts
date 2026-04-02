import type { UUID } from "node:crypto";
import type { User } from "../user/user.js";
import type { Category } from "../transactions/category.js";

export class Goal {
    id!: UUID
    user!: User
    name!: string
    target_amount!: number
    start_date!: string
    deadline!: string
    category!: Category | null
    created_at!: Date
}

export class GoalOutput {
    id!: UUID
    name!: string
    target_amount!: number
    progress!: number
    percentage!: number
    start_date!: string
    deadline!: string
    category!: Category | null
    created_at!: Date
    completed!: boolean
    expired!: boolean
    constructor(goal: Goal, progress: number) {
        this.id = goal.id;
        this.name = goal.name;
        this.target_amount = goal.target_amount;
        this.start_date = goal.start_date;
        this.deadline = goal.deadline;
        this.category = goal.category;
        this.created_at = goal.created_at;
        this.progress = progress;
        this.percentage = goal.target_amount > 0 ? Math.min((progress / goal.target_amount) * 100, 100) : 0;
        this.completed = progress >= goal.target_amount;
        this.expired = new Date() > new Date(goal.deadline) && !this.completed;
    }
        
}