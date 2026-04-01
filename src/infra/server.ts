import express from "express";
import { AuthInteractor } from "../app/interactor/auth-interactor.js";
import { UserAdapter } from "../infrastructure/adapter/user/user-adapter.js";
import categoryRoutes from "../infrastructure/routes/transaction/category-routes.js";
import { transactionRoutes } from "../infrastructure/routes/transaction/transaction-routes.js";
import { UserRepository } from "../infrastructure/repository/user/typeorm-user-repository.js";

const authInteractor = new AuthInteractor(new UserAdapter(new UserRepository()));

export async function createServer() {
  const app = express();
  app.use(express.json());
  app.use("/category", authInteractor.middleware, categoryRoutes);
  app.use("/transaction", authInteractor.middleware, transactionRoutes);
  app.post("/login", async (req, res) => {
    try {
      const token = await authInteractor.login(
        req.body.email,
        req.body.password,
      );
      res.json(token);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  });
  app.post("/register", async (req, res) => {
    try {
      const token = await authInteractor.register(
        req.body.name,
        req.body.email,
        req.body.password,
      );
      res.json(token);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  });
  return app;
}
