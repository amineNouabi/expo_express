import { Request, Response, Router } from "express";

import { registerApiRoutes } from "./components";
import { registerMiddleware, registerErrorHandler } from "./middlewares";

/**
 * Initialize all REST routes
 *
 * @param {Router}
 * @returns {void}
 */
export function initRestRoutes(router: Router): void {
	const apiPrefix = "/api/v0";

	registerMiddleware(router);
	router.get(apiPrefix, (req: Request, res: Response) => res.status(200).send("Ping ..."));
	registerApiRoutes(router, apiPrefix);
	registerErrorHandler(router);
}
