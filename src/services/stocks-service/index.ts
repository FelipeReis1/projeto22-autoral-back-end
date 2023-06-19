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

const stocksService = {
  createProductStock,
  getProductStock,
};

export default stocksService;
