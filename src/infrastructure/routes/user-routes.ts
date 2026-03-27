import { Router } from "express";
import { UserInteractor } from "../../app/interactor/user/user-interactor.js";
import { UserAdapter } from "../adapter/user/user-adapter.js";
import { AuthInteractor } from "../../app/interactor/auth-interactor.js";

export const router = Router();

const userInteractor = new UserInteractor(new UserAdapter());
const authInteractor = new AuthInteractor(new UserAdapter());

router.post("/", async (req, res) => {
  const user = await userInteractor.create(req.body);
  res.json(user);
});

router.get("/find", authInteractor.middleware, async (req, res) => {
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 10;

  const users = await userInteractor.find(page, size);
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await userInteractor.findById(req.params.id);
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const user = await userInteractor.update(req.body);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const user = await userInteractor.delete(req.body);
  res.json(user);
});

export default router;
