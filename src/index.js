import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import userRoutes from "./routes/user.route.js";

import { HttpStatus, logger } from "../utils/index.js";

import Response from "./domain/Response.js";

import mysqlConnection from "./config/mysql.config.js";
import sessionConfig from "./config/session.config.js";
import checkSession from "./middleware/authCheck.js";

// checking mysql connections
mysqlConnection.getConnection((error, connection) => {
	if (error) {
		logger.error(`DB connection is unsuccessful Error:${error}`);
	} else {
		logger.info(`DB connection:${connection.threadId} is successful`);
		connection.release();
	}
});

dotenv.config();
const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionConfig));

app.use("/user", userRoutes);

app.get("/", checkSession, (req, res) => {
	res.send(
		new Response(
			HttpStatus.OK.code,
			HttpStatus.OK.status,
			"Server is available"
		)
	);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	logger.info("Server is ready to handle the connections at port:3000");
});
