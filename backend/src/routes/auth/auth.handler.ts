import { Request, Response } from "express"
import { registerUserService, getUsersService } from "../../services/auth/auth.service"

export const registerUser = async (req: Request, res: Response) => {
    const user = await registerUserService(req.body);
    res.json(user);
}

export const getUsers = async (req: Request, res: Response) => {
    const users = await getUsersService();
    res.json(users);
}
