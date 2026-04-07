import { prisma } from "../../../../config/db";
import type { UserType } from "../../../../types/user";

export const UserRepo = {

    // create a user 
    createUser: async (data: UserType) => {
        return await prisma.user.create({

            data: data as any,
            select: {
                id: true,
                email: true,
                name: true,
                status: true,
                created_at: true
            }
        })
    },

    // get user list 
    getAllUsers: async () => {
        return await prisma.user.findMany();
    },

    // find user by email (return user full object)
    getUser: async ({ id, email }: { id?: string, email?: string }) => {
        if (!id && !email) {
            throw new Error("Developer Error: Must proivde either an id or email.")
        }

        const whereClause = id ? { id: id } : { email: email };

        return await prisma.user.findUnique({
            where: whereClause,
            // If you use 'select', you MUST include password and status for login!
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                status: true,
                created_at: true
            }
        });
    },

    // check user existance only 
    doesUserExist: async ({ id, email }: { id?: string, email?: string }) => {
        if (!id && !email) {
            throw new Error("Developer Error: Must proivde either an id or email.")
        }

        const whereClause = id ? { id: id } : { email: email };

        const user = await prisma.user.findUnique({
            where: whereClause,
            select: { id: true }
        })

        return !!user
    }

}