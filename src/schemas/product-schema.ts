import Joi from "joi";
import { CreateProductParams } from "../services";

export const productSchema = Joi.object<CreateProductParams>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  itemQuality: Joi.number().required(),
  category: Joi.string().required(),
});
