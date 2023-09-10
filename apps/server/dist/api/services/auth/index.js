"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const decko_1 = require("decko");
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("./strategies/jwt");
const AppError_1 = __importDefault(require("../../../config/AppError"));
const globals_1 = require("../../../config/globals");
class AuthService {
    constructor(defaultStrategy = "jwt") {
        this.jwtStrategyOptions = {
            audience: globals_1.env.JWT.AUDIENCE,
            issuer: globals_1.env.JWT.ISSUER,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: globals_1.env.JWT.SECRET,
        };
        this.signOptions = {
            audience: globals_1.env.JWT.AUDIENCE,
            expiresIn: globals_1.env.JWT.EXPIRES_IN,
            issuer: globals_1.env.JWT.ISSUER,
        };
        this.defaultStrategy = defaultStrategy;
        this.jwtStrategy = new jwt_1.JwtStrategy(this.jwtStrategyOptions);
    }
    initStrategies() {
        passport_1.default.use("jwt", this.jwtStrategy.strategy);
    }
    createToken(userID) {
        return (0, jsonwebtoken_1.sign)({ userID }, this.jwtStrategyOptions.secretOrKey, this.signOptions);
    }
    doAuthentication(req, res, next, strategy) {
        try {
            switch (strategy) {
                case "jwt":
                    return this.jwtStrategy.isAuthorized(req, res, next);
                default:
                    throw new AppError_1.default("Unknown authentication strategy", 500);
            }
        }
        catch (err) {
            return next(err);
        }
    }
    isAuthorized(strategy = this.defaultStrategy) {
        return (req, res, next) => {
            try {
                return this.doAuthentication(req, res, next, strategy);
            }
            catch (err) {
                return next(err);
            }
        };
    }
    validateRequest(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                let errorMsg = "";
                errors.array().forEach((error) => {
                    if (error.type === "field")
                        errorMsg = `${error.msg}, ${errorMsg}`;
                });
                throw new AppError_1.default(errorMsg, 400);
            }
            return next();
        }
        catch (err) {
            return next(err);
        }
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AuthService.prototype, "createToken", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, String]),
    __metadata("design:returntype", Object)
], AuthService.prototype, "doAuthentication", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Function)
], AuthService.prototype, "isAuthorized", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], AuthService.prototype, "validateRequest", null);
exports.AuthService = AuthService;
//# sourceMappingURL=index.js.map