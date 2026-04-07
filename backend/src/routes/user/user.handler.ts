import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";

import { getUserProfileService } from "../../services/user/user.service";


export const getMyProfile = AsyncHandler(async(req: Request, res: Response) => {
    const userId = (req as any).user;
    if (!userId) {
        throw new AppError("User ID missing in the Token", 401)
    }

    const userRes = await getUserProfileService({id: userId})

    res.json(userRes);
})