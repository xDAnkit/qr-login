import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import loader from "../assets/loader.svg";
import axios from "axios";

const QRcode = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [QRvalue, setQRvalue] = useState(null);
  const [QRdataRequestCount, setQRdataRequestCount] = useState(0);

  const countOfRequestingQR = 3;

  const getQrData = async () => {
    try {
      setIsLoading(true);
      await axios
        // use original backend api to get qr data i am using dummy api here to test functionality
        .get("https://fakestoreapi.com/products/1")
        .then((response) => {
          setQRvalue("manas");
          setTimeout(() => {
            setQRdataRequestCount((prev) => prev + 1);
          }, 5000);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    QRdataRequestCount < countOfRequestingQR ? getQrData() : setQRvalue(null);
  }, [QRdataRequestCount]);

  return (
    <div className="p-10 bg-white flex w-max rounded-lg">
      {QRvalue || IsLoading ? (
        <>
          <QRCodeSVG value={QRvalue} />
          {IsLoading && <img src={loader} alt="" />}
        </>
      ) : (
        <button onClick={getQrData}>Generate QR ! </button>
      )}
    </div>
  );
};

export default QRcode;
