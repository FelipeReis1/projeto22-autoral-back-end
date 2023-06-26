var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/chalk/source/vendor/supports-color/index.js
var import_node_process = __toESM(require("process"), 1);
var import_node_os = __toESM(require("os"), 1);
var import_node_tty = __toESM(require("tty"), 1);
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = import_node_process.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if ("GITHUB_ACTIONS" in env) {
      return 3;
    }
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// src/app.ts
var import_express_async_errors = require("express-async-errors");
var import_express5 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/config/envs.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_dotenv_expand = __toESM(require("dotenv-expand"), 1);
import_dotenv.default.config();
function loadEnv() {
  const path = process.env.NODE_ENV === "test" ? ".env.test" : process.env.NODE_ENV === "development" ? ".env.development" : ".env";
  const currentEnvs = import_dotenv.default.config({ path });
  import_dotenv_expand.default.expand(currentEnvs);
}
var jwtSecret = process.env.JWT_SECRET;

// src/config/database.ts
var import_client = require("@prisma/client");
var prisma;
function connectDb() {
  prisma = new import_client.PrismaClient();
}

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

// src/routers/auth-router.ts
var import_express = require("express");

// src/controllers/auth-controller.ts
var import_http_status3 = __toESM(require("http-status"), 1);

// src/services/auth-service/index.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);
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
  const token = import_jsonwebtoken2.default.sign({ userId: user.id }, jwtSecret, { expiresIn: 86400 });
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
    return res.status(import_http_status3.default.CREATED).json({
      id: user.id,
      email: user.email
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(import_http_status3.default.CONFLICT).send(error);
    }
    {
      return res.status(import_http_status3.default.BAD_REQUEST).send(error);
    }
  }
}
async function loginUser2(req, res) {
  const { email, password } = req.body;
  try {
    const { id, name } = await auth_service_default.checkIfUserExists(email);
    const token = await auth_service_default.loginUser({ email, password });
    return res.status(import_http_status3.default.OK).send({ token, name, id });
  } catch (error) {
    return res.status(import_http_status3.default.UNAUTHORIZED).send(error.message);
  }
}

// src/controllers/products-controller.ts
var import_http_status4 = __toESM(require("http-status"), 1);

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
    return res.status(import_http_status4.default.CREATED).send(product);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(import_http_status4.default.CONFLICT).send(error.message);
    }
    {
      return res.status(import_http_status4.default.BAD_REQUEST).send(error.message);
    }
  }
}
async function getProducts3(req, res) {
  try {
    const products = await products_service_default.getProducts();
    return res.status(import_http_status4.default.OK).send(products);
  } catch (error) {
    return res.status(import_http_status4.default.NOT_FOUND).send(error.message);
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
    return res.status(import_http_status4.default.OK).send(product);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(import_http_status4.default.CONFLICT).send(error.message);
    }
    {
      return res.status(import_http_status4.default.BAD_REQUEST).send(error.message);
    }
  }
}
async function deleteProduct3(req, res) {
  try {
    const { id } = req.params;
    await products_service_default.deleteProduct(Number(id));
    return res.sendStatus(import_http_status4.default.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(import_http_status4.default.NOT_FOUND).send(error.message);
    } else {
      return res.status(import_http_status4.default.BAD_REQUEST).send(error.message);
    }
  }
}

// src/controllers/cart-controller.ts
var import_http_status5 = __toESM(require("http-status"), 1);

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
    return res.status(import_http_status5.default.OK).send(cart);
  } catch (error) {
    return res.status(import_http_status5.default.NOT_FOUND).send(error.message);
  }
}
async function getCarts3(req, res) {
  try {
    const carts = await cart_service_default.getCarts();
    return res.status(import_http_status5.default.OK).send(carts);
  } catch (error) {
    return res.status(import_http_status5.default.NOT_FOUND).send(error.message);
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
    return res.status(import_http_status5.default.CREATED).send(cart);
  } catch (error) {
    return res.status(import_http_status5.default.BAD_REQUEST).send(error.message);
  }
}
async function deleteCart3(req, res) {
  const { id } = req.params;
  try {
    await cart_service_default.deleteCart(Number(id));
    return res.sendStatus(import_http_status5.default.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(import_http_status5.default.NOT_FOUND).send(error.message);
    } else {
      return res.status(import_http_status5.default.BAD_REQUEST).send(error.message);
    }
  }
}

// src/controllers/stocks-controller.ts
var import_http_status6 = __toESM(require("http-status"), 1);

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
    return res.status(import_http_status6.default.CREATED).send(productStock);
  } catch (error) {
    return res.status(import_http_status6.default.BAD_REQUEST).send(error.message);
  }
}
async function getProductStock3(req, res) {
  const { id } = req.params;
  try {
    const productStockQuantity = await stocks_service_default.getProductStock(
      Number(id)
    );
    return res.status(import_http_status6.default.OK).send(productStockQuantity);
  } catch (error) {
    return res.status(import_http_status6.default.NOT_FOUND).send(error.message);
  }
}
async function deleteProductStock3(req, res) {
  const { id } = req.params;
  try {
    await stocks_service_default.deleteProductStock(Number(id));
    return res.sendStatus(import_http_status6.default.NO_CONTENT);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(import_http_status6.default.NOT_FOUND).send(error.message);
    } else {
      return res.status(import_http_status6.default.BAD_REQUEST).send(error.message);
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
    return res.status(import_http_status6.default.OK).send(productStock);
  } catch (error) {
    return res.status(import_http_status6.default.BAD_REQUEST).send(error.message);
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

// src/app.ts
loadEnv();
var app = (0, import_express5.default)();
app.use((0, import_cors.default)()).use(import_express5.default.json()).use("/auth", authenticationRouter).use("/", productsRouter).use("/cart", cartRouter).use("/stock", stocksRouter).use(handleApplicationErrors);
function init() {
  connectDb();
  return Promise.resolve(app);
}
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 5e3;
init().then(() => {
  app_default.listen(PORT, () => {
    console.log(source_default.blue(`Server is up and running in port: ${PORT}`));
  });
});
