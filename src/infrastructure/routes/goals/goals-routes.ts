import { Router } from "express";
import { GoalsRepository } from "../../repository/goals/typeorm-goals-repository.js";
import { GoalsAdapter } from "../../adapter/goals/goals-adapter.js";
import { GoalsInteractor } from "../../../app/interactor/goals/goals-interactor.js";
import type { UUID } from "node:crypto";
import { TransactionAdapter } from "../../adapter/transaction/transaction-adapter.js";
import { TransactionRepository } from "../../repository/transaction/typeorm-transaction-repository.js";
import { ApiError } from "../../../app/errors/api.js";

export const goalRouter = Router();

const goalInteractor = new GoalsInteractor(new GoalsAdapter(new GoalsRepository()), new TransactionAdapter(new TransactionRepository()));

goalRouter.get("/", async (req: any, res: any) => {
    const user = req.headers.user;
    let page = req.query.page ? parseInt(req.query.page) : null;
    let size = req.query.size ? parseInt(req.query.size) : null;
    const category = req.query.categoryId as UUID | null;
    try {
        const result = await goalInteractor.findByUserId(page, size, user.id as UUID, category);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in GET /goal:", error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ error: "Internal server error", details: String(error) });
        }
    }
});

goalRouter.post("/", async (req: any, res: any) => {
    const user = req.headers.user;
    const categoryId = req.body.category_id as UUID | null;
    try {
        const { category_id, ...bodyWithoutCategory } = req.body;
        
        let goalData = {
            ...bodyWithoutCategory,
            user: { id: user.id }
        };

        if(categoryId) {
            goalData = {
                ...goalData,
                category: { id: categoryId }
            };
        }
        
        const createdGoal = await goalInteractor.create(goalData);
        
        res.status(201).json(createdGoal);
    }
    catch (error) {
        console.error("POST /goal - error:", error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ error: "Internal server error", details: String(error) });
        }
    }
});

goalRouter.put("/:id", async (req: any, res: any) => {
    const user = req.headers.user;
    const id = req.params.id as UUID;
    const categoryId = req.body.category_id as UUID | null;
    try {
        const { category_id, ...bodyWithoutCategory } = req.body;
        
        let goalData = bodyWithoutCategory;

        if(categoryId) {
            goalData = {
                ...goalData,
                category: { id: categoryId }
            };
        }
        
        const updatedGoal = await goalInteractor.update(id, goalData, user.id as UUID);
        return res.status(200).json(updatedGoal);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

goalRouter.delete("/:id", async (req: any, res: any) => {
    const user = req.headers.user;
    const id = req.params.id as UUID;
    try {
        await goalInteractor.delete(id, user.id as UUID);
        res.status(204).json({ message: "Goal deleted successfully" });
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});






