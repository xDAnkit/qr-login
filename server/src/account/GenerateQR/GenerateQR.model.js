import Mongoose from "mongoose";

const QRdataSchema = Mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: [true, "sessionId field is required"],
    },
    validUpto: {
      type: Number,
      required: [true, "validUpto field is required"],
    },
    updatedAt: { type: Date, required: [true, "updatedAt field is required"] },
    isExpired: {
      type: Boolean,
      required: [true, "isExpired field is required"],
    },
    ipAddress: {
      type: String,
      required: [true, "ipAddress field is required"],
    },
    hostName: {
      type: String,
      required: [true, "hostName    field is required"],
    },
  },
  { timestamps: true }
);

export const QRdataModel = Mongoose.model("qrdatas", QRdataSchema);
