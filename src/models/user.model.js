import mysqlConnection from "../db/mysql.config.js";
import { logger } from "../utils/index.js";
import { compareHash, generateHash } from "../utils/passwordHashing.js";

const table = "users";
const UserModel = {
	createUser: async ({ name, email, password }) => {
		try {
			const hashedPassword = await generateHash(password);
			const userInsertQuery = `INSERT INTO ${table} (Name, Email, Password) VALUES (?, ?, ?)`;

			const results = await new Promise((resolve, reject) => {
				mysqlConnection.query(
					userInsertQuery,
					[name, email, hashedPassword],
					(error, results) => {
						if (error) {
							reject(error);
						} else {
							resolve(results);
						}
					}
				);
			});

			const userId = results.insertId;
			const message = `Inserted user successfully id:[${userId}]`;
			logger.log("info", message);
			return message;
		} catch (error) {
			const message = `Error inserting user: ${error}`;
			logger.log("error", message);
			throw message;
		}
	},

	loginUser: async (email, password) => {
		try {
			const userInsertQuery = `SELECT Password FROM ${table} WHERE Email = ?`;

			const results = await new Promise((resolve, reject) => {
				mysqlConnection.query(userInsertQuery, [email], (error, results) => {
					if (error) {
						reject(error);
					} else {
						resolve(results);
					}
				});
			});

			if (results.length) {
				const valid = await compareHash(password, results[0]["Password"]);
				if (valid) {
					const message = `${email}: User is authenticated`;
					logger.info(message);
					return message;
				} else {
					const message = `${email}:Password is invalid`;
					logger.error(message);
					return message;
				}
			} else {
				const message = `${email}:No such user found.`;
				logger.error(message);
				return message;
			}
		} catch (error) {
			const message = `Error while searching the user: ${error}`;
			logger.error(message);
			throw message;
		}
	},
};

export default UserModel;
