import bcrypt from "bcrypt";
import { logger } from "../utils/index.js";

const generateHash = async (password) => {
	try {
		let salt = await bcrypt.genSalt(10);
		let hash = await bcrypt.hash(password, salt);
		logger.info("Hash generated successfully");
		return hash;
	} catch (error) {
		logger.error(`Hashing generat Error:${error}`);
	}
};

const compareHash = async (data, hash) => {
	try {
		let result = await bcrypt.compare(data, hash);
		return result;
	} catch (error) {
		logger.error(`Hashing compare Error:${error}`);
	}
};

export { generateHash, compareHash };
