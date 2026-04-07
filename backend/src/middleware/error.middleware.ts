import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err); // log for debugging

    // Prisma error example
    if (err.code === "P2002") {
        return res.status(400).json({
            message: "Duplicate field value",
        });
    }

    // Known app error
    if (err instanceof AppError) {
        return res.status(err?.statusCode || 400).json({
            message: err.message,
        });
    }

    // Unknown error
    return res.status(500).json({
        message: "Something went wrong",
    });
};