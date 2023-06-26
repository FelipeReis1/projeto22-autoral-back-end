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

// src/repositories/cart-repository/index.ts
var cart_repository_exports = {};
__export(cart_repository_exports, {
  default: () => cart_repository_default
});
module.exports = __toCommonJS(cart_repository_exports);

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
