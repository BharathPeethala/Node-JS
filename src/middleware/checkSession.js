import { HttpStatus, logger } from "../../utils/index.js";
import Response from "../domain/Response.js";

const checkSession = (req, res, next) => {
	if (req.session.userInfo) {
		logger.info("Checking Session");
		next();
	} else {
		logger.error("Session is corrupted");
		res.send(
			new Response(
				HttpStatus.NOT_FOUND.code,
				HttpStatus.NOT_FOUND.status,
				"login required"
			)
		);
	}
};

export default checkSession;
