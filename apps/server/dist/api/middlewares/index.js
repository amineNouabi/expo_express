"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerErrorHandler = exports.registerMiddleware = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const auth_1 = require("../services/auth");
const morgan_1 = __importDefault(require("./morgan"));
const logger_1 = __importDefault(require("../../config/logger"));
const AppError_1 = __importDefault(require("../../config/AppError"));
function registerMiddleware(router) {
    router.use((0, helmet_1.default)());
    if (process.env.NODE_ENV === "development")
        router.use((0, cors_1.default)({ origin: "*" }));
    else
        router.use((0, cors_1.default)({ origin: [] }));
    router.use(morgan_1.default);
    router.use((0, express_1.json)());
    router.use((0, compression_1.default)());
    new auth_1.AuthService().initStrategies();
}
exports.registerMiddleware = registerMiddleware;
function registerErrorHandler(router) {
    router.all("*", (req, res, next) => {
        next(new AppError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    router.use((err, req, res, next) => {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || "error";
        //For now only dev.  To edit later
        logger_1.default.error("Error: ", err);
        return AppError_1.default.sendErrorDev(err, req, res);
    });
}
exports.registerErrorHandler = registerErrorHandler;
//# sourceMappingURL=index.js.map