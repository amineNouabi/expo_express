"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStrategy = void 0;
const db_client_1 = require("../../../../config/db.client");
class BaseStrategy {
    constructor() {
        this.userRepo = db_client_1.UserRepository;
    }
    get strategy() {
        return this._strategy;
    }
}
exports.BaseStrategy = BaseStrategy;
//# sourceMappingURL=base.js.map