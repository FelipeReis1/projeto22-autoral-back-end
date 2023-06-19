import { prisma } from "../../config";

async function getCart(id: number) {
  return prisma.cart.findUnique({
    where: { id: id },
    include: {
      users: { select: { id: true, email: true, name: true } },
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          itemQuality: true,
          category: true,
        },
      },
    },
  });
}

async function createCart(userId: number, productId: number, amount: number) {
  await prisma.stock.update({
    where: { productId },
    data: { amount: { decrement: amount } },
  });
  return prisma.cart.create({
    data: {
      amount,
      users: {
        connect: { id: userId },
      },
      products: {
        connect: { id: productId },
      },
    },
    include: {
      users: { select: { id: true, email: true, name: true } },
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          itemQuality: true,
          category: true,
        },
      },
    },
  });
}

const cartRepository = { getCart, createCart };

export default cartRepository;
