import Express from "express";
import { signinUser, signupUser } from "./users.controller.js";
import { validateSignUp } from "./users.validator.js";

const usersRouter = Express.Router();

usersRouter.post("/signup", validateSignUp, signupUser);
usersRouter.post("/signin", signinUser);

export default usersRouter;
