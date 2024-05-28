import jwt from "jsonwebtoken";
import { JWT_PWD } from "./jwt.config.js";

/**
 * @description {Method to create JWT token}
 * @param {*} payload
 */
export const generateToken = (payload) => {
  console.log({ JWT_PWD, payload });
  const accessToken = jwt.sign(payload, JWT_PWD);
  return { accessToken };
};

export const validateToken = () => {};
export const regenrateToken = () => {};
export const destroyToken = () => {};
export const decodeToken = () => {};
