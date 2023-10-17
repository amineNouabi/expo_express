export type Response = {
	status: number;
	message?: string;
};

export type SendSmsResponse = Response & {
	requestId: string;
};
