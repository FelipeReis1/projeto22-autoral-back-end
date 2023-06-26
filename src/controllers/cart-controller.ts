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

export async function getCarts(req: Request, res: Response) {
  try {
    const carts = await cartService.getCarts();
    return res.status(httpStatus.OK).send(carts);
  } catch (error) {
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

export async function deleteCart(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await cartService.deleteCart(Number(id));
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  }
}

// export async function addToCart(req: Request, res: Response) {
//   const { id } = req.params;
//   const { productId, amount } = req.body;
//   try {
//     await cartService.addToCart(Number(id), Number(productId), Number(amount));
//     return res.sendStatus(httpStatus.OK);
//   } catch (error) {
//     if (error.name === "NotFoundError") {
//       return res.status(httpStatus.NOT_FOUND).send(error.message);
//     } else {
//       return res.status(httpStatus.BAD_REQUEST).send(error.message);
//     }
//   }
// }
