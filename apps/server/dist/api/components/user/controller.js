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
exports.UserController = void 0;
const decko_1 = require("decko");
const db_client_1 = require("../../../config/db.client");
const AppError_1 = __importDefault(require("../../../config/AppError"));
const logger_1 = __importDefault(require("../../../config/logger"));
class UserController {
    constructor() {
        // private readonly userService: UserService;
        this.repo = db_client_1.UserRepository;
    }
    readUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.params;
            try {
                const user = yield this.repo.findFirst({
                    where: {
                        id: userID,
                    },
                });
                console.log("user: ", user);
                logger_1.default.debug(user);
                // const filteredUser = this.repo.filterInstance(user, ["password", "active"]);
                if (!user)
                    throw new AppError_1.default("User not found", 404);
                return res.status(200).json({
                    status: "success",
                    data: {
                        user,
                    },
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    readMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.user;
            req.params.userID = id;
            next();
        });
    }
}
__decorate([
    decko_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readUser", null);
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map