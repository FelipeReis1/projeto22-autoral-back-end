import Joi from "joi";
import { CreateUserParams } from "../services";

export const signUpSchema = Joi.object<CreateUserParams>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
