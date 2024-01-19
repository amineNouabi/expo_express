import { readFileSync } from "fs";
import { resolve } from "path";
// import { bind } from "decko";
// import { Vonage } from "@vonage/server-sdk";
// import { Auth } from "@vonage/auth";

// import { env } from "../../config";
// import { Channels } from "@vonage/verify2";

export class MessagingService {
	// private client: Vonage;
	static readonly smsFrom = "Salut Bricole";
	static readonly privateKey = readFileSync(resolve("private.key"));

	// constructor() {
	// 	this.client = new Vonage(
	// 		new Auth({
	// 			applicationId: env.VONAGE.APP_ID,
	// 			privateKey: MessagingService.privateKey,
	// 		}),
	// 	);
	// }

	// @bind
	// async sendSms(to: string, message: string) {
	// 	return this.client.sms.send({
	// 		to,
	// 		from: MessagingService.smsFrom,
	// 		text: message,
	// 	});
	// }

	// @bind
	// async sendVerificationCodeSms(to: string) {
	// 	return this.client.verify2.newRequest({
	// 		brand: "Salut Bricole",
	// 		workflow: [
	// 			{
	// 				channel: Channels.SMS,
	// 				to,
	// 			},
	// 		],
	// 	});
	// }
	// @bind
	// async checkVerificationCodeSms(requestId: string, code: string) {
	// 	return this.client.verify2.checkCode(requestId, code);
	// }
}
