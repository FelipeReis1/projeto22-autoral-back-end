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

const stocksRepository = {
  getProductStock,
  createProductStock,
};

export default stocksRepository;
