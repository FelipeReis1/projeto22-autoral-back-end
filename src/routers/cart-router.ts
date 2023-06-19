import { Router } from "express";
import {
  getCart,
  createCart,
  // deleteFromCart,
  // updateCart,
} from "../controllers/cart-controller";

const cartRouter = Router();

cartRouter.get("/:id", getCart);
cartRouter.post("/", createCart);
// cartRouter.delete("/cart/:id", deleteFromCart);
// cartRouter.patch("/cart/:id", updateCart);

export { cartRouter };
