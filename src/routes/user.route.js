import { Router } from "express";
import {
  createUser,
  googleCallbackFailure,
  googleCallbackSuccess,
  loginUserJWT,
  loginUserSession,
} from "../controllers/user.js";
import passport from "passport";
const userRoutes = Router();

// user routes
userRoutes.route("/create").post(createUser);
userRoutes.route("/session/login").post(loginUserSession);
userRoutes.route("/jwt/login").post(loginUserJWT);
userRoutes
  .route("/google/login")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));

userRoutes.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "/user/google/callback/success",
    failureRedirect: "/user/google/callback/failure",
  })
);

userRoutes.route("/google/callback/success").get(googleCallbackSuccess);
userRoutes.route("/google/callback/failure").get(googleCallbackFailure);


export default userRoutes;
