import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError, invalidCredentialsError } from "../../errors";
import authRepository from "../../repositories/auth-repository";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config";

//CREATE USER SECTION
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

//LOGIN USER SECTION

export async function loginUser({ email, password }: LoginUserParams) {
  const user = await checkIfUserExists(email);
  await checkPassword(password, user.password);

  const token = jwt.sign({ userId: user.id }, jwtSecret);

  return token;
}

async function checkIfUserExists(email: string) {
  const userExists = await authRepository.findByEmail(email);
  if (!userExists) throw invalidCredentialsError();

  return userExists;
}

async function checkPassword(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type LoginUserParams = Pick<users, "email" | "password">;

const authService = {
  createUser,
  loginUser,
};

export default authService;
