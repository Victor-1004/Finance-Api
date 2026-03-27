import type { Category } from "../../domain/transactions/category.js";

export interface CategoryGateway {
  create(userId: string, category: Category): Promise<void>;
  update(category: Category): Promise<Category>;
  delete(category: Category): Promise<void>;
  findById(id: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  findByUserId(userId: string): Promise<Category[]>;
}
