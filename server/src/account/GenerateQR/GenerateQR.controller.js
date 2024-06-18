import { QRdataModel } from "./GenerateQR.model.js";

const generateQRController = async (req, res) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress;
    const hostName = req.hostname;
    const sessionId = crypto.randomUUID();
    const updatedAt = new Date();
    const isExpired = false;

    const qrDataToSave = {
      sessionId,
      validUpto: 3000,
      updatedAt,
      isExpired,
      ipAddress,
      hostName,
    };

    const qrDataToSaveModel = new QRdataModel(qrDataToSave);
    const response = await qrDataToSaveModel.save();

    //   console.log(response);

    res.status(201).send({ sessionId });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export default generateQRController;
