import { Router } from "express";
import {
  getCart,
  getCarts,
  createCart,
  deleteCart,
  //addToCart,
} from "../controllers/cart-controller";

const cartRouter = Router();

cartRouter.get("/:id", getCart);
cartRouter.get("/", getCarts);
cartRouter.post("/", createCart);
cartRouter.delete("/:id", deleteCart);
//cartRouter.patch("/:id", addToCart);

export { cartRouter };
