import { Router } from "express";
import { getCartProducts } from "./cart.handler";

export const cartRouter = Router();

cartRouter.get("/:ids", getCartProducts)