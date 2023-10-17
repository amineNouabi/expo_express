import { json } from "express";
import type { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { AuthService } from "../services/auth";

import morganMiddleware from "./morgan";

import { env, AppError } from "../../config/index";

/**
 * Register all middlewares
 *
 * @export
 * @param app Express Application
 */
export function registerMiddleware(app: Application) {
	app.use(helmet());

	if (env.NODE_ENV === "development") app.use(cors({ origin: "*" }));
	else app.use(cors({ origin: [] }));

	app.use(morganMiddleware);

	app.use(json());
	app.use(compression());

	new AuthService().initStrategies();
}

/**
 * Register error handlers for the application
 *
 * @param app Express Application
 */
export function registerErrorHandler(app: Application) {
	/**
	 * 404 middleware (Not found)
	 *
	 */
	app.all("*", (req: Request, _res: Response, next: NextFunction) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
	});

	/**
	 * Error handler
	 *
	 */
	app.use((err: AppError | Error, req: Request, res: Response, _next: NextFunction): Response => {
		// logger.error("Error: Inside Error Handler");
		console.log(err);

		if (env.NODE_ENV !== "production") return AppError.sendErrorDev(err, req, res);
		return AppError.sendErrorProd(err, req, res);
	});
}
