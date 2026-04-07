import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { registerUser, loginUser, getUsers } from "./auth.handler";

export const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
