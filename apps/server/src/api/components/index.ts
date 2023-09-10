import type { Router } from "express";

import { AuthRouter } from "./auth/router";
import { UserRouter } from "./user/router";

export function registerApiRoutes(router: Router, apiPrefix: string): void {
	router.use(`${apiPrefix}/${AuthRouter.prefix}`, new AuthRouter().router);
	router.use(`${apiPrefix}/${UserRouter.prefix}`, new UserRouter().router);
}
