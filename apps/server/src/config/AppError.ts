import { Request, Response } from "express";

/**
 * This is A custom Class Error which is used to handle errors in the application and related methods are defined here
 *
 * @class AppError
 * @description Custom Error class
 * @param {string} message - Error message
 * @param {number} statusCode - Error status code
 * @param {boolean} isOperational - true if error is expected to occur
 */
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

	/**
	 *	Handles the error in production mode
	 *
	 * @param err
	 * @param req
	 * @param res
	 * @returns {Response}
	 */
	public static sendErrorProd(err: AppError | Error, req: Request, res: Response): Response {
		if (err instanceof AppError && err.isOperational) {
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

	public static sendErrorDev(err: AppError | Error, req: Request, res: Response): Response {
		if (err instanceof AppError)
			return res.status(err.statusCode).json({
				status: err.status,
				errors: err,
				message: err.message,
				stack: err.stack,
			});
		return res.status(500).json({
			status: "error",
			message: err.message,
			stack: err.stack,
		});
	}
}
