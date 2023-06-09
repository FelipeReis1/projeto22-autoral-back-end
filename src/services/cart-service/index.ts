import { notFoundError } from "errors";
import cartRepository from "../../repositories/cart-repository";
import stocksRepository from "repositories/stocks-repository";
import { cart } from "@prisma/client";

export async function getCart(id: number) {
  const cart = await cartRepository.getCart(id);
  if (!cart) throw notFoundError();
  return cart;
}

export async function getCarts() {
  const carts = await cartRepository.getCarts();
  if (!carts) throw notFoundError();
  return carts;
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

// export async function addToCart(
//   id: number,
//   productId: number,
//   amount: number
// ): Promise<cart> {
//   const product = await stocksRepository.getProductStock(productId);
//   if (product.amount < amount)
//     throw new Error("Quantidade solicitada não disponível em estoque!");
//   return await cartRepository.addToCart(id, productId, amount);
// }

const cartService = { getCart, createCart, deleteCart, getCarts };

export default cartService;
