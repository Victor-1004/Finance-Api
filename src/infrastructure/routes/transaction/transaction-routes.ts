import { json, Router } from "express";
import { TransactionInteractor } from "../../../app/interactor/transaction/transaction-interactor.js";
import { TransactionAdapter } from "../../adapter/transaction/transaction-adapter.js";
import { TransactionRepository } from "../../repository/transaction/typeorm-transaction-repository.js";

export const transactionRoutes = Router();

const transactionInteractor = new TransactionInteractor(new TransactionAdapter(new TransactionRepository()));

transactionRoutes.get("/", async (req: any, res: any) => {
  const user = req.headers.user;
  const page = req.query.page;
  const size = req.query.size;
  const transactions = await transactionInteractor.findByUserId(user.id, page, size);
  res.json(transactions);
});

transactionRoutes.post("/", async (req: any, res: any) => {
  const user = req.headers.user;
  await transactionInteractor.create(user.id, req.body);
  res.status(201).json({ message: "Transaction created successfully" });
});

transactionRoutes.put("/:id", async (req: any, res: any) => {
  const user = req.headers.user;
  const transaction = await transactionInteractor.update(req.body);
  res.json(transaction);
});

transactionRoutes.delete("/:id", async (req: any, res: any) => {
  await transactionInteractor.delete(req.body);
  res.status(204).json({ message: "Transaction deleted successfully" });
});

transactionRoutes.get("/:id", async (req: any, res: any) => {
  const user = req.headers.user;
  const transaction = await transactionInteractor.findById(req.params.id);
  res.json(transaction);
});
