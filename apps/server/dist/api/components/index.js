"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApiRoutes = void 0;
const router_1 = require("./auth/router");
const router_2 = require("./user/router");
function registerApiRoutes(router, apiPrefix) {
    router.use(`${apiPrefix}/${router_1.AuthRouter.prefix}`, new router_1.AuthRouter().router);
    router.use(`${apiPrefix}/${router_2.UserRouter.prefix}`, new router_2.UserRouter().router);
}
exports.registerApiRoutes = registerApiRoutes;
//# sourceMappingURL=index.js.map