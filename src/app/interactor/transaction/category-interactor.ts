import type { UUID } from "node:crypto";
import type { Category } from "../../../app/domain/transactions/category.js";
import type { CategoryGateway } from "../../gateway/transaction/category-gateway.js";
import { ApiError } from "../../errors/api.js";

export class CategoryInteractor {
  constructor(private categoryGateway: CategoryGateway) {}

  async create(userId: UUID, category: Category): Promise<Category | null> {
    const existingCategory = await this.categoryGateway.findByNameAndUserId(category.name, userId);
    if (existingCategory) {
      throw new ApiError("Categoria com este nome já existe para seu usuário", 409);
    }
    return this.categoryGateway.create(userId, category);
  }

  async update(category: Category): Promise<Category | null> {
    return this.categoryGateway.update(category);
  }

  async delete(category: UUID): Promise<void> {
    return this.categoryGateway.delete(category);
  }

  async findById(id: string): Promise<Category | null> {

    const category = await this.categoryGateway.findById(id);
    if (!category) {
      throw new ApiError("Categoria não encontrada", 400);
    }
    return category;
  }

  async findAll(): Promise<Category[] | null> {
    return this.categoryGateway.findAll();
  }

  async findByUserId(userId: string): Promise<Category[] | null> {
    return this.categoryGateway.findByUserId(userId);
  }
}
