import { Router } from "express";
import {
  createUser,
  loginUserJWT,
  loginUserSession,
} from "../controllers/user.js";

const userRoutes = Router();

// user routes
userRoutes.route("/create").post(createUser);
userRoutes.route("/session/login").post(loginUserSession);
userRoutes.route("/jwt/login").post(loginUserJWT);

export default userRoutes;
