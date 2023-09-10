import { Request, Response } from "express";

export default class AppError extends Error {
	public statusCode: number;
	public status: string;
	public isOperational: boolean;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}

	public static sendErrorProd(err: AppError, req: Request, res: Response): Response {
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

	public static sendErrorDev(err: AppError, req: Request, res: Response): Response {
		return res.status(err.statusCode).json({
			status: err.status,
			errors: err,
			message: err.message,
			stack: err.stack,
		});
	}
}
