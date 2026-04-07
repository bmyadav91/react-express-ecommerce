import { Application } from "express";

// routers 
import { authRouter } from "./auth/auth.routes";
import { userRouter } from "./user/user.routes";
import { orderRouter } from "./order/order.routes";
import { homeRouter } from "./home/home.routes";
import { productRouter } from "./product/product.routes";
import { cartRouter } from "./cart/cart.routes";


export const registerRoutes = (app: Application) => {
    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    app.use("/orders", orderRouter);
    app.use("/", homeRouter);
    app.use("/products", productRouter);
    app.use("/carts", cartRouter);
};