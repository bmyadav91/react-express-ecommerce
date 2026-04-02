import { Application } from "express";

// routers 
import { authRouter } from "./auth";

export const registerRoutes = (app: Application) => {
    app.use("/auth", authRouter);
};