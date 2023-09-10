import { bind } from "decko";
import type { Request, Response, NextFunction } from "express";

import { AuthService } from "../../services/auth";

import { UserRepository } from "../../../config/db.client";
import AppError from "../../../config/AppError";

export default class AuthContoller {
	private readonly authService: AuthService = new AuthService();
	private readonly userRepo = UserRepository;

	@bind
	async signupUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, password, firstname, lastname } = req.body;

			const user = await this.userRepo.findFirst({ where: { email } });

			if (user) throw new AppError("User already exists", 400);

			const newUser = await this.userRepo.create({
				data: {
					email,
					password: await this.userRepo.hashPassword(password),
					firstname,
					lastname,
				},
			});

			const token = this.authService.createToken(newUser.id);

			const filteredUser = this.userRepo.filterInstance(newUser, ["password"]);

			return res.status(201).json({
				status: "success",
				data: {
					token,
					user: filteredUser,
				},
			});
		} catch (err) {
			next(err);
		}
	}

	@bind
	async loginUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, password } = req.body;

			const user = await this.userRepo.findFirst({ where: { email } });

			if (!user || !(await this.userRepo.verifyPassword(password, user.password)))
				throw new AppError("Wrong email or password!", 400);

			if (!user.active) throw new AppError("User not active", 400);

			const token: string = this.authService.createToken(user.id);

			const filteredUser = this.userRepo.filterInstance(user, ["password", "active"]);

			return res.status(201).json({
				status: "success",
				data: {
					token,
					user: filteredUser,
				},
			});
		} catch (err) {
			next(err);
		}
	}
}
