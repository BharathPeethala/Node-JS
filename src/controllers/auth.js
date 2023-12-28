import Response from "../domain/Response.js";
import { logger, HttpStatus } from "../utils/index.js";

const auth = (req, res) => {
	logger.info("auth started");
	res.send(
		new Response(HttpStatus.OK.code, HttpStatus.OK.status, "auth is ready")
	);
};

export { auth };
