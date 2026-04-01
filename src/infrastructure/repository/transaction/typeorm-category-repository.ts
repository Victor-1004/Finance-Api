import type { UUID } from "node:crypto";
import { AppDataSource } from "../../../database/config.js";
import { CategoryEntity } from "../../entity/transaction/category-entity.js";

export class CategoryRepository {
    private repo = AppDataSource.getRepository(CategoryEntity);

    async findByUserId(user_id: UUID): Promise<CategoryEntity[] | null> {
        return this.repo.find({ where: { user: { id: user_id } }, relations: ["user"], order: { created_at: "DESC" } });
    }

    async create(user_id: UUID, category: Partial<CategoryEntity>): Promise<CategoryEntity> {
        const newCategory = this.repo.create({ ...category, user: { id: user_id } });
        return this.repo.save(newCategory);
    }

    async update(id: UUID, category: Partial<CategoryEntity>): Promise<CategoryEntity | null> {
        await this.repo.update(id, category);
        return this.repo.findOne({ where: { id }, relations: ["user"] });
    }

    async delete(id: UUID): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }

    async findById(id: UUID): Promise<CategoryEntity | null> {
        return this.repo.findOne({ where: { id }, relations: ["user"] });
    }

    async findAll(): Promise<CategoryEntity[]> {
        return this.repo.find({ relations: ["user"], order: { created_at: "DESC" } });
    }

}