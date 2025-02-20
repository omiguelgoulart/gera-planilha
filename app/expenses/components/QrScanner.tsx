"use client";

import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

interface QrScannerProps {
  onScanSuccess: (data: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess }) => {
  const [data, setData] = useState<string | null>(null);
  const [cameraAvailable, setCameraAvailable] = useState<boolean>(true);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setCameraAvailable(true))
      .catch((error) => {
        console.error("Erro ao acessar a câmera:", error);
        setCameraAvailable(false);
      });
  }, []);

  const handleScanSuccess = async (qrData: string) => {
    console.log("QR Code identificado:", qrData);
    setData(qrData);
    onScanSuccess(qrData);
  };

  return (
    <div>
      {cameraAvailable ? (
        <QrReader
          onResult={(result, error) => {
            if (result?.getText) {
              handleScanSuccess(result.getText());
            }
            if (error) {
              console.error(error);
            }
          }}
          constraints={{ facingMode: "environment" }}
          scanDelay={300}
          className="w-60"
        />
      ) : (
        <p>⚠️ Erro: Não foi possível acessar a câmera. Verifique as permissões do navegador.</p>
      )}
      <p>{data}</p>
    </div>
  );
};

export default QrScanner;
