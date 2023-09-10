"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const model_1 = __importDefault(require("../api/components/user/model"));
const prisma = new client_1.PrismaClient();
const xprisma = prisma.$extends({
    model: {
        user: model_1.default,
        $allModels: {
            filterInstance(instance, keys) {
                const filteredEntries = Object.entries(instance).filter(([key]) => !keys.includes(key));
                const filteredObject = Object.fromEntries(filteredEntries);
                return filteredObject;
            },
        },
    },
});
exports.UserRepository = xprisma.user;
exports.default = xprisma;
//# sourceMappingURL=db.client.js.map