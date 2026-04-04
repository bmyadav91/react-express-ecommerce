import { AuthRepo } from "../../infrastructure/database/repository/auth/auth.repo";
import type { UserType } from "../../types/user";

export const registerUserService = async (data: UserType) => {
    return AuthRepo.createUse(data);
}

export const getUsersService = async () => {
    return AuthRepo.getAllUsers();
}