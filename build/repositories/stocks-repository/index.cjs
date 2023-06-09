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

// src/repositories/stocks-repository/index.ts
var stocks_repository_exports = {};
__export(stocks_repository_exports, {
  default: () => stocks_repository_default
});
module.exports = __toCommonJS(stocks_repository_exports);

// src/config/envs.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_dotenv_expand = __toESM(require("dotenv-expand"), 1);
import_dotenv.default.config();
var jwtSecret = process.env.JWT_SECRET;

// src/config/database.ts
var import_client = require("@prisma/client");
var prisma;

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
