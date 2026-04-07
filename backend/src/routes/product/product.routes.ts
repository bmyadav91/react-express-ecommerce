import { Router } from "express";
import { getProducts, getProductByCategory } from "./product.handler"

export const productRouter = Router();

productRouter.get("/:id", getProducts);
productRouter.get("/category/:category", getProductByCategory);