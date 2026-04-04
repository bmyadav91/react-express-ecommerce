import { Router } from "express";
import { registerUser, getUsers } from "./auth.handler";

export const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.get("/users", getUsers);
