import { createLogger, format, transports, addColors } from "winston";

// import { env } from "./globals";

const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "blue",
};

addColors(colors);

const logger = createLogger({
	level: "info",
	format: format.combine(
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		format.colorize({ all: true }),
		format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
	),
});

//To edit later : add log files and consider dev and prod envs.
// if (env.NODE_ENV === "development")
logger.add(
	new transports.Console({
		format: format.combine(
			format.colorize(),
			format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
		),
		level: "debug",
	}),
);

export default logger;
