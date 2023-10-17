import { bind } from "decko";
import type { Request, Response, NextFunction } from "express";

import { AuthService } from "../../services/auth";
import { MessagingService } from "../../services/messaging";

import { UserRepository } from "../../../config/db-client";
import AppError from "../../../config/AppError";

export default class AuthContoller {
	private readonly authService = new AuthService();
	private readonly messagingService = new MessagingService();
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

	@bind
	async sendSmsCode(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const { phone } = req.body;

		console.log("Phone : ", phone);

		try {
			const { requestId } = await this.messagingService.sendVerificationCodeSms(phone);

			console.log("requestId : ", requestId);

			return res.status(201).json({
				status: "success",
				requestId,
			});
		} catch (err) {
			console.log("err : ", err);
			next(err);
		}
	}

	async verifySmsCode(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const { requestId, code } = req.body;

		console.log("requestId : ", requestId);
		console.log("code : ", code);

		try {
			const status = await this.messagingService.checkVerificationCodeSms(requestId, code);
			console.log("status : ", status);

			return res.status(201).json({
				status,
			});
		} catch (err) {
			console.log("err : ", err);
			next(err);
		}
	}
}
