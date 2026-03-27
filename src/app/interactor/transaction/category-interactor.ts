import type { Category } from "../../../app/domain/transactions/category.js";
import type { CategoryGateway } from "../../gateway/transaction/category-gateway.js";

export class CategoryInteractor {
  constructor(private categoryGateway: CategoryGateway) {}

  async create(userId: string, category: Category): Promise<void> {
    this.categoryGateway.create(userId, category);
  }

  async update(category: Category): Promise<Category> {
    return this.categoryGateway.update(category);
  }

  async delete(category: Category): Promise<void> {
    this.categoryGateway.delete(category);
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryGateway.findById(id);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryGateway.findAll();
  }

  async findByUserId(userId: string): Promise<Category[]> {
    return this.categoryGateway.findByUserId(userId);
  }
}
