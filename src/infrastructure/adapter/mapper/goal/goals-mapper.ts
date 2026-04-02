import { Goal } from "../../../../app/domain/goals/goals.js";
import { Category } from "../../../../app/domain/transactions/category.js";
import type { GoalEntity } from "../../../entity/goals/goals-entity.js";

export function entityToDomain(goalEntity: GoalEntity): Goal | null {
    if (!goalEntity) return null;
    const goal = new Goal();
    goal.id = goalEntity.id;
    goal.name = goalEntity.name;
    goal.target_amount = Number(goalEntity.target_amount);
    goal.start_date = goalEntity.start_date;
    goal.deadline = goalEntity.deadline;
    goal.created_at = goalEntity.created_at;
    
    if (goalEntity.category) {
        goal.category = new Category(
            goalEntity.category.id,
            goalEntity.category.name,
            goalEntity.category.user?.id || "" as any,
            goalEntity.category.is_default,
            goalEntity.category.created_at
        );
    }
    
    return goal;
}

export function domainToEntity(goal: Goal): Partial<GoalEntity> {
    return {
        id: goal.id,
        name: goal.name,
        target_amount: goal.target_amount,
        start_date: goal.start_date,
        deadline: goal.deadline,
        created_at: goal.created_at,
    };
}

function entityArrayToDomain(goalEntities: GoalEntity[] | null): Goal[] {
    if (!goalEntities) return [];
    return goalEntities.map(entityToDomain).filter((goal): goal is Goal => goal !== null);
}

export function domainArrayToEntity(goals: Goal[] | null): Partial<GoalEntity>[] {
    if (!goals) return [];
    return goals.map(domainToEntity);
}

export { entityArrayToDomain };

