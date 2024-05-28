import jwt from "jsonwebtoken";
import { ACCESS_EXP_IN, JWT_PWD, REFRESH_EXP_IN } from "./jwt.config.js";

/**
 * @description Method to create JWT and refresh tokens
 * @param {*} payload
 * @returns {Object} Contains the generated access and refresh tokens
 */
export const generateToken = (payload) => {
  console.log({ JWT_PWD, payload });

  // Generate access token
  const accessToken = jwt.sign(payload, JWT_PWD, { expiresIn: ACCESS_EXP_IN });

  // Generate refresh token with 1 year validity
  const refreshToken = jwt.sign(payload, JWT_PWD, {
    expiresIn: REFRESH_EXP_IN,
  });

  return { accessToken, refreshToken };
};

/**
 * @description Method to validate a JWT token
 * @param {string} token - The JWT token to validate
 * @returns {Object} Decoded payload if the token is valid, otherwise an error message
 */
export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_PWD);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

/**
 * @description Method to regenerate a new access token using the refresh token
 * @param {string} refreshToken - The refresh token
 * @returns {Object} Contains the new generated access token or an error message
 */
export const regenerateToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_PWD);
    const newAccessToken = jwt.sign(decoded, JWT_PWD, { expiresIn: "1h" });
    return { newAccessToken };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * @description Method to destroy a JWT token
 * @param {string} token - The JWT token to destroy
 * @returns {Object} Confirmation message of token destruction
 */
export const destroyToken = (token) => {
  // JWT tokens are stateless and cannot be destroyed server-side.
  // To 'destroy' a token, it must be invalidated on the client side, or added to a deny list on the server.
  return {
    message:
      "Token destruction must be handled on the client side or by maintaining a deny list on the server.",
  };
};

/**
 * @description Method to decode a JWT token without verifying its signature
 * @param {string} token - The JWT token to decode
 * @returns {Object} Decoded payload or an error message
 */
export const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    return { decoded };
  } catch (error) {
    return { error: error.message };
  }
};
