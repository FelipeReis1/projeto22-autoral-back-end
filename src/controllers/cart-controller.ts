import { Request, Response } from "express";
import httpStatus from "http-status";
import cartService from "../services/cart-service";

export async function getCart(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const cart = await cartService.getCart(Number(id));
    return res.status(httpStatus.OK).send(cart);
  } catch (error: any) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function createCart(req: Request, res: Response) {
  const { userId, productId, amount } = req.body;
  try {
    const cart = await cartService.createCart(
      Number(userId),
      Number(productId),
      Number(amount)
    );
    return res.status(httpStatus.CREATED).send(cart);
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}
