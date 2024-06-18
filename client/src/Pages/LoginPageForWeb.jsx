import React from "react";
import QRcode from "../Components/QRcode";

const LoginPageForWeb = () => {
  return (
    <section className="w-full h-screen bg-gray-200 hidden justify-center items-center sm:flex">
      <section className="flex justify-center gap-7 h-[250px] items-center">
        <div className="text-[40px] font-extrabold">
          Scan the QR code to login .
        </div>
        <div className="h-full w-0 border-gray-400 border-2" />
        <QRcode />
      </section>
    </section>
  );
};

export default LoginPageForWeb;
