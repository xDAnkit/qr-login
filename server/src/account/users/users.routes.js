import Express from "express";
import { getProfile, signinUser, signupUser } from "./users.controller.js";
import { validateAuthUser, validateSignUp } from "./users.validator.js";

const usersRouter = Express.Router();

usersRouter.get("/", validateAuthUser, getProfile);
usersRouter.post("/signup", validateSignUp, signupUser);
usersRouter.post("/signin", signinUser);

export default usersRouter;
