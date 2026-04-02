import type { UUID } from "node:crypto";
import type { Goal } from "../../domain/goals/goals.js";

export interface GoalsGateway{
    findByUserId(page: number, size: number, userId: UUID, categoryId: UUID | null): Promise<[Goal[], number]>;
    create(goalData: Partial<Goal>): Promise<Goal>;
    update(id: UUID, updateData: Partial<Goal>): Promise<Goal | null>;
    delete(id: UUID): Promise<void>;
}