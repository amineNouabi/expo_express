"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../../config/logger"));
const stream = {
    write: (message) => logger_1.default.http(message),
};
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};
exports.default = (0, morgan_1.default)(":remote-addr :method :url :status :res[content-length] - :response-time ms", { stream, skip });
//# sourceMappingURL=morgan.js.map