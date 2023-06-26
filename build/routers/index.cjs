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

// src/routers/index.ts
var routers_exports = {};
__export(routers_exports, {
  authenticationRouter: () => authenticationRouter,
  cartRouter: () => cartRouter,
  productsRouter: () => productsRouter,
  stocksRouter: () => stocksRouter
});
module.exports = __toCommonJS(routers_exports);

// src/routers/auth-router.ts
var import_express = require("express");

// src/controllers/auth-controller.ts
var import_http_status = __toESM(require("http-status"), 1);

// src/services/auth-service/index.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);

// src/errors/invalid-data-error.ts
function invalidDataError(details) {
  return {
    name: "InvalidDataError",
    message: "Invalid data",
    details
  };
}

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
var authService = {
  createUser,
  loginUser,
  checkIfUserExists
};
var auth_service_default = authService;

// src/controllers/auth-controller.ts
async function createUser2(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await auth_service_default.createUser({ name, email, password });
    return res.status(import_http_status.default.CREATED).json({
      id: user.id,
      email: user.email
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(import_http_status.default.CONFLICT).send(error);
    }
    {
      return res.status(import_http_status.default.BAD_REQUEST).send(error);
    }
  }
}
async function loginUser2(req, res) {
  const { email, password } = req.body;
  try {
    const { id, name } = await auth_service_default.checkIfUserExists(email);
    const token = await auth_service_default.loginUser({ email, password });
    return res.status(import_http_status.default.OK).send({ token, name, id });
  } catch (error) {
    return res.status(import_http_status.default.UNAUTHORIZED).send(error.message);
  }
}

// src/controllers/products-controller.ts
var import_http_status2 = __toESM(require("http-status"), 1);

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
var productsService = {
  createProduct: createProduct2,
  getProducts: getProducts2,
  updateProduct: updateProduct2,
  deleteProduct: deleteProduct2
};
var products_service_default = productsService;

// src/controllers/products-controller.ts
async function createProduct3(req, res) {
  const { name, description, price, image, itemQuality, category } = req.body;
  try {
    const product = await products_service_default.createProduct({
      name,
      description,
      price,
      image,
      itemQuality,
      category
    });
    return res.status(import_http_status2.default.CREATED).send(product);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(import_http_status2.default.CONFLICT).send(error.message);
    }
    {
      return res.status(import_http_status2.default.BAD_REQUEST).send(error.message);
    }
  }
}
async function getProducts3(req, res) {
  try {
    const products = await products_service_default.getProducts();
    return res.status(import_http_status2.default.OK).send(products);
  } catch (error) {
    return res.status(import_http_status2.default.NOT_FOUND).send(error.message);
  }
}
async function updateProduct3(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, image, itemQuality, category } = req.body;
    const product = await products_service_default.updateProduct(Number(id), {
      name,
      description,
      price,
      image,
      itemQuality,
      category
    });
    return res.status(import_http_status2.default.OK).send(product);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(import_http_status2.default.CONFLICT).send(error.message);
    }
    {
      return res.status(import_http_status2.default.BAD_REQUEST).send(error.message);
    }
  }
}
async function deleteProduct3(req, res) {
  try {
    const { id } = req.params;
    await products_service_default.deleteProduct(Number(id));
    return res.sendStatus(import_http_status2.default.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(import_http_status2.default.NOT_FOUND).send(error.message);
    } else {
      return res.status(import_http_status2.default.BAD_REQUEST).send(error.message);
    }
  }
}

// src/controllers/cart-controller.ts
var import_http_status3 = __toESM(require("http-status"), 1);

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

// src/controllers/cart-controller.ts
async function getCart3(req, res) {
  const { id } = req.params;
  try {
    const cart = await cart_service_default.getCart(Number(id));
    return res.status(import_http_status3.default.OK).send(cart);
  } catch (error) {
    return res.status(import_http_status3.default.NOT_FOUND).send(error.message);
  }
}
async function getCarts3(req, res) {
  try {
    const carts = await cart_service_default.getCarts();
    return res.status(import_http_status3.default.OK).send(carts);
  } catch (error) {
    return res.status(import_http_status3.default.NOT_FOUND).send(error.message);
  }
}
async function createCart3(req, res) {
  const { userId, productId, amount } = req.body;
  try {
    const cart = await cart_service_default.createCart(
      Number(userId),
      Number(productId),
      Number(amount)
    );
    return res.status(import_http_status3.default.CREATED).send(cart);
  } catch (error) {
    return res.status(import_http_status3.default.BAD_REQUEST).send(error.message);
  }
}
async function deleteCart3(req, res) {
  const { id } = req.params;
  try {
    await cart_service_default.deleteCart(Number(id));
    return res.sendStatus(import_http_status3.default.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(import_http_status3.default.NOT_FOUND).send(error.message);
    } else {
      return res.status(import_http_status3.default.BAD_REQUEST).send(error.message);
    }
  }
}

// src/controllers/stocks-controller.ts
var import_http_status4 = __toESM(require("http-status"), 1);

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
    return res.status(import_http_status4.default.CREATED).send(productStock);
  } catch (error) {
    return res.status(import_http_status4.default.BAD_REQUEST).send(error.message);
  }
}
async function getProductStock3(req, res) {
  const { id } = req.params;
  try {
    const productStockQuantity = await stocks_service_default.getProductStock(
      Number(id)
    );
    return res.status(import_http_status4.default.OK).send(productStockQuantity);
  } catch (error) {
    return res.status(import_http_status4.default.NOT_FOUND).send(error.message);
  }
}
async function deleteProductStock3(req, res) {
  const { id } = req.params;
  try {
    await stocks_service_default.deleteProductStock(Number(id));
    return res.sendStatus(import_http_status4.default.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(import_http_status4.default.NOT_FOUND).send(error.message);
    } else {
      return res.status(import_http_status4.default.BAD_REQUEST).send(error.message);
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
    return res.status(import_http_status4.default.OK).send(productStock);
  } catch (error) {
    return res.status(import_http_status4.default.BAD_REQUEST).send(error.message);
  }
}

// src/middlewares/error-handling-middleware.ts
var import_http_status5 = __toESM(require("http-status"), 1);

// src/middlewares/validation-middleware.ts
var import_http_status6 = __toESM(require("http-status"), 1);
function validateBody(schema) {
  return validate(schema, "body");
}
function validate(schema, type) {
  return (req, res, next) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false
    });
    if (!error) {
      next();
    } else {
      res.status(import_http_status6.default.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
    }
  };
}

// src/middlewares/auth-validation-middleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);

// src/schemas/auth-schemas.ts
var import_joi = __toESM(require("joi"), 1);
var signUpSchema = import_joi.default.object({
  name: import_joi.default.string().min(3).required(),
  email: import_joi.default.string().email().required(),
  password: import_joi.default.string().min(6).required()
});
var signInSchema = import_joi.default.object({
  email: import_joi.default.string().email().required(),
  password: import_joi.default.string().required()
});

// src/schemas/product-schema.ts
var import_joi2 = __toESM(require("joi"), 1);
var productSchema = import_joi2.default.object({
  name: import_joi2.default.string().required(),
  description: import_joi2.default.string().required(),
  price: import_joi2.default.number().required(),
  image: import_joi2.default.string().required(),
  itemQuality: import_joi2.default.number().required(),
  category: import_joi2.default.string().required()
});
var productUpdateSchema = import_joi2.default.object({
  name: import_joi2.default.string().optional(),
  description: import_joi2.default.string().optional(),
  price: import_joi2.default.number().optional(),
  image: import_joi2.default.string().optional(),
  itemQuality: import_joi2.default.number().optional(),
  category: import_joi2.default.string().optional()
});

// src/routers/auth-router.ts
var authenticationRouter = (0, import_express.Router)();
authenticationRouter.post("/signup", validateBody(signUpSchema), createUser2);
authenticationRouter.post("/signin", validateBody(signInSchema), loginUser2);

// src/routers/products-router.ts
var import_express2 = require("express");
var productsRouter = (0, import_express2.Router)();
productsRouter.get("/", getProducts3);
productsRouter.post(
  "/products-registration",
  validateBody(productSchema),
  createProduct3
);
productsRouter.patch(
  "/products-update/:id",
  validateBody(productUpdateSchema),
  updateProduct3
);
productsRouter.delete("/products-delete/:id", deleteProduct3);

// src/routers/cart-router.ts
var import_express3 = require("express");
var cartRouter = (0, import_express3.Router)();
cartRouter.get("/:id", getCart3);
cartRouter.get("/", getCarts3);
cartRouter.post("/", createCart3);
cartRouter.delete("/:id", deleteCart3);

// src/routers/stocks-router.ts
var import_express4 = require("express");
var stocksRouter = (0, import_express4.Router)();
stocksRouter.post("/:id", createProductStock3);
stocksRouter.get("/:id", getProductStock3);
stocksRouter.delete("/:id", deleteProductStock3);
stocksRouter.patch("/:id", updateProductStock3);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticationRouter,
  cartRouter,
  productsRouter,
  stocksRouter
});
