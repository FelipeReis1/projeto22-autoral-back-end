import { Router } from "express";
import { validateBody } from "../middlewares";
import {
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/products-controller";
import { productSchema, productUpdateSchema } from "../schemas";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.post(
  "/products-registration",
  validateBody(productSchema),
  createProduct
);
productsRouter.patch(
  "/products-update/:id",
  validateBody(productUpdateSchema),
  updateProduct
);
//productsRouter.delete("/", deleteProduct);

export { productsRouter };
