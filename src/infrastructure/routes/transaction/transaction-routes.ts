import { json, Router } from "express";
import { TransactionInteractor } from "../../../app/interactor/transaction/transaction-interactor.js";
import { TransactionAdapter } from "../../adapter/transaction/transaction-adapter.js";
import { TransactionRepository } from "../../repository/transaction/typeorm-transaction-repository.js";
import { ApiError } from "../../../app/errors/api.js";

export const transactionRoutes = Router();

const transactionInteractor = new TransactionInteractor(new TransactionAdapter(new TransactionRepository()));

transactionRoutes.get("/", async (req: any, res: any) => {
  const user = req.headers.user;
  const initialDate = req.query.initialDate ? new Date(req.query.initialDate) : null;
  const finalDate = req.query.finalDate ? new Date(req.query.finalDate) : null;
  const category = req.query.category;
  const page = req.query.page;
  const size = req.query.size;
  const transactions = await transactionInteractor.findByUserId(user.id, initialDate, finalDate, category, page, size);
  res.json(transactions);
});

transactionRoutes.post("/", async (req: any, res: any) => {
  const user = req.headers.user;
  if (req.body.category && !req.body.category_id) {
    req.body.category_id = req.body.category;
  }
  if (typeof req.body.date === 'string') {
    req.body.date = new Date(`${req.body.date}T00:00:00Z`);
  }
  await transactionInteractor.create(user.id, req.body);
  res.status(201).json({ message: "Transaction created successfully" });
});

transactionRoutes.get("/balance", async (req: any, res: any) => {
  const user = req.headers.user;
  const initialDate = req.query.initialDate ? new Date(req.query.initialDate) : null;
  const finalDate = req.query.finalDate ? new Date(req.query.finalDate) : null;
  const category = req.query.category;
  try {
    const balance = await transactionInteractor.findBalanceByUserId(user.id, initialDate, finalDate, category);
    res.json({ balance });
  } catch (error) {
    if(error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

transactionRoutes.put("/:id", async (req: any, res: any) => {
  const user = req.headers.user;
  if (req.body.category && !req.body.category_id) {
    req.body.category_id = req.body.category;
  }
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
