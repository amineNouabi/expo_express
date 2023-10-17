import { bind } from "decko";
import { NextFunction, Request, Response, Handler } from "express";
import passport from "passport";
import { Strategy as _Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import { SignOptions, sign } from "jsonwebtoken";

import { User } from "@prisma/client";
import { Strategy } from "./strategy";

import { env, AppError, logger } from "../../../../config/index";

export class JwtStrategy extends Strategy {
	static readonly strategyOptions: StrategyOptions = {
		audience: env.JWT.AUDIENCE,
		issuer: env.JWT.ISSUER,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: env.JWT.SECRET,
	};

	static readonly signOptions: SignOptions = {
		audience: this.strategyOptions.audience,
		expiresIn: env.JWT.EXPIRES_IN,
		issuer: env.JWT.ISSUER,
	};

	public constructor() {
		super();
		this._strategy = new _Strategy(JwtStrategy.strategyOptions, this.verify);
	}

	/**
	 * Create JWT
	 *
	 * @param userID Used for JWT payload
	 * @returns Returns JWT
	 */
	static createToken(userID: string): string {
		return sign({ userID }, JwtStrategy.strategyOptions.secretOrKey as string, JwtStrategy.signOptions);
	}

	/**
	 * Verify Callback function for JWT Strategy
	 *
	 * @param payload Payload from JWT
	 * @param next Callback function params: (err, user, info)
	 * @returns Returns User from database
	 */
	@bind
	public async verify(payload: any, next: any): Promise<void> {
		try {
			const user = await this.userRepo.findFirst({
				where: {
					active: true,
					id: payload.userID,
				},
			});

			if (!user) return next(null, null);
			return next(null, user);
		} catch (err) {
			return next(err);
		}
	}

	public isAuthorized(req: Request, res: Response, next: NextFunction): Handler | void {
		try {
			passport.authenticate("jwt", { session: false }, (err: any, user: User, info: { message: string }) => {
				if (err) {
					return next(new AppError("Internal server error", 500));
				}
				if (info) {
					switch (info.message) {
						case "No auth token":
							return next(new AppError("Please Login first.", 401));
						case "jwt expired":
							return next(new AppError("Please Login again.", 401));
						default:
							logger.error(`Unknown info.message in JwtStrategy authenticate. ${info.message}`);
							return next(new AppError("Unauthorized", 401));
					}
				}

				if (!user) {
					return next(new AppError("Unauthorized", 401));
				}
				req.user = user;
				return next();
			})(req, res, next);
		} catch (err) {
			return next(err);
		}
	}
}
