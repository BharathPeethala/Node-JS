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
	database: process.env.DB_NAME,
});

export default mysqlConnection;
