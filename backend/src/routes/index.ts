import { Application } from "express";

// routers 
import { authRouter } from "./auth/auth.routes";

export const registerRoutes = (app: Application) => {
    app.use("/auth", authRouter);
};