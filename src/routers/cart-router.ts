import { Router } from "express";
import {
  getCart,
  createCart,
  deleteCart,
  // updateCart,
} from "../controllers/cart-controller";

const cartRouter = Router();

cartRouter.get("/:id", getCart);
cartRouter.post("/", createCart);
cartRouter.delete("/:id", deleteCart);
// cartRouter.patch("/:id", updateCart);

export { cartRouter };
