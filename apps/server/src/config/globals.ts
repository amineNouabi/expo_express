import path from "path";
import dotenv from "dotenv";

import logger from "./logger";

const dotenvOutput = dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

if (dotenvOutput.error) {
	logger.error("Error: 💥 ERROR LOADING .env FILE", dotenvOutput.error);
}

export const env = {
	NODE_ENV: process.env.NODE_ENV || "development",
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3000,
	DOMAIN: process.env.DOMAIN || "localhost",
	DATABASE_URL: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/salut_bricole",
	JWT: {
		ISSUER: process.env.JWT_ISSUER || "localhost",
		AUDIENCE: process.env.JWT_AUDIENCE || "localhost",
		EXPIRES_IN: process.env.JWT_EXPIERS_IN || "1d",
		SECRET: process.env.JWT_SECRET || "",
	},
};
