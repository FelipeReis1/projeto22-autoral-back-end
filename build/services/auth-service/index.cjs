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

// src/services/auth-service/index.ts
var auth_service_exports = {};
__export(auth_service_exports, {
  checkIfUserExists: () => checkIfUserExists,
  createUser: () => createUser,
  default: () => auth_service_default,
  loginUser: () => loginUser
});
module.exports = __toCommonJS(auth_service_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIfUserExists,
  createUser,
  loginUser
});
