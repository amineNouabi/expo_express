import passport from "passport";
import { Handler, NextFunction, Request, Response } from "express";
import { bind } from "decko";
import { ValidationError, validationResult } from "express-validator";

import { JwtStrategy } from "./strategies/jwt";
import AppError from "../../../config/AppError";

export type PassportStrategy = "jwt" | "facebook" | "google";

/**
 * AuthService
 *
 * Available passport strategies for authentication:
 *  - JWT (default)
 *  - GOOGLE
 *  - FACEBOOK
 *
 * Pass a strategy when initializing module routes to setup this strategy for the complete module: Example: new UserRoutes('jwt')
 *
 * To setup a strategy for individual endpoints in a module pass the strategy on isAuthorized call
 * Example: isAuthorized('jwt')
 */
export class AuthService {
	private defaultStrategy: PassportStrategy;
	private jwtStrategy: JwtStrategy;
	// private googleStrategy: GoogleStrategy;
	// private facebookStrategy: FacebookStrategy;

	public constructor(defaultStrategy: PassportStrategy = "jwt") {
		this.defaultStrategy = defaultStrategy;
		this.jwtStrategy = new JwtStrategy();
		// this.googleStrategy = new GoogleStrategy();
		// this.facebookStrategy = new FacebookStrategy();
	}

	public initStrategies(): void {
		passport.use("jwt", this.jwtStrategy.strategy);
		// passport.use('google', this.googleStrategy.strategy);
		// passport.use('facebook', this.facebookStrategy.strategy);
	}

	/**
	 * Create JWT
	 *
	 * @param userID Used for JWT payload
	 * @returns Returns JWT
	 */
	public createToken(userID: string): string {
		return JwtStrategy.createToken(userID);
	}

	@bind
	private doAuthentication(
		req: Request,
		res: Response,
		next: NextFunction,
		strategy: PassportStrategy,
	): Handler | void {
		try {
			switch (strategy) {
				case "jwt":
					return this.jwtStrategy.isAuthorized(req, res, next);
				// case "google":
				// 	return this.googleStrategy.isAuthorized(req, res, next);
				// case "facebook":
				// 	return this.facebookStrategy.isAuthorized(req, res, next);
				default:
					throw new AppError("Unknown authentication strategy", 500);
			}
		} catch (err) {
			return next(err);
		}
	}

	@bind
	public isAuthorized(strategy: PassportStrategy = this.defaultStrategy): Handler {
		return (req: Request, res: Response, next: NextFunction): Handler | void => {
			try {
				return this.doAuthentication(req, res, next, strategy);
			} catch (err) {
				return next(err);
			}
		};
	}

	@bind
	public validateRequest(req: Request, res: Response, next: NextFunction): Response | void {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				let errorMsg = "";
				errors.array().forEach((error: ValidationError) => {
					if (error.type === "field") errorMsg = `${error.msg}, ${errorMsg}`;
				});
				throw new AppError(errorMsg, 400);
			}
			return next();
		} catch (err) {
			return next(err);
		}
	}
}
