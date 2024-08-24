import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const filesClient = prisma.file;
export const filetypeClient = prisma.fileType;
export const usersClient = prisma.user;
