import Express from "express";
import { signinUser, signupUser } from "./users.controller.js";

const usersRouter = Express.Router();

usersRouter.post("/signup", signupUser);
usersRouter.post("/signin", signinUser);

export default usersRouter;
