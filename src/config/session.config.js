import dotenv from "dotenv";
import MySQLStore from "express-mysql-session";
import session from "express-session";
import mysqlConnection from "./mysql.config.js";

dotenv.config();

const sessionStoreOptions = {
	expiration: 86400000,
	createDatabaseTable: true,
	schema: {
		tableName: "sessions",
		columnNames: {
			session_id: "session_id",
			expires: "expires",
			data: "data",
		},
	},
};

const MySQLStoreInstance = MySQLStore(session);
const sessionStore = new MySQLStoreInstance(
	sessionStoreOptions,
	mysqlConnection
);

const sessionConfig = {
	name: "session_id",
	secret: process.env.SESS_SECRET,
	saveUninitialized: false,
	resave: false,
	store: sessionStore,
	saveUninitialized: false,
	cookie: {
		sameSite: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 1000 * 60 * 60 * 2,
	},
};

export default sessionConfig;
