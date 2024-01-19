export abstract class BaseSMS {
	abstract sendSms(to: string, message: string): Promise<string>;
}
