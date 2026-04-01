import type { UUID } from "node:crypto";
import type { Category } from "../../domain/transactions/category.js";

export interface CategoryGateway {
  create(userId: string, category: Category): Promise<Category | null>;
  update(category: Category): Promise<Category | null>;
  delete(category: UUID): Promise<void>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[] | null>;
  findByUserId(userId: string): Promise<Category[] | null>;
  findByNameAndUserId(name: string, userId: UUID): Promise<Category | null>;
}
