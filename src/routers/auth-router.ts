import { Router } from "express";
import { createUser } from "../controllers";
import { validateBody } from "../middlewares";
import { signUpSchema } from "../schemas";

const authenticationRouter = Router();

authenticationRouter.post("/signup", validateBody(signUpSchema), createUser);

export { authenticationRouter };
