"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// import { env } from "./globals";
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
};
(0, winston_1.addColors)(colors);
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.format.colorize({ all: true }), winston_1.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
});
//To edit later : add log files and consider dev and prod envs.
// if (env.NODE_ENV === "development")
logger.add(new winston_1.transports.Console({
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    level: "debug",
}));
exports.default = logger;
//# sourceMappingURL=logger.js.map