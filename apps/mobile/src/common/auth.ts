import { ApiResponse } from "apisauce";
import api from "../config/api";

import { SendSmsResponse, Response } from "../types/Responses";

const prefix = "/auth";

export const sendSmsCode = async (phone: string): Promise<ApiResponse<SendSmsResponse, Response>> => {
	return api.post(`${prefix}/send-sms-code`, { phone });
};

export const verifySmsCode = async (requestId: string, code: string) => {
	return api.post(`${prefix}/verify-sms-code`, { requestId, code });
};
