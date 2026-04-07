import { UserRepo } from "../../infrastructure/database/repository/user/user.repo";
import type { UserType } from "../../types/user";
import { AppError } from "../../utils/AppError";
import { generateJwtToken } from "../../utils/generateToken";
import { makeHash, verifyHash } from "../../utils/hash";

export const registerUserService = async (data: UserType) => {

    const exists = await UserRepo.doesUserExist({ email: data?.email });
    if (exists) {
        throw new AppError("Account already exists with this email", 400);
    }

    const hashedPassword = await makeHash((data?.password || ""), 10);

    const newUser = await UserRepo.createUser({
        ...data,
        password: hashedPassword,
        status: 'ACTIVE' as any
    });

    const token = generateJwtToken({ id: newUser.id });

    return { user: newUser, token };
};

export const loginUserService = async (data: UserType) => {

    const user = await UserRepo.getUser({ email: data?.email });

    if (!user || !(await verifyHash(data.password || "", user.password))) {
        throw new AppError("Invalid email or password", 401);
    }

    if (user.status !== "ACTIVE") {
        throw new AppError(`Your account is ${user.status}. Contact support`, 403);
    }

    const token = generateJwtToken({ id: user.id });

    // Remove the password 
    const { password, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token,
    };
};

export const getUsersService = async () => {
    return UserRepo.getAllUsers();
}