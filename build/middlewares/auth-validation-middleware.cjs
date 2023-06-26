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

// src/middlewares/auth-validation-middleware.ts
var auth_validation_middleware_exports = {};
__export(auth_validation_middleware_exports, {
  default: () => auth_validation_middleware_default
});
module.exports = __toCommonJS(auth_validation_middleware_exports);

// src/errors/unauthorized-error.ts
function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "Unauthorized"
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

// src/middlewares/auth-validation-middleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization)
    throw unauthorizedError();
  const parts = authorization.split(" ");
  if (parts.length !== 2)
    throw unauthorizedError();
  const [schema, token] = parts;
  if (schema !== "Bearer")
    throw unauthorizedError();
  import_jsonwebtoken.default.verify(token, jwtSecret, async (error, decoded) => {
    try {
      if (error)
        throw unauthorizedError();
      const payload = decoded;
      const user = await auth_repository_default.findById(payload.userId);
      if (!user)
        throw unauthorizedError();
      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  });
}
var auth_validation_middleware_default = { authValidation };
