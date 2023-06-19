import { notFoundError } from "errors";
import cartRepository from "../../repositories/cart-repository";
import stocksRepository from "repositories/stocks-repository";
import { cart } from "@prisma/client";

export async function getCart(id: number) {
  const cart = await cartRepository.getCart(id);
  if (!cart) throw notFoundError();
  return cart;
}

export async function createCart(
  userId: number,
  productId: number,
  amount: number
): Promise<cart> {
  const product = await stocksRepository.getProductStock(productId);
  if (product.amount < amount)
    throw new Error("Quantidade solicitada não disponível em estoque!");
  return await cartRepository.createCart(userId, productId, amount);
}

export async function deleteCart(id: number) {
  const cartExists = await cartRepository.getCart(id);
  if (!cartExists) throw notFoundError();
  await cartRepository.deleteCart(id);
}

const cartService = { getCart, createCart, deleteCart };

export default cartService;
