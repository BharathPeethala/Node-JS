import mysql from "mysql2";
import dotenv from "dotenv";
import { logger } from "../utils/index.js";

dotenv.config();

// db connection 
const mysqlConnection = mysql.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

mysqlConnection.on("acquire", (connection) => {
	logger.info(`DB connection:${connection.threadId} is successful`);
});

mysqlConnection.on("error", (error) => {
	logger.info(`DB connection is unsuccessful Error:${error}`);
});

export default mysqlConnection;
