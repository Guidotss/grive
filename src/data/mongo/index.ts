import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const filesClient = prisma.file;
export const usersClient = prisma.user;
