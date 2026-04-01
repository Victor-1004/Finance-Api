import { User } from "../../../../app/domain/user/user.js";
import { Category } from "../../../../app/domain/transactions/category.js";
import type { UserEntity } from "../../../entity/user/user-entity.js";

export function entityToDomain(userEntity: UserEntity | null): User | null {
    if (!userEntity) return null;

    const categories = userEntity.categories?.map(category => 
        new Category(
            category.id,
            category.name,
            category.user.id,
            category.is_default,
            category.created_at
        )
    ) || [];

    return new User(
        userEntity.id,
        userEntity.name,
        userEntity.email,
        userEntity.password,
        categories
    );
}

export function entityToSimpleDomain(userEntity: UserEntity | null): User | null {
    if (!userEntity) return null;

    return new User(
        userEntity.id,
        userEntity.name,
        userEntity.email,
        userEntity.password
    );
}

export function domainToEntity(user: User | null): Partial<UserEntity> {
    if (!user) return {};
    
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
    };
}