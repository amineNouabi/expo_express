import morgan from "morgan";

import { env, logger } from "../../config/index";

const stream = {
	write: (message: string) => logger.http(message),
};

const skip = () => {
	return env.NODE_ENV !== "development";
};

export default morgan(":remote-addr :method :url :status :res[content-length] - :response-time ms", { stream, skip });
