import { json } from "express";
import type { Router, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { AuthService } from "../services/auth";

import morganMiddleware from "./morgan";
import logger from "../../config/logger";
import AppError from "../../config/AppError";

import { env } from "../../config/globals";

export function registerMiddleware(router: Router) {
	router.use(helmet());

	if (process.env.NODE_ENV === "development") router.use(cors({ origin: "*" }));
	else router.use(cors({ origin: [] }));

	router.use(morganMiddleware);

	router.use(json());
	router.use(compression());

	new AuthService().initStrategies();
}

export function registerErrorHandler(router: Router): void {
	router.all("*", (req: Request, res: Response, next: NextFunction) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	router.use((err: AppError, req: Request, res: Response, next: NextFunction): Response => {
		err.statusCode = err.statusCode || 500;
		err.status = err.status || "error";

		logger.error("Error: Inside Error Handler");
		logger.error(err);
		if (env.NODE_ENV === "development") return AppError.sendErrorDev(err, req, res);
		return AppError.sendErrorProd(err, req, res);
	});
}
