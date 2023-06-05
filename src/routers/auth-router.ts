import { Router } from "express";
import { createUser, loginUser } from "../controllers";
import { validateBody } from "../middlewares";
import { signUpSchema, signInSchema } from "../schemas";

const authenticationRouter = Router();

authenticationRouter.post("/signup", validateBody(signUpSchema), createUser);
authenticationRouter.post("/signin", validateBody(signInSchema), loginUser);

export { authenticationRouter };
