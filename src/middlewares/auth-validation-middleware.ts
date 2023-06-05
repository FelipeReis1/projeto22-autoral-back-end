import { unauthorizedError } from "../errors/unauthorized-error.js";
import authRepository from "../repositories/auth-repository";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtSecret } from "../config/envs.js";

async function authValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw unauthorizedError();

  jwt.verify(token, jwtSecret, async (error, decoded) => {
    try {
      if (error) throw unauthorizedError();

      const payload = decoded as JwtPayload;

      const user = await authRepository.findById(payload.userId);

      if (!user) throw unauthorizedError();

      res.locals.user = user;

      next();
    } catch (err) {
      next(err);
    }
  });
}

export default { authValidation };
