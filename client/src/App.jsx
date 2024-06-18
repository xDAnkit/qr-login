import React from "react";
import LoginPageForMobile from "./Pages/LoginPageForMobile";
import LoginPageForWeb from "./Pages/LoginPageForWeb";
import QRScannerPageForMobile from "./Pages/QRScannerPageForMobile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <LoginPageForMobile />
              <LoginPageForWeb />
            </>
          }
        />
        <Route
          path="/"
          element={
            <div>
              home <QRScannerPageForMobile />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
