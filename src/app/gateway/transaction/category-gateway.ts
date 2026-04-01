import type { Category } from "../../domain/transactions/category.js";

export interface CategoryGateway {
  create(userId: string, category: Category): Promise<void>;
  update(category: Category): Promise<Category | null>;
  delete(category: Category): Promise<void>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[] | null>;
  findByUserId(userId: string): Promise<Category[] | null>;
}
