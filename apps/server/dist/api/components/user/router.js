"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../services/auth");
class UserRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this.controller = new controller_1.UserController();
        this.authService = new auth_1.AuthService();
        this.initRoutes();
    }
    get router() {
        return this._router;
    }
    initRoutes() {
        this.router.get("/me", this.authService.isAuthorized(), this.controller.readMe, this.controller.readUser);
        this.router.get("/:userID", this.authService.isAuthorized(), this.controller.readUser);
    }
}
exports.UserRouter = UserRouter;
UserRouter.prefix = "user";
//# sourceMappingURL=router.js.map