import type { Category } from "../../../app/domain/transactions/category.js";
import type { CategoryGateway } from "../../../app/gateway/transaction/category-gateway.js";
import { db } from "../../../database/config.js";
import CategoryRepository from "../../repository/transaction/category-repository.js";

export class CategoryAdapter implements CategoryGateway {
  constructor(
    private categoryRepository: CategoryRepository = new CategoryRepository(db),
  ) {}

  async create(userId: string, category: Category): Promise<void> {
    this.categoryRepository.create(userId, category);
  }

  async update(category: Category): Promise<Category> {
    return this.categoryRepository.update(category);
  }

  async delete(category: Category): Promise<void> {
    this.categoryRepository.delete(category);
  }

  async findById(id: string): Promise<Category> {
    return this.categoryRepository.findById(id);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findByUserId(userId: string): Promise<Category[]> {
    return this.categoryRepository.findByUserId(userId);
  }
}
