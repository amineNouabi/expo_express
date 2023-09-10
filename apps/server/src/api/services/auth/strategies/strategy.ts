import { Strategy as Strategy_Jwt } from "passport-jwt";

import { UserRepository } from "../../../../config/db.client";

export abstract class Strategy {
	protected readonly userRepo = UserRepository;
	protected _strategy!: Strategy_Jwt;

	public get strategy(): Strategy_Jwt {
		return this._strategy;
	}
}
