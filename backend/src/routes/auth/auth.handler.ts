import { Request, Response } from "express"
import { AsyncHandler } from "../../utils/asyncHandler";
import { registerUserService, loginUserService, getUsersService } from "../../services/auth/auth.service"
import { AppError } from "../../utils/AppError";

export const registerUser = AsyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!email || !email.includes("@")) {
        throw new AppError("Email must be valid and required", 400);
    }
    if (!password) {
        throw new AppError("Password is required", 400)
    }

    const user = await registerUserService({
        "name": name,
        "email": email,
        "password": password
    });

    res.json(user);
})

export const loginUser = AsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError("Emaill and Password both are required");
    }

    const loginRes = await loginUserService({
        "email": email,
        "password": password
    })

    res.json(loginRes);
})

export const getUsers = AsyncHandler(async (req: Request, res: Response) => {
    const users = await getUsersService();
    res.json(users);
})
