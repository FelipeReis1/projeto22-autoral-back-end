import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../../errors";
import authRepository from "../../repositories/auth-repository";

export async function createUser({
  name,
  email,
  password,
}: CreateUserParams): Promise<users> {
  await checkForSameEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  return authRepository.create({
    name,
    email,
    password: hashedPassword,
  });
}

async function checkForSameEmail(email: string) {
  const sameEmail = await authRepository.findByEmail(email);
  if (sameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<users, "name" | "email" | "password">;

const authService = {
  createUser,
};

export default authService;
