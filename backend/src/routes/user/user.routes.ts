import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";

import { getMyProfile } from "./user.handler";

export const userRouter = Router();

userRouter.get("/me", protect, getMyProfile)