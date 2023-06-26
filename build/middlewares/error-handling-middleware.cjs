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

// src/middlewares/error-handling-middleware.ts
var error_handling_middleware_exports = {};
__export(error_handling_middleware_exports, {
  handleApplicationErrors: () => handleApplicationErrors
});
module.exports = __toCommonJS(error_handling_middleware_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleApplicationErrors
});
