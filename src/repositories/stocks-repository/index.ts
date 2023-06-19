import { prisma } from "../../config";

async function getProductStock(id: number) {
  return await prisma.stock.findUnique({
    where: { productId: id },
    include: { products: true },
  });
}

async function createProductStock(id: number, data: number) {
  return prisma.stock.create({
    data: { productId: id, amount: data },
    include: { products: true },
  });
}

async function deleteProductStock(productId: number) {
  return prisma.stock.delete({ where: { productId } });
}

async function updateProductStock(id: number, amount: number) {
  return prisma.stock.update({
    where: { productId: id },
    data: { amount: amount },
  });
}

const stocksRepository = {
  getProductStock,
  createProductStock,
  deleteProductStock,
  updateProductStock,
};

export default stocksRepository;
