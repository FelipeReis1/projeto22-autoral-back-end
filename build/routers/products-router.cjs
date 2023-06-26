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

// src/routers/products-router.ts
var products_router_exports = {};
__export(products_router_exports, {
  productsRouter: () => productsRouter
});
module.exports = __toCommonJS(products_router_exports);
var import_express = require("express");

// src/middlewares/error-handling-middleware.ts
var import_http_status = __toESM(require("http-status"), 1);

// src/middlewares/validation-middleware.ts
var import_http_status2 = __toESM(require("http-status"), 1);

// src/errors/invalid-data-error.ts
function invalidDataError(details) {
  return {
    name: "InvalidDataError",
    message: "Invalid data",
    details
  };
}

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "The requested resource was not found "
  };
}

// src/middlewares/validation-middleware.ts
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
      res.status(import_http_status2.default.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
    }
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

// src/middlewares/auth-validation-middleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// src/controllers/products-controller.ts
var import_http_status3 = __toESM(require("http-status"), 1);

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
    return res.status(import_http_status3.default.CREATED).send(product);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(import_http_status3.default.CONFLICT).send(error.message);
    }
    {
      return res.status(import_http_status3.default.BAD_REQUEST).send(error.message);
    }
  }
}
async function getProducts3(req, res) {
  try {
    const products = await products_service_default.getProducts();
    return res.status(import_http_status3.default.OK).send(products);
  } catch (error) {
    return res.status(import_http_status3.default.NOT_FOUND).send(error.message);
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
    return res.status(import_http_status3.default.OK).send(product);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(import_http_status3.default.CONFLICT).send(error.message);
    }
    {
      return res.status(import_http_status3.default.BAD_REQUEST).send(error.message);
    }
  }
}
async function deleteProduct3(req, res) {
  try {
    const { id } = req.params;
    await products_service_default.deleteProduct(Number(id));
    return res.sendStatus(import_http_status3.default.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(import_http_status3.default.NOT_FOUND).send(error.message);
    } else {
      return res.status(import_http_status3.default.BAD_REQUEST).send(error.message);
    }
  }
}

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

// src/routers/products-router.ts
var productsRouter = (0, import_express.Router)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productsRouter
});
