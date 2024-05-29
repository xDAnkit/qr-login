import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  accessTokens: {
    type: [String],
    required: [true, "Access tokens are required"],
  },
  refreshTokens: {
    type: [String],
    required: [true, "Refresh tokens are required"],
  },
});

export const userTokenModel = mongoose.model("UserTokens", userTokenSchema);
