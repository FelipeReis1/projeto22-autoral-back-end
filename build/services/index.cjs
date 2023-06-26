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

// src/services/index.ts
var services_exports = {};
__export(services_exports, {
  checkIfUserExists: () => checkIfUserExists,
  createCart: () => createCart2,
  createProduct: () => createProduct2,
  createProductStock: () => createProductStock2,
  createUser: () => createUser,
  deleteCart: () => deleteCart2,
  deleteProduct: () => deleteProduct2,
  deleteProductStock: () => deleteProductStock2,
  getCart: () => getCart2,
  getCarts: () => getCarts2,
  getProductStock: () => getProductStock2,
  getProducts: () => getProducts2,
  loginUser: () => loginUser,
  updateProduct: () => updateProduct2,
  updateProductStock: () => updateProductStock2
});
module.exports = __toCommonJS(services_exports);

// src/services/auth-service/index.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);

// src/errors/duplicated-email-error.ts
function duplicatedEmailError() {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email"
  };
}

// src/errors/invalid-credentials-error.ts
function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect"
  };
}

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

// src/repositories/auth-repository/index.ts
async function findByEmail(email) {
  return prisma.users.findUnique({ where: { email } });
}
async function create(data) {
  return prisma.users.create({ data });
}
async function findById(id) {
  return prisma.users.findUnique({ where: { id } });
}
var authRepository = {
  findByEmail,
  create,
  findById
};
var auth_repository_default = authRepository;

// src/services/auth-service/index.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
async function createUser({
  name,
  email,
  password
}) {
  await checkForSameEmail(email);
  const hashedPassword = await import_bcrypt.default.hash(password, 10);
  return auth_repository_default.create({
    name,
    email,
    password: hashedPassword
  });
}
async function checkForSameEmail(email) {
  const sameEmail = await auth_repository_default.findByEmail(email);
  if (sameEmail) {
    throw duplicatedEmailError();
  }
}
async function loginUser({ email, password }) {
  const user = await checkIfUserExists(email);
  await checkPassword(password, user.password);
  const token = import_jsonwebtoken.default.sign({ userId: user.id }, jwtSecret, { expiresIn: 86400 });
  return token;
}
async function checkIfUserExists(email) {
  const userExists = await auth_repository_default.findByEmail(email);
  if (!userExists)
    throw invalidCredentialsError();
  return userExists;
}
async function checkPassword(password, userPassword) {
  const isPasswordValid = await import_bcrypt.default.compare(password, userPassword);
  if (!isPasswordValid)
    throw invalidCredentialsError();
}

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

// src/errors/conflict-error.ts
function conflictError() {
  return {
    name: "ConflictError",
    message: "This product is already registered"
  };
}

// src/services/products-service/index.ts
async function createProduct2({
  name,
  description,
  price,
  image,
  itemQuality,
  category
}) {
  await checkForSameProduct(
    name,
    description,
    price,
    image,
    itemQuality,
    category
  );
  return products_repository_default.createProduct({
    name,
    description,
    price,
    image,
    itemQuality,
    category
  });
}
async function checkForSameProduct(name, description, price, image, itemQuality, category) {
  const sameProduct = await products_repository_default.getProduct(
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
async function getProducts2() {
  const products = await products_repository_default.getProducts();
  if (!products)
    throw notFoundError();
  return products;
}
async function updateProduct2(id, {
  name,
  description,
  price,
  image,
  itemQuality,
  category
}) {
  return products_repository_default.updateProduct(id, {
    name,
    description,
    price,
    image,
    itemQuality,
    category
  });
}
async function deleteProduct2(id) {
  const product = await products_repository_default.findProductById(id);
  if (!product)
    throw notFoundError();
  await products_repository_default.deleteProduct(id);
}

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIfUserExists,
  createCart,
  createProduct,
  createProductStock,
  createUser,
  deleteCart,
  deleteProduct,
  deleteProductStock,
  getCart,
  getCarts,
  getProductStock,
  getProducts,
  loginUser,
  updateProduct,
  updateProductStock
});
