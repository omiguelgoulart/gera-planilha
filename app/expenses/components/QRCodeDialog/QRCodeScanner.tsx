'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import Loading from '../Loading';

const QrReader = dynamic(() => import('react-qr-reader-es6'), {
  ssr: false,
});

type QRCodeScannerProps = {
  setCode: (code: string) => void;
  setOpen: (open: boolean) => void;
};

const StyledWrapper = styled('div')({
  '& .qr-reader section > div': {
    boxShadow: 'white 0px 0px 0px 2px inset !important',
  },
});

export function QRCodeScanner({ setCode, setOpen }: QRCodeScannerProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleScan = (data: string | null) => {
    if (data) {
      setCode(data);
      setOpen(false);
    }
  };

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      console.error('Erro ao ler QR Code:', err.message);
    } else {
      console.error('Erro desconhecido ao ler QR Code:', err);
    }
  };
  

  return (
    <StyledWrapper className="w-full flex justify-center items-center mt-4">
      {loading ? (
        <div className="mb-8">
          <Loading />
        </div>
      ) : (
        <QrReader
          className="qr-reader"
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%', maxWidth: '400px' }}
        />
      )}
    </StyledWrapper>
  );
}
