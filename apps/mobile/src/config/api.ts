import { create } from "apisauce";

import { env } from "./globals";

const apiPrefix = "api/v0" as const;

export default create({
	baseURL: `${env.baseURL}/${apiPrefix}`,
	headers: {
		"Content-Type": "application/json",
	},
});
