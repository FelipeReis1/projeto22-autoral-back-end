import { Prisma } from "@prisma/client";
import { prisma } from "../../config";
import { Decimal } from "@prisma/client/runtime";

async function createProduct(data: Prisma.productsUncheckedCreateInput) {
  return prisma.products.create({ data });
}

async function getProduct(
  name: string,
  description: string,
  price: Decimal,
  image: string,
  itemQuality: Decimal,
  category: string
) {
  return prisma.products.findFirst({
    where: { name, description, price, image, itemQuality, category },
  });
}

async function getProducts() {
  return prisma.products.findMany();
}

async function updateProduct(
  id: number,
  data: Prisma.productsUncheckedUpdateInput
) {
  return prisma.products.update({
    where: { id: id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      itemQuality: data.itemQuality,
      category: data.category,
      updatedAt: new Date(Date.now()),
    },
  });
}

const productsRepository = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
};

export default productsRepository;
