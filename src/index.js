import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { HttpStatus, logger } from "./utils/index.js";
import mysqlConnection from "./db/mysql.config.js";
import Response from "./domain/Response.js";

dotenv.config();
const app = new express();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
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

	// checking mysql connections
	mysqlConnection.getConnection((error, connection) => {
		if (error) {
			logger.error(`DB connection is unsuccessful Error:${error}`);
		} else {
			logger.info(`DB connection:${connection.threadId} is successful`);
			connection.release();
		}
	});
});
