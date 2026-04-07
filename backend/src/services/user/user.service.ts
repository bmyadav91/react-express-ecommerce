import { UserRepo } from "../../infrastructure/database/repository/user/user.repo";
import { AppError } from "../../utils/AppError";


export const getUserProfileService = async ({ id, email }: { id?: string, email?: string }) => {
    if (!id && !email) {
        throw new AppError("User id or email must exist", 400)
    }

    const getUser = await UserRepo.getUser({ id: id, email: email })


    if (!getUser) {
        throw new AppError("User not exist", 404)
    }

    const { password, ...userWithoutPassword } = getUser;

    return userWithoutPassword;
}