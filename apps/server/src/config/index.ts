import env from "./globals";
import logger from "./logger";
import prisma from "./db-client";
import AppError from "./AppError";

export { env, logger, prisma, AppError };

export default {
	env,
	logger,
	prisma,
	AppError,
};
