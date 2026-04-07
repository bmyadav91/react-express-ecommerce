import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { AsyncHandler } from "../utils/asyncHandler";


export const protect = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    let token;

    // Check if token exists in the headers (starts with 'Bearer') 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw new AppError("You're not login", 401)
    }

    // verify the token 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        // get id and attachto body 
        (req as any).user = decoded?.id

        // move to the next function 
        next();
    } catch (err) {
        throw new AppError("Invalid token. Please login again.", 401);
    }

});