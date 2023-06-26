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

// src/middlewares/index.ts
var middlewares_exports = {};
__export(middlewares_exports, {
  handleApplicationErrors: () => handleApplicationErrors,
  validateBody: () => validateBody,
  validateParams: () => validateParams
});
module.exports = __toCommonJS(middlewares_exports);

// src/middlewares/error-handling-middleware.ts
var import_http_status = __toESM(require("http-status"), 1);
function handleApplicationErrors(err, _req, res, _next) {
  if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
    return res.status(import_http_status.default.CONFLICT).send({
      message: err.message
    });
  }
  if (err.name === "InvalidCredentialsError") {
    return res.status(import_http_status.default.UNAUTHORIZED).send({
      message: err.message
    });
  }
  if (err.name === "UnauthorizedError") {
    return res.status(import_http_status.default.UNAUTHORIZED).send({
      message: err.message
    });
  }
  if (err.name === "NotFoundError") {
    return res.status(import_http_status.default.NOT_FOUND).send({
      message: err.message
    });
  }
  console.error(err.name);
  res.status(import_http_status.default.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error"
  });
}

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

// src/middlewares/validation-middleware.ts
function validateBody(schema) {
  return validate(schema, "body");
}
function validateParams(schema) {
  return validate(schema, "params");
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

// src/middlewares/auth-validation-middleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleApplicationErrors,
  validateBody,
  validateParams
});
