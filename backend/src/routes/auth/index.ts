import { Router, Request, Response } from "express";

export const authRouter = Router();

// login router 
authRouter.get("/login", (req: Request, res: Response) => {
    res.status(200).json({
        "message": "/login api is working."
    })
});


const registerUser = (req: Request, res: Response) => {
    res.json({
        message: "register api working"
    });
};

authRouter.get("/register", registerUser);

