//@ts-check
import { body, validationResult } from "express-validator";
import { validateToken } from "../../../services/jwt/jwt.service.js";
import { userTokenModel } from "../../../services/jwt/jwttoken.model.js";
import { UserModel } from "./users.model.js";
import { prepareResponse } from "../../../utils/response-handler.js";

export const validateSignUp = [
  body("userName")
    .notEmpty()
    .withMessage("Username should not be empty")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage(
      "Username should not contain any number or special characters"
    ),
  body("email")
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Email should be valid"),
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAuthUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers["authorization"];
    //console.log("authHeader: ", token);
    if (!token) {
      const response = prepareResponse({}, "Unauthorized: No token provided");
      return res.status(401).send(response);
    }

    // Validate the token
    const decoded = await validateToken(token);
    if (!decoded.valid) {
      const response = prepareResponse({}, "Unauthorized: Invalid token");
      return res.status(401).send(response);
    }

    const { userId } = decoded.userInfo;
    //console.log("Valid Token userId", { userId });

    // Check if the token exists in the UserTokens collection
    const userTokens = await userTokenModel.findOne({ accessTokens: token });

    console.log("Valid Token userId", { userTokens });
    if (!userTokens) {
      const response = prepareResponse({}, "Unauthorized: Invalid token");
      return res.status(401).send(response);
    }

    // Check if the user exists in the UserModel
    const user = await UserModel.findById(userId);
    if (!user) {
      const response = prepareResponse(
        {},
        "The user is no longer active. Please contact admin"
      );
      return res.status(401).send(response);
    }

    // If all checks pass, proceed to the next middleware or route handler
    req.user = {
      userId,
      userName: user.userName,
      email: user.email,
    };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send("Internal server error");
  }
};
