import type { UUID } from "node:crypto";
import type { GoalsGateway } from "../../../app/gateway/goals/goals-gateway.js";
import type { GoalsRepository } from "../../repository/goals/typeorm-goals-repository.js";
import type { Goal } from "../../../app/domain/goals/goals.js";
import { domainToEntity, entityArrayToDomain, entityToDomain } from "../mapper/goal/goals-mapper.js";
import type { GoalEntity } from "../../entity/goals/goals-entity.js";

export class GoalsAdapter implements GoalsGateway {
    constructor(private repo: GoalsRepository) {}

    async findByUserId(page: number, size: number, userId: UUID, categoryId: UUID | null): Promise<[Goal[], number]> {
        const [goals, total] = await this.repo.findByUserId(page, size, userId, categoryId);
        return [entityArrayToDomain(goals), total];
    }

    async create(goalData: Partial<Goal>): Promise<Goal> {
        const entityData = domainToEntity(goalData as Goal);
        let entity = { 
            ...entityData, 
            user: { id: goalData.user!.id }
        } as Partial<GoalEntity>;
        
        if (goalData.category && goalData.category.id) {
            entity.category = { id: goalData.category.id } as any;
        }
        
        const created = await this.repo.create(entity);
        return entityToDomain(created)!;
    }

    async update(id: UUID, updateData: Partial<Goal>): Promise<Goal | null> {
        const entity = domainToEntity(updateData as Goal);
        
        // Preserve category if provided
        if (updateData.category && updateData.category.id) {
            entity.category = { id: updateData.category.id } as any;
        }
        
        const updated = await this.repo.update(id, entity);
        return updated ? entityToDomain(updated) : null;
    }

    async delete(id: UUID): Promise<void> {
        await this.repo.delete(id);
    }

}