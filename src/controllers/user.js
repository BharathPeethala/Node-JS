import Response from "../domain/Response.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { logger, HttpStatus } from "../../utils/index.js";
import dotenv from "dotenv";

// Creating the user in the DB

dotenv.config();

const createUser = (req, res) => {
  logger.info("Creating User");
  UserModel.createUser(req.body)
    .then((message) => {
      res.send(
        new Response(
          HttpStatus.CREATED.code,
          HttpStatus.CREATED.status,
          message
        )
      );
    })
    .catch((error) => {
      res.send(
        new Response(
          HttpStatus.INTERNAL_SERVER_ERROR.code,
          HttpStatus.INTERNAL_SERVER_ERROR.status,
          error
        )
      );
    });
};

const loginUserSession = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  UserModel.loginUser(email, password)
    .then(({ message, userId }) => {
      req.session.userInfo = { userId: userId, userName: email };
      res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, message));
    })
    .catch((error) => {
      res.send(
        new Response(
          HttpStatus.INTERNAL_SERVER_ERROR.code,
          HttpStatus.INTERNAL_SERVER_ERROR.status,
          error
        )
      );
    });
};

const loginUserJWT = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  UserModel.loginUser(email, password)
    .then(({ message, userId }) => {
      const user = { email: email, userId: userId };
      const jwtToken = jwt.sign(user, process.env.ACCESS_TOKEN);
      res.send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, message, {
          "JWT TOKEN": jwtToken,
        })
      );
    })
    .catch((error) => {
      res.send(
        new Response(
          HttpStatus.INTERNAL_SERVER_ERROR.code,
          HttpStatus.INTERNAL_SERVER_ERROR.status,
          error
        )
      );
    });
};
export { createUser, loginUserSession, loginUserJWT };
