import { Router } from "express";
import {
  createProductStock,
  getProductStock,
  deleteProductStock,
  updateProductStock,
} from "../controllers/stocks-controller";

const stocksRouter = Router();

stocksRouter.post("/:id", createProductStock);
stocksRouter.get("/:id", getProductStock);
stocksRouter.delete("/:id", deleteProductStock);
stocksRouter.patch("/:id", updateProductStock);

export { stocksRouter };
