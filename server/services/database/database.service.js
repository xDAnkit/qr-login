import { DATABASE_URL } from "./database.config.js";
import { connect } from "mongoose";

export const initDB = async () => {
  try {
    await connect(DATABASE_URL);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.log("MongoDB connection failed", err);
  }
};
