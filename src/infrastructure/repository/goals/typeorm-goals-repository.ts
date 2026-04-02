import type { UUID } from "node:crypto";
import AppDataSource from "../../../database/config.js";
import { GoalEntity } from "../../entity/goals/goals-entity.js";
import type { FindOptionsWhere } from "typeorm";

export class GoalsRepository {
    private repo = AppDataSource.getRepository(GoalEntity);

    async create(goalData: Partial<GoalEntity>) {
        const goal = this.repo.create(goalData);
        return this.repo.save(goal);
    }

    async findById(id: UUID) {
        return this.repo.findOne({ where: { id }, relations: ["category"] });
    }

    async findByUserId(page: number, size: number, userId: UUID, categoryId: UUID | null): Promise<[GoalEntity[], number]> {
        let where: FindOptionsWhere<GoalEntity> = { user: { id: userId } };
        if (categoryId) {
            where = { ...where, category: { id: categoryId } };
        }
        const [goals, total] = await this.repo.findAndCount({
            where,
            relations: ["category"],
            skip: page * size,
            take: size,
        });
        return [goals, total];
    }

    async update(id: UUID, updateData: Partial<GoalEntity>) {
        await this.repo.update(id, updateData);
        return this.findById(id);
    }

    async delete(id: UUID) {
        await this.repo.delete(id);
    }

}