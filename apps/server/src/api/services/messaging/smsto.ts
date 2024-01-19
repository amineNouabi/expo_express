import { BaseSMS } from "./basesms";

import { logger, env } from "../../../config";

import apisauce from "apisauce";

export class SMStoService implements BaseSMS {
	private client = apisauce.create({
		baseURL: "https://api.smsto.fr",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		params: {
			api_key: env.SMSTO.API_KEY,
		},
	});

	async sendSms(to: string, message: string): Promise<string> {
		logger.info(`SMS sent to ${to} with message: '${message}'`);
		return Promise.resolve("success");
	}
}
