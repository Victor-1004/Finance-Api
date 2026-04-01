import { Router } from "express";
import { CategoryInteractor } from "../../../app/interactor/transaction/category-interactor.js";
import { CategoryAdapter } from "../../adapter/transaction/category-adapter.js";
import { CategoryRepository } from "../../repository/transaction/typeorm-category-repository.js";
import type { UUID } from "node:crypto";
import { ApiError } from "../../../app/errors/api.js";

export const categoryRouter = Router();

const categoryInteractor = new CategoryInteractor(new CategoryAdapter(new CategoryRepository()));

categoryRouter.get("/", async (req, res) => {
  const categories = await categoryInteractor.findAll();
  res.json(categories);
});

categoryRouter.get("/find", async (req: any, res: any) => {
  const categories = await categoryInteractor.findByUserId(req.headers.user.id);
  res.json(categories);
});

categoryRouter.post("/", async (req: any, res: any) => {
  try {
    const user = req.headers.user;
    const category = await categoryInteractor.create(user.id, req.body);
    res.status(201).json(category);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    throw error;
  }
});

categoryRouter.put("/:id", async (req, res) => {
  try {
    const category = await categoryInteractor.update(req.body);
    res.json(category);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    throw error;
  }
});

categoryRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await categoryInteractor.delete(id as UUID);
    res.status(200).json({ message: "Categoria excluída com sucesso" });
  } catch (error: Error | any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    throw error;
  }
});

categoryRouter.get("/:id", async (req, res) => {
  const category = await categoryInteractor.findById(req.params.id);
  res.json(category);
});

export default categoryRouter;
