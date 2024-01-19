import { Router } from "express";
import { body } from "express-validator";

import AuthContoller from "./controller";
import { AuthService, PassportStrategy } from "../../services/auth";

export class AuthRouter {
	static readonly prefix = "auth";
	private readonly _router = Router();
	readonly controller = new AuthContoller();
	authService: AuthService;

	constructor(defaultStrategy: PassportStrategy = "jwt") {
		this.authService = new AuthService(defaultStrategy);
		this.initRoutes();
	}

	public get router() {
		return this._router;
	}

	initRoutes(): void {
		this.router.post(
			"/signup",
			body("email").isEmail().withMessage("Invalid email"),
			body("firstname").isString().withMessage("Firstname is required"),
			body("lastname").isString().withMessage("Lastname is required"),
			body("password")
				.isString()
				.withMessage("Password is required")
				.isLength({ min: 8, max: 20 })
				.withMessage("Password must be between 8 and 20 characters"),
			this.authService.validateRequest,
			this.controller.signupUser,
		);

		this.router.post(
			"/login",
			body("email").isEmail().withMessage("Invalid email"),
			body("password")
				.isString()
				.withMessage("Password is required")
				.isLength({ min: 8, max: 20 })
				.withMessage("Password must be between 8 and 20 characters"),
			this.authService.validateRequest,
			this.controller.loginUser,
		);

		// this.router.post("/send-sms-code", this.controller.sendSmsCode);
		// this.router.post("/verify-sms-code", this.controller.verifySmsCode);
	}
}
