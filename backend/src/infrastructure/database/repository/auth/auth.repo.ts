import { prisma } from "../../../../config/db";
import type { UserType } from "../../../../types/user";

export const AuthRepo = {
    createUse: (data: UserType) => {
        return prisma.user.create({ data })
    },

    getAllUsers: () => {
        return prisma.user.findMany();
    }
}