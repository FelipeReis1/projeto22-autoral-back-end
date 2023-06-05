import { Prisma } from "@prisma/client";
import { prisma } from "../../config";

async function findByEmail(email: string) {
  return prisma.users.findUnique({ where: { email } });
}

async function create(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({ data });
}

async function findById(id: number) {
  return prisma.users.findUnique({ where: { id } });
}

const authRepository = {
  findByEmail,
  create,
  findById,
};

export default authRepository;
