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

// src/routers/auth-router.ts
var auth_router_exports = {};
__export(auth_router_exports, {
  authenticationRouter: () => authenticationRouter
});
module.exports = __toCommonJS(auth_router_exports);
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

// src/controllers/cart-controller.ts
var import_http_status3 = __toESM(require("http-status"), 1);

// src/controllers/stocks-controller.ts
var import_http_status4 = __toESM(require("http-status"), 1);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticationRouter
});
