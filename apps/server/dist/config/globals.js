"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
const dotenvOutput = dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "..", "..", ".env") });
if (dotenvOutput.error) {
    logger_1.default.error("Error: 💥 ERROR LOADING .env FILE", dotenvOutput.error);
}
exports.env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3000,
    DOMAIN: process.env.DOMAIN || "localhost",
    DATABASE_URL: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/salut_bricole",
    JWT: {
        ISSUER: process.env.JWT_ISSUER || "localhost",
        AUDIENCE: process.env.JWT_AUDIENCE || "localhost",
        EXPIRES_IN: process.env.JWT_EXPIERS_IN || "1d",
        SECRET: process.env.JWT_SECRET || "",
    },
};
//# sourceMappingURL=globals.js.map