import express from "express";
import generateQRController from "./GenerateQR.controller.js";

const QRrouter = express.Router();

QRrouter.get("/", generateQRController);

export default QRrouter;
