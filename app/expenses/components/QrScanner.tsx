"use client"

import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

interface QrScannerProps {
  onScanSuccess: (data: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess }) => {
  const [data, setData] = useState<string | null>(null);

  const handleScanSuccess = (qrData: string) => {
    console.log("QR Code identificado:", qrData);
    setData(qrData);

    // Chama o callback onScanSuccess e passa os dados lidos
    onScanSuccess(qrData);
  };

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            handleScanSuccess(result.getText()); // Usar getText() para acessar o texto do QR code
          }
          if (error) {
            console.error(error);
          }
        }}
        constraints={{ facingMode: "environment" }}
        className="w-60"
      />
      <p>{data}</p>
    </div>
  );
};

export default QrScanner;