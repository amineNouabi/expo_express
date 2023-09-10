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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const decko_1 = require("decko");
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const strategy_1 = require("./strategy");
const AppError_1 = __importDefault(require("../../../../config/AppError"));
class JwtStrategy extends strategy_1.Strategy {
    constructor(strategyOptions) {
        super();
        this.strategyOptions = strategyOptions;
        this._strategy = new passport_jwt_1.Strategy(this.strategyOptions, this.verify);
    }
    verify(payload, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepo.findFirst({
                    where: {
                        active: true,
                        id: payload.userID,
                    },
                });
                if (!user)
                    return next(null, null);
                return next(null, user);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    isAuthorized(req, res, next) {
        try {
            passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
                if (err) {
                    return next(new AppError_1.default("Internal server error", 500));
                }
                if (info) {
                    switch (info.message) {
                        case "No auth token":
                            return next(new AppError_1.default("Please Login first.", 401));
                        case "jwt expired":
                            return next(new AppError_1.default("Please Login again.", 401));
                        default:
                            return next(new AppError_1.default("Unauthorized", 401));
                    }
                }
                if (!user) {
                    return next(new AppError_1.default("Unauthorized", 401));
                }
                req.user = user;
                return next();
            })(req, res, next);
        }
        catch (err) {
            return next(err);
        }
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JwtStrategy.prototype, "verify", null);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.js.map