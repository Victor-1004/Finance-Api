import { Router } from "express";
import { CategoryInteractor } from "../../../app/interactor/transaction/category-interactor.js";
import { CategoryAdapter } from "../../adapter/transaction/category-adapter.js";
import { CategoryRepository } from "../../repository/transaction/typeorm-category-repository.js";

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
  const user = req.headers.user;
  const category = await categoryInteractor.create(user.id, req.body);
  res.json(category);
});

categoryRouter.put("/:id", async (req, res) => {
  const category = await categoryInteractor.update(req.body);
  res.json(category);
});

categoryRouter.delete("/:id", async (req, res) => {
  const category = await categoryInteractor.delete(req.body);
  res.json(category);
});

categoryRouter.get("/:id", async (req, res) => {
  const category = await categoryInteractor.findById(req.params.id);
  res.json(category);
});

export default categoryRouter;
