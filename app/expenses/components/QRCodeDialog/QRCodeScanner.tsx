'use client';

import React, { useEffect, useState, ComponentProps } from 'react';
import dynamic from 'next/dynamic';

// Importa dinamicamente o QrReader (evita SSR quebrar com WebRTC)
const QrReader = dynamic(() => import('react-qr-reader-es6'), { ssr: false });

// Define as props personalizadas para aceitar `constraints`
interface QrReaderWithConstraintsProps extends ComponentProps<typeof QrReader> {
  constraints?: {
    video: {
      facingMode: string;
      width: { ideal: number };
      height: { ideal: number };
    };
  };
}

// Aplica a nova tipagem ao componente dinamicamente importado
const QrReaderWithConstraints = QrReader as React.ComponentType<QrReaderWithConstraintsProps>;

interface QRCodeScannerProps {
  setCode: (code: string) => void;
  setOpen: (open: boolean) => void;
}

export function QRCodeScanner({ setCode, setOpen }: QRCodeScannerProps) {
  const [loading, setLoading] = useState(true);
  const [shouldShowScanner, setShouldShowScanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShouldShowScanner(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      setShouldShowScanner(false);
    };
  }, []);

  const handleScan = (data: string | null) => {
    if (data) {
      setCode(data);
      setOpen(false);
    }
  };

  const handleError = (err: unknown) => {
    if (
      err instanceof DOMException &&
      err.name === 'AbortError' &&
      err.message.includes('play() request')
    ) {
      return;
    }
    console.error('Erro ao acessar câmera:', err);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {loading && (
        <p className="text-muted-foreground mb-4 text-sm">Carregando câmera...</p>
      )}

      {!loading && shouldShowScanner && (
        <>
          <p className="text-sm text-gray-500 text-center mb-4">
            Aproxime a câmera do QR Code para melhorar o foco automático.
          </p>

          <QrReaderWithConstraints
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%', maxWidth: '400px' }}
            constraints={{
              video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 },
              },
            }}
          />
        </>
      )}
    </div>
  );
}
