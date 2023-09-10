"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRestRoutes = void 0;
const middlewares_1 = require("./middlewares");
function initRestRoutes(router) {
    const apiPrefix = "/api/v0";
    router.get(apiPrefix, (req, res) => {
        res.status(200).send("Ping ...");
    });
    (0, middlewares_1.registerMiddleware)(router);
}
exports.initRestRoutes = initRestRoutes;
//# sourceMappingURL=root.router.js.map