import { Router } from "express";
import { UserInteractor } from "../../../app/interactor/user/user-interactor.js";
import { UserAdapter } from "../../adapter/user/user-adapter.js";
import { TransactionAdapter } from "../../adapter/transaction/transaction-adapter.js";
import { CategoryAdapter } from "../../adapter/transaction/category-adapter.js";

export const router = Router();

const userInteractor = new UserInteractor(
  new UserAdapter(),
  new TransactionAdapter(),
  new CategoryAdapter(),
);

router.get("/", async (req: any, res: any) => {
  const userInSession = req.headers.user;
  const page = req.query.pageT;
  const size = req.query.sizeT;
  const user = await userInteractor.findById(userInSession.id, page, size);
  res.json(user);
});
/* 
router.put("/:id", async (req, res) => {
  const user = await userInteractor.update(req.body);
  res.json(user);
}); */
/* 
router.delete("/:id", async (req, res) => {
  const user = await userInteractor.delete(req.body);
  res.json(user);
}); */

export default router;
