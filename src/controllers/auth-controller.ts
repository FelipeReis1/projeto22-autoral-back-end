import { Request, Response } from "express";
import httpStatus from "http-status";
import authService, { LoginUserParams } from "../services/auth-service";

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await authService.createUser({ name, email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error: any) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body as LoginUserParams;
  try {
    const token = await authService.loginUser({ email, password });
    return res.status(httpStatus.OK).send({ token });
  } catch (error: any) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
