import Joi, { optional } from "joi";
import { CreateProductParams } from "../services";

export const productSchema = Joi.object<CreateProductParams>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  itemQuality: Joi.number().required(),
  category: Joi.string().required(),
});

export const productUpdateSchema = Joi.object<CreateProductParams>({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  image: Joi.string().optional(),
  itemQuality: Joi.number().optional(),
  category: Joi.string().optional(),
});
