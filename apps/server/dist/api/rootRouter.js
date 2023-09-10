"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRestRoutes = void 0;
function initRestRoutes(router) {
    const apiPrefix = "/api/v0";
    router.get(apiPrefix, (req, res) => {
        res.send("Ping ...");
    });
}
exports.initRestRoutes = initRestRoutes;
//# sourceMappingURL=rootRouter.js.map