import { Router } from "express";
import { UserController } from "./controller";
import { AuthService } from "../../services/auth";

export class UserRouter {
	static readonly prefix = "user";
	private readonly _router = Router();
	private readonly controller = new UserController();
	private readonly authService = new AuthService();
	constructor() {
		this.initRoutes();
	}

	public get router() {
		return this._router;
	}

	initRoutes(): void {
		this.router.get("/me", this.authService.isAuthorized(), this.controller.readMe, this.controller.readUser);
		this.router.get("/:userID", this.authService.isAuthorized(), this.controller.readUser);
	}
}
