import stocksRepository from "../../repositories/stocks-repository";
import productsRepository from "../../repositories/products-repository";
import { notFoundError } from "../../errors";

export async function getProductStock(id: number) {
  const productStockQuantity = await stocksRepository.getProductStock(
    Number(id)
  );
  if (!productStockQuantity) throw notFoundError();
  return productStockQuantity;
}

export async function createProductStock(id: number, amount: number) {
  const product = await productsRepository.findProductById(id);
  if (!product) throw notFoundError();
  return await stocksRepository.createProductStock(product.id, amount);
}

export async function deleteProductStock(productId: number): Promise<void> {
  const productExists = await stocksRepository.getProductStock(
    Number(productId)
  );
  if (!productExists) throw notFoundError();
  await stocksRepository.deleteProductStock(productId);
}

export async function updateProductStock(id: number, amount: number) {
  return await stocksRepository.updateProductStock(id, amount);
}

const stocksService = {
  createProductStock,
  getProductStock,
  deleteProductStock,
  updateProductStock,
};

export default stocksService;
