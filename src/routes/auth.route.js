import express from "express";
import { auth } from "../controllers/auth.js";

const authRoutes = express.Router();

authRoutes.route("/").get(auth);

export default authRoutes;
