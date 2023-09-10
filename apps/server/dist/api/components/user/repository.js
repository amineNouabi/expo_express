"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Repository_1 = require("../Repository");
// import { User } from "./model";
const db_client_1 = require("../../../config/db.client");
class UserRepository extends Repository_1.Repository {
    constructor() {
        super("user", db_client_1.UserClient);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=repository.js.map