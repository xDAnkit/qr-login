import { body, validationResult } from "express-validator";

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
