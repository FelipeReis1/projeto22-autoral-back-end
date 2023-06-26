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

// src/controllers/stocks-controller.ts
var stocks_controller_exports = {};
__export(stocks_controller_exports, {
  createProductStock: () => createProductStock3,
  deleteProductStock: () => deleteProductStock3,
  getProductStock: () => getProductStock3,
  updateProductStock: () => updateProductStock3
});
module.exports = __toCommonJS(stocks_controller_exports);
var import_http_status = __toESM(require("http-status"), 1);

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

// src/repositories/products-repository/index.ts
async function createProduct(data) {
  return prisma.products.create({ data });
}
async function getProduct(name, description, price, image, itemQuality, category) {
  return prisma.products.findFirst({
    where: { name, description, price, image, itemQuality, category }
  });
}
async function getProducts() {
  return prisma.products.findMany({
    orderBy: { id: "asc" },
    include: { stock: true }
  });
}
async function updateProduct(id, data) {
  return prisma.products.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      itemQuality: data.itemQuality,
      category: data.category,
      updatedAt: new Date(Date.now())
    }
  });
}
async function deleteProduct(id) {
  return prisma.products.delete({ where: { id } });
}
async function findProductById(id) {
  return prisma.products.findUnique({ where: { id } });
}
var productsRepository = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  findProductById
};
var products_repository_default = productsRepository;

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "The requested resource was not found "
  };
}

// src/services/stocks-service/index.ts
async function getProductStock2(id) {
  const productStockQuantity = await stocks_repository_default.getProductStock(
    Number(id)
  );
  if (!productStockQuantity)
    throw notFoundError();
  return productStockQuantity;
}
async function createProductStock2(id, amount) {
  const product = await products_repository_default.findProductById(id);
  if (!product)
    throw notFoundError();
  return await stocks_repository_default.createProductStock(product.id, amount);
}
async function deleteProductStock2(productId) {
  const productExists = await stocks_repository_default.getProductStock(
    Number(productId)
  );
  if (!productExists)
    throw notFoundError();
  await stocks_repository_default.deleteProductStock(productId);
}
async function updateProductStock2(id, amount) {
  return await stocks_repository_default.updateProductStock(id, amount);
}
var stocksService = {
  createProductStock: createProductStock2,
  getProductStock: getProductStock2,
  deleteProductStock: deleteProductStock2,
  updateProductStock: updateProductStock2
};
var stocks_service_default = stocksService;

// src/controllers/stocks-controller.ts
async function createProductStock3(req, res) {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const productStock = await stocks_service_default.createProductStock(
      Number(id),
      amount
    );
    return res.status(import_http_status.default.CREATED).send(productStock);
  } catch (error) {
    return res.status(import_http_status.default.BAD_REQUEST).send(error.message);
  }
}
async function getProductStock3(req, res) {
  const { id } = req.params;
  try {
    const productStockQuantity = await stocks_service_default.getProductStock(
      Number(id)
    );
    return res.status(import_http_status.default.OK).send(productStockQuantity);
  } catch (error) {
    return res.status(import_http_status.default.NOT_FOUND).send(error.message);
  }
}
async function deleteProductStock3(req, res) {
  const { id } = req.params;
  try {
    await stocks_service_default.deleteProductStock(Number(id));
    return res.sendStatus(import_http_status.default.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(import_http_status.default.NOT_FOUND).send(error.message);
    } else {
      return res.status(import_http_status.default.BAD_REQUEST).send(error.message);
    }
  }
}
async function updateProductStock3(req, res) {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const productStock = await stocks_service_default.updateProductStock(
      Number(id),
      amount
    );
    return res.status(import_http_status.default.OK).send(productStock);
  } catch (error) {
    return res.status(import_http_status.default.BAD_REQUEST).send(error.message);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProductStock,
  deleteProductStock,
  getProductStock,
  updateProductStock
});
