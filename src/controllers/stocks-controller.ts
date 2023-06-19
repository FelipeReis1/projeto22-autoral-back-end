import { Request, Response } from "express";
import httpStatus from "http-status";
import stocksService from "../services/stocks-service";

export async function createProductStock(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const productStock = await stocksService.createProductStock(
      Number(id),
      amount
    );
    return res.status(httpStatus.CREATED).send(productStock);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function getProductStock(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const productStockQuantity = await stocksService.getProductStock(
      Number(id)
    );
    return res.status(httpStatus.OK).send(productStockQuantity);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function deleteProductStock(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await stocksService.deleteProductStock(Number(id));
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }
}

export async function updateProductStock(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const productStock = await stocksService.updateProductStock(
      Number(id),
      amount
    );
    return res.status(httpStatus.OK).send(productStock);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}
