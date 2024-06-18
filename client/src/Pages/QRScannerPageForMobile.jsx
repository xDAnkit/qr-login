import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScannerPageForMobile = () => {
  const [QRData, setQRData] = useState("");

  useEffect(() => {
    // i will do api call here
  }, [QRData]);

  return (
    <section>
      <h3 className="text-gray-500 text-center"> Scan QR code </h3>
      <p>{QRData}</p>
      <div className=" border-red-500 border-2 h-full w-full max-h-[400px] max-w-[300px] bg-gray-100 flex items-center justify-center">
        <QrReader
          className=" w-full"
          onResult={(result, error) => {
            if (!!result) {
              setQRData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
    </section>
  );
};

export default QRScannerPageForMobile;
