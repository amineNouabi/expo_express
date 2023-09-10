"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = __importDefault(require("./controller"));
const auth_1 = require("../../services/auth");
class AuthRouter {
    constructor(defaultStrategy = "jwt") {
        this._router = (0, express_1.Router)();
        this.controller = new controller_1.default();
        this.authService = new auth_1.AuthService(defaultStrategy);
        this.initRoutes();
    }
    get router() {
        return this._router;
    }
    initRoutes() {
        this.router.post("/signup", (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"), (0, express_validator_1.body)("firstname").isString().withMessage("Firstname is required"), (0, express_validator_1.body)("lastname").isString().withMessage("Lastname is required"), (0, express_validator_1.body)("password")
            .isString()
            .withMessage("Password is required")
            .isLength({ min: 8, max: 20 })
            .withMessage("Password must be between 8 and 20 characters"), this.authService.validateRequest, this.controller.signupUser);
        this.router.post("/login", (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"), (0, express_validator_1.body)("password")
            .isString()
            .withMessage("Password is required")
            .isLength({ min: 8, max: 20 })
            .withMessage("Password must be between 8 and 20 characters"), this.authService.validateRequest, this.controller.loginUser);
    }
}
exports.AuthRouter = AuthRouter;
AuthRouter.prefix = "auth";
//# sourceMappingURL=router.js.map