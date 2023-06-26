var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/cart-service/index.ts
var cart_service_exports = {};
__export(cart_service_exports, {
  createCart: () => createCart2,
  default: () => cart_service_default,
  deleteCart: () => deleteCart2,
  getCart: () => getCart2,
  getCarts: () => getCarts2
});
module.exports = __toCommonJS(cart_service_exports);

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "The requested resource was not found "
  };
}

// src/config/envs.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_dotenv_expand = __toESM(require("dotenv-expand"), 1);
import_dotenv.default.config();
var jwtSecret = process.env.JWT_SECRET;

// src/config/database.ts
var import_client = require("@prisma/client");
var prisma;

// src/repositories/cart-repository/index.ts
async function getCart(id) {
  return prisma.cart.findUnique({
    where: { id },
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
          category: true
        }
      }
    }
  });
}
async function getCarts() {
  return prisma.cart.findMany();
}
async function createCart(userId, productId, amount) {
  await prisma.stock.update({
    where: { productId },
    data: { amount: { decrement: amount } }
  });
  return prisma.cart.create({
    data: {
      amount,
      users: {
        connect: { id: userId }
      },
      products: {
        connect: { id: productId }
      }
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
          category: true
        }
      }
    }
  });
}
async function deleteCart(id) {
  const cart = await getCart(id);
  await prisma.stock.update({
    where: { productId: cart.productId },
    data: { amount: { increment: cart.amount } }
  });
  return prisma.cart.delete({ where: { id } });
}
var cartRepository = { getCart, createCart, deleteCart, getCarts };
var cart_repository_default = cartRepository;

// src/repositories/stocks-repository/index.ts
async function getProductStock(id) {
  return await prisma.stock.findUnique({
    where: { productId: id },
    include: { products: true }
  });
}
async function createProductStock(id, data) {
  return prisma.stock.create({
    data: { productId: id, amount: data },
    include: { products: true }
  });
}
async function deleteProductStock(productId) {
  return prisma.stock.delete({ where: { productId } });
}
async function updateProductStock(id, amount) {
  return prisma.stock.update({
    where: { productId: id },
    data: { amount }
  });
}
var stocksRepository = {
  getProductStock,
  createProductStock,
  deleteProductStock,
  updateProductStock
};
var stocks_repository_default = stocksRepository;

// src/services/cart-service/index.ts
async function getCart2(id) {
  const cart = await cart_repository_default.getCart(id);
  if (!cart)
    throw notFoundError();
  return cart;
}
async function getCarts2() {
  const carts = await cart_repository_default.getCarts();
  if (!carts)
    throw notFoundError();
  return carts;
}
async function createCart2(userId, productId, amount) {
  const product = await stocks_repository_default.getProductStock(productId);
  if (product.amount < amount)
    throw new Error("Quantidade solicitada n\xE3o dispon\xEDvel em estoque!");
  return await cart_repository_default.createCart(userId, productId, amount);
}
async function deleteCart2(id) {
  const cartExists = await cart_repository_default.getCart(id);
  if (!cartExists)
    throw notFoundError();
  await cart_repository_default.deleteCart(id);
}
var cartService = { getCart: getCart2, createCart: createCart2, deleteCart: deleteCart2, getCarts: getCarts2 };
var cart_service_default = cartService;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCart,
  deleteCart,
  getCart,
  getCarts
});
