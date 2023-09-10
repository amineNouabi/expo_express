"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const db_client_1 = require("../../../../config/db.client");
class Strategy {
    constructor() {
        this.userRepo = db_client_1.UserRepository;
    }
    get strategy() {
        return this._strategy;
    }
}
exports.Strategy = Strategy;
//# sourceMappingURL=strategy.js.map