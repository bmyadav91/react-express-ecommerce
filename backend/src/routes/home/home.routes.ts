import { Router } from "express";

import { homeProducts } from "./home.handler";


export const homeRouter = Router();

homeRouter.get("/", homeProducts)