import { Request, Response, Application } from "express";

import { registerApiRoutes } from "./components";
import { registerMiddleware, registerErrorHandler } from "./middlewares";

import logger from "../config/logger";
/**
 * Initialize all REST routes
 *
 * @param { Application } app Express Application
 * @returns {void}
 */
export function initRestRoutes(app: Application): void {
	const apiPrefix = "/api/v0";

	registerMiddleware(app);

	app.get(apiPrefix, (req: Request, res: Response) => res.status(200).send("Ping ..."));
	app.post(`${apiPrefix}/vonage-status`, (req: Request, res: Response) => {
		logger.info("Vonage status");
		console.log(req.body);
		res.status(200).send("OK");
	});
	registerApiRoutes(app, apiPrefix);
	registerErrorHandler(app);
}
