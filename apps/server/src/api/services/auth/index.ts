import { bind } from "decko";
import { Handler, NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";
import passport from "passport";
import { ExtractJwt, StrategyOptions } from "passport-jwt";
import { SignOptions, sign } from "jsonwebtoken";

import { JwtStrategy } from "./strategies/jwt";
import AppError from "../../../config/AppError";
import { env } from "../../../config/globals";

export type PassportStrategy = "jwt";

export class AuthService {
	private defaultStrategy: PassportStrategy;
	private jwtStrategy: JwtStrategy;

	private readonly jwtStrategyOptions: StrategyOptions = {
		audience: env.JWT.AUDIENCE,
		issuer: env.JWT.ISSUER,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: env.JWT.SECRET,
	};

	private readonly signOptions: SignOptions = {
		audience: env.JWT.AUDIENCE,
		expiresIn: env.JWT.EXPIRES_IN,
		issuer: env.JWT.ISSUER,
	};

	public constructor(defaultStrategy: PassportStrategy = "jwt") {
		this.defaultStrategy = defaultStrategy;
		this.jwtStrategy = new JwtStrategy(this.jwtStrategyOptions);
	}

	public initStrategies(): void {
		passport.use("jwt", this.jwtStrategy.strategy);
	}

	@bind
	public createToken(userID: string): string {
		return sign({ userID }, this.jwtStrategyOptions.secretOrKey as string, this.signOptions);
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
