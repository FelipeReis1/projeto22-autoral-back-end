import { products } from "@prisma/client";
import productsRepository from "../../repositories/products-repository";
import { conflictError } from "../../errors/conflict-error";
import { Decimal } from "@prisma/client/runtime";

export async function createProduct({
  name,
  description,
  price,
  image,
  itemQuality,
  category,
}: CreateProductParams): Promise<products> {
  await checkForSameProduct(
    name,
    description,
    price,
    image,
    itemQuality,
    category
  );
  return productsRepository.createProduct({
    name,
    description,
    price,
    image,
    itemQuality,
    category,
  });
}

async function checkForSameProduct(
  name: string,
  description: string,
  price: Decimal,
  image: string,
  itemQuality: Decimal,
  category: string
) {
  const sameProduct = await productsRepository.getProduct(
    name,
    description,
    price,
    image,
    itemQuality,
    category
  );
  if (sameProduct) {
    throw conflictError();
  }
}

export async function getProducts() {
  const products = await productsRepository.getProducts();
  return products;
}

export type CreateProductParams = Pick<
  products,
  "name" | "description" | "price" | "image" | "itemQuality" | "category"
>;

const productsService = {
  createProduct,
  getProducts,
};

export default productsService;
