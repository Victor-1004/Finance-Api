import { Category } from "../../../../app/domain/transactions/category.js";
import type { CategoryEntity } from "../../../entity/transaction/category-entity.js";

export function entityToDomain(categoryEntity: CategoryEntity | null): Category | null {
    if (!categoryEntity) return null;

    return new Category(
        categoryEntity.id,
        categoryEntity.name,
        categoryEntity.user?.id || "",
        categoryEntity.is_default,
        categoryEntity.created_at
    );
}

export function entityArrayToDomain(categoryEntities: CategoryEntity[] | null): Category[] {
    if (!categoryEntities) return [];

    return categoryEntities.map(category =>
        new Category(
            category.id,
            category.name,
            category.user?.id || "",
            category.is_default,
            category.created_at
        )
    );
}

export function domainToEntity(category: Category | null): Partial<CategoryEntity> {
    if (!category) return {};

    return {
        id: category.id,
        name: category.name,
        is_default: category.is_default,
    };
}

export function domainArrayToEntity(categories: Category[] | null): Partial<CategoryEntity>[] {
    if (!categories) return [];

    return categories.map(category => ({
        id: category.id,
        name: category.name,
        is_default: category.is_default,
    }));
}
