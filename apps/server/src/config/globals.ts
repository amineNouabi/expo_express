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
	DATABASE_URL: process.env.DATABASE_URL,
	JWT: {
		ISSUER: process.env.JWT_ISSUER || "localhost",
		AUDIENCE: process.env.JWT_AUDIENCE || "localhost",
		EXPIRES_IN: process.env.JWT_EXPIERS_IN || "1d",
		SECRET: process.env.JWT_SECRET || "",
	},
	VONAGE: {
		API_KEY: process.env.VONAGE_API_KEY || "",
		API_SECRET: process.env.VONAGE_API_SECRET || "",
		APP_ID: process.env.VONAGE_APP_ID || "",
	},
	SMSTO: {
		API_KEY: process.env.SMSTO_API_KEY || "",
	},
};

export default env;
