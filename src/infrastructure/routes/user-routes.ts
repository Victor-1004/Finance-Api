import { Router } from "express";
import { UserInteractor } from "../../app/interactor/user-interactor.js";
import { UserAdapter } from "../adapter/user-adapter.js";

export const router = Router()

const userInteractor = new UserInteractor(new UserAdapter())

router.post("/", async (req, res) => {
    const user = await userInteractor.create(req.body)
    res.json(user)
})

router.get("/", async (req, res) => {
    const users = await userInteractor.findAll()
    res.json(users)
})

router.get("/:id", async (req, res) => {
    const user = await userInteractor.findById(Number(req.params.id))
    res.json(user)
})

router.put("/:id", async (req, res) => {
    const user = await userInteractor.update(req.body)
    res.json(user)
})

router.delete("/:id", async (req, res) => {
    const user = await userInteractor.delete(req.body)
    res.json(user)
})

export default router