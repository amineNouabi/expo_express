"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
    static sendErrorProd(err, req, res) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        return res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
    static sendErrorDev(err, req, res) {
        return res.status(err.statusCode).json({
            status: err.status,
            errors: err,
            message: err.message,
            stack: err.stack,
        });
    }
}
exports.default = AppError;
//# sourceMappingURL=AppError.js.map