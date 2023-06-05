import { Prisma } from "@prisma/client";
import { prisma } from "../../config";

async function findByEmail(email: string) {
  return prisma.users.findUnique({ where: { email } });
}

async function create(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({ data });
}

const authRepository = {
  findByEmail,
  create,
};

export default authRepository;
