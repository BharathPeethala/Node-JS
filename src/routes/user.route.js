import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.js";

const userRoutes = Router();

// user routes
userRoutes.route("/create").post(createUser);
userRoutes.route("/login").post(loginUser);

export default userRoutes;
