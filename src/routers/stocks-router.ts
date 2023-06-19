import { Router } from "express";
import {
  createProductStock,
  getProductStock,
} from "../controllers/stocks-controller";

const stocksRouter = Router();

stocksRouter.post("/:id", createProductStock);
stocksRouter.get("/:id", getProductStock);

export { stocksRouter };
