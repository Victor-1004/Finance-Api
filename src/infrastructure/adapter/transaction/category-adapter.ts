import type { UUID } from "node:crypto";
import type { Category } from "../../../app/domain/transactions/category.js";
import type { CategoryGateway } from "../../../app/gateway/transaction/category-gateway.js";
import type { CategoryRepository } from "../../repository/transaction/typeorm-category-repository.js";
import { entityArrayToDomain, entityToDomain } from "../mapper/transaction/category-mapper.js";

export class CategoryAdapter implements CategoryGateway {
  constructor(
    private categoryRepository: CategoryRepository 
  ) {}

  async create(userId: UUID, category: Category): Promise<void> {
    this.categoryRepository.create(userId, category);
  }

  async update(category: Category): Promise<Category | null> {
    return entityToDomain(await this.categoryRepository.update(category.id, category));
  }

  async delete(category: Category): Promise<void> {
    this.categoryRepository.delete(category.id);
  }

  async findById(id: UUID): Promise<Category | null> {
    return entityToDomain(await this.categoryRepository.findById(id));
  }

  async findAll(): Promise<Category[] | null> {
    return entityArrayToDomain(await this.categoryRepository.findAll());
  } 

  async findByUserId(userId: UUID): Promise<Category[] | null> {
    return entityArrayToDomain(await this.categoryRepository.findByUserId(userId));
  }
}
