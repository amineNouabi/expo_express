import { createServer } from "http";

import App from "./api/app";

import prisma from "./config/db.client";
import logger from "./config/logger";
import { env } from "./config/globals";

async function main() {
	process.on("uncaughtException", (err: Error) => {
		logger.error("Error: 💥 UNCAUGHT EXCEPTION! Shutting down...", err.name, err.message);
		process.exit(1);
	});

	prisma
		.$connect()
		.then(() => logger.info("🚀 Database connected!"))
		.catch((err) => logger.error("Error: 💥 DATABASE CONNECTION ERROR", err));

	try {
		const app = new App().app;
		const server = createServer(app);

		server.listen(env.NODE_PORT);

		server.on("listening", () => {
			logger.info(`⚡️[server]: Server is running at http://localhost:${env.NODE_PORT} in ${env.NODE_ENV} mode`);
		});

		server.on("close", () => {
			prisma.$disconnect();
			logger.info("💥 Server Closed!");
		});

		process.on("unhandledRejection", (err: Error) => {
			logger.error("Error: 💥 UNHANDLED REJECTION! Shutting down...", err.name, err.message);
			server.close(() => {
				process.exit(1);
			});
		});

		process.on("SIGTERM", () => {
			logger.error("👋 SIGTERM RECEIVED. Shutting down gracefully");
			server.close();
		});
	} catch (error) {
		logger.error("Error: 💥 ERROR STARTING SERVER", error);
	}
}

main();
