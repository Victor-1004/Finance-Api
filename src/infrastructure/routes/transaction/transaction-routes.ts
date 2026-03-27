import { Router } from "express";
import { TransactionInteractor } from "../../../app/interactor/transaction/transaction-interactor.js";
import { TransactionAdapter } from "../../adapter/transaction/transaction-adapter.js";
import { UserAdapter } from "../../adapter/user/user-adapter.js";
import { CategoryAdapter } from "../../adapter/transaction/category-adapter.js";

export const transactionRoutes = Router();

const transactionInteractor = new TransactionInteractor(
  new TransactionAdapter(),
  new UserAdapter(),
  new CategoryAdapter(),
);

transactionRoutes.get("/", async (req: any, res: any) => {
  const user = req.headers.user;
  const page = req.query.page;
  const size = req.query.size;
  const transactions = await transactionInteractor.findByUserId(user.id, page, size);
  res.json(transactions);
});

transactionRoutes.post("/", async (req: any, res: any) => {
  const user = req.headers.user;
  const transaction = await transactionInteractor.create(user.id, req.body);
  res.json(transaction);
});

transactionRoutes.put("/:id", async (req: any, res: any) => {
  const user = req.headers.user;
  const transaction = await transactionInteractor.update(req.body);
  res.json(transaction);
});

transactionRoutes.delete("/:id", async (req: any, res: any) => {
  const user = req.headers.user;
  const transaction = await transactionInteractor.delete(req.body);
  res.json(transaction);
});

transactionRoutes.get("/:id", async (req: any, res: any) => {
  const user = req.headers.user;
  const transaction = await transactionInteractor.findById(req.params.id);
  res.json(transaction);
});
