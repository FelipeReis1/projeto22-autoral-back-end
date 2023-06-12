import { Router } from "express";
import { validateBody } from "../middlewares";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
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
productsRouter.delete("/products-delete/:id", deleteProduct);

export { productsRouter };
