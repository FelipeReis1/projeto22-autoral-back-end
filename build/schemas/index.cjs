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

// src/schemas/index.ts
var schemas_exports = {};
__export(schemas_exports, {
  productSchema: () => productSchema,
  productUpdateSchema: () => productUpdateSchema,
  signInSchema: () => signInSchema,
  signUpSchema: () => signUpSchema
});
module.exports = __toCommonJS(schemas_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productSchema,
  productUpdateSchema,
  signInSchema,
  signUpSchema
});
