import { HttpStatus, logger } from "../../utils/index.js";
import Response from "../domain/Response.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkAuth = (req, res, next) => {
  let decodedData;
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    decodedData = token && jwt.verify(token, process.env.ACCESS_TOKEN);
  } catch (error) {
    logger.error("Unauthourized request");
    res.send(
      new Response(
        HttpStatus.BAD_REQUEST.code,
        HttpStatus.BAD_REQUEST.status,
        "Invalid Request"
      )
    );
    return;
  }

  logger.info("Checking request is authourized or not");
  if (req.session.userInfo) {
    logger.info("Session is valid");
    next();
  } else if (decodedData) {
    logger.info("Token is valid");
    next();
  } else {
    logger.error("Unauthourized request");
    res.send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        "login required"
      )
    );
  }
};

export default checkAuth;
