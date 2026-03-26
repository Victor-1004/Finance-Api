import express from "express";
import userRoutes from "../infrastructure/routes/user-routes.js";


export async function createServer() {
    const app = express()
    app.use(express.json())
    app.use("/user", userRoutes)
    app.get("/", (req, res) => {
        res.send("Hello World!")
    })
    return app
}