"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRestRoutes = void 0;
const components_1 = require("./components");
const middlewares_1 = require("./middlewares");
/**
 * Initialize all REST routes
 *
 * @param {Router}
 * @returns {void}
 */
function initRestRoutes(router) {
    const apiPrefix = "/api/v0";
    (0, middlewares_1.registerMiddleware)(router);
    router.get(apiPrefix, (req, res) => res.status(200).send("Ping ..."));
    (0, components_1.registerApiRoutes)(router, apiPrefix);
    (0, middlewares_1.registerErrorHandler)(router);
}
exports.initRestRoutes = initRestRoutes;
//# sourceMappingURL=routes.js.map