import type { UUID } from "node:crypto";
import type { GoalsGateway } from "../../gateway/goals/goals-gateway.js";
import { Page } from "../../domain/user/output/page.js";
import { GoalOutput, type Goal } from "../../domain/goals/goals.js";
import type { TransactionGateway } from "../../gateway/transaction/transaction-gateway.js";
import { ApiError } from "../../errors/api.js";

export class GoalsInteractor{
    constructor(private gateway: GoalsGateway, private transaction: TransactionGateway) {}

    async findByUserId(page: number | null, size: number | null, userId: string, categoryId: UUID | null): Promise<Page>{
        try {
            let pageNum = page !== null && page !== undefined ? Number(page) : 0;
            let sizeNum = size !== null && size !== undefined ? Number(size) : 20;
            
            const [goals, total] = await this.gateway.findByUserId(pageNum, sizeNum, userId as UUID, categoryId);
            const goalsOutput = await Promise.all(goals.map(async (goal) => {
                const progress = await this.transaction.findBalanceByUserId(userId as UUID, new Date(goal.start_date), new Date(goal.deadline), goal.category?.id || null);
                return new GoalOutput(goal, progress);
            }));
            return new Page(pageNum, sizeNum, total, goalsOutput, Math.ceil(total / sizeNum));
        } catch (error) {
            throw error;
        }
    }

    async create(goalData: Partial<Goal>): Promise<Goal> {
        const result = await this.gateway.create(goalData);
        return result;
    }

    async update(id: UUID, updateData: Partial<Goal>, userId: UUID): Promise<Goal | null> {
        return this.gateway.update(id, updateData);
    }

    async delete(id: UUID, userId: UUID): Promise<void> {
        return this.gateway.delete(id);
    }
}