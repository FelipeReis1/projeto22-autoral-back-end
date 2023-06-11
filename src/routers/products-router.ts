import { Router } from "express";
import { validateBody } from "../middlewares";
import { getProducts, createProduct } from "../controllers/products-controller";
import { productSchema } from "../schemas";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.post(
  "/products-registration",
  validateBody(productSchema),
  createProduct
);
// productsRouter.put(
//   "/productsUpdate",
//   validateBody(productsSchema),
//   updateProduct
// );
// productsRouter.delete("/", deleteProduct);

export { productsRouter };
