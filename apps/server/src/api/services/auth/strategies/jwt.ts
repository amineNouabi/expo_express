import { bind } from "decko";
import { NextFunction, Request, Response, Handler } from "express";
import passport from "passport";
import { Strategy as _Strategy, StrategyOptions } from "passport-jwt";

import { User } from "@prisma/client";
import { Strategy } from "./strategy";

import AppError from "../../../../config/AppError";

export class JwtStrategy extends Strategy {
	private strategyOptions: StrategyOptions;

	public constructor(strategyOptions: StrategyOptions) {
		super();
		this.strategyOptions = strategyOptions;
		this._strategy = new _Strategy(this.strategyOptions, this.verify);
	}

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
