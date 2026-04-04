import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

// Safety check to prevent silent failures
if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Check your .env file!");
}

//  Create the pg connection pool
const pool = new Pool({ connectionString });

// Wrap the pool in the Prisma adapter
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Pass the adapter to PrismaClient
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}