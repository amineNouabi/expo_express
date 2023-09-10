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
const decko_1 = require("decko");
const auth_1 = require("../../services/auth");
const db_client_1 = require("../../../config/db.client");
const AppError_1 = __importDefault(require("../../../config/AppError"));
class AuthContoller {
    constructor() {
        this.authService = new auth_1.AuthService();
        this.userRepo = db_client_1.UserRepository;
    }
    signupUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, firstname, lastname } = req.body;
                const user = yield this.userRepo.findFirst({ where: { email } });
                if (user)
                    throw new AppError_1.default("User already exists", 400);
                const newUser = yield this.userRepo.create({
                    data: {
                        email,
                        password: yield this.userRepo.hashPassword(password),
                        firstname,
                        lastname,
                    },
                });
                const token = this.authService.createToken(newUser.id);
                const filteredUser = this.userRepo.filterInstance(newUser, ["password"]);
                return res.status(201).json({
                    status: "success",
                    data: {
                        token,
                        user: filteredUser,
                    },
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userRepo.findFirst({ where: { email } });
                if (!user || !(yield this.userRepo.verifyPassword(password, user.password)))
                    throw new AppError_1.default("Wrong email or password!", 400);
                if (!user.active)
                    throw new AppError_1.default("User not active", 400);
                const token = this.authService.createToken(user.id);
                const filteredUser = this.userRepo.filterInstance(user, ["password", "active"]);
                return res.status(201).json({
                    status: "success",
                    data: {
                        token,
                        user: filteredUser,
                    },
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthContoller.prototype, "signupUser", null);
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthContoller.prototype, "loginUser", null);
exports.default = AuthContoller;
//# sourceMappingURL=controller.js.map