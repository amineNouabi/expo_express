"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./api/app"));
const db_client_1 = __importDefault(require("./config/db.client"));
const logger_1 = __importDefault(require("./config/logger"));
const globals_1 = require("./config/globals");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        process.on("uncaughtException", (err) => {
            logger_1.default.error("Error: 💥 UNCAUGHT EXCEPTION! Shutting down...", err.name, err.message);
            process.exit(1);
        });
        db_client_1.default
            .$connect()
            .then(() => logger_1.default.info("🚀 Database connected!"))
            .catch((err) => logger_1.default.error("Error: 💥 DATABASE CONNECTION ERROR", err));
        try {
            const app = new app_1.default().app;
            const server = (0, http_1.createServer)(app);
            server.listen(globals_1.env.NODE_PORT);
            server.on("listening", () => {
                logger_1.default.info(`⚡️[server]: Server is running at http://localhost:${globals_1.env.NODE_PORT} in ${globals_1.env.NODE_ENV} mode`);
            });
            server.on("close", () => {
                db_client_1.default.$disconnect();
                logger_1.default.info("💥 Server Closed!");
            });
            process.on("unhandledRejection", (err) => {
                logger_1.default.error("Error: 💥 UNHANDLED REJECTION! Shutting down...", err.name, err.message);
                server.close(() => {
                    process.exit(1);
                });
            });
            process.on("SIGTERM", () => {
                logger_1.default.error("👋 SIGTERM RECEIVED. Shutting down gracefully");
                server.close();
            });
        }
        catch (error) {
            logger_1.default.error("Error: 💥 ERROR STARTING SERVER", error);
        }
    });
}
main();
//# sourceMappingURL=main.js.map