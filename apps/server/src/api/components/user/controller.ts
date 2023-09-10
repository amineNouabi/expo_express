import { bind } from "decko";
import type { NextFunction, Request, Response } from "express";

import { UserRepository } from "../../../config/db.client";
import AppError from "../../../config/AppError";
import logger from "../../../config/logger";

export class UserController {
	// private readonly userService: UserService;
	private readonly repo = UserRepository;

	@bind
	async readUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const { userID } = req.params as { userID: string };

		try {
			const user = await this.repo.findFirst({
				where: {
					id: userID,
				},
			});

			console.log("user: ", user);
			logger.debug(user);
			// const filteredUser = this.repo.filterInstance(user, ["password", "active"]);

			if (!user) throw new AppError("User not found", 404);
			return res.status(200).json({
				status: "success",
				data: {
					user,
				},
			});
		} catch (err) {
			return next(err);
		}
	}

	async readMe(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const { id } = req.user as { id: string };

		req.params.userID = id;
		next();
	}
}
