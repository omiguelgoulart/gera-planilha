'use client';

import React from 'react';
import { QRCodeDialog } from './QRCodeDialog';

interface QRCodeScannerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onScanSuccess: (code: string) => void;
}

export default function QRCodeScannerModal({
  open,
  setOpen,
  onScanSuccess,
}: QRCodeScannerModalProps) {
  const handleSetCode = (code: string) => {
    if (code) {
      onScanSuccess(code); // Envia para o componente pai
    }
  };

  return (
    <QRCodeDialog
      open={open}
      setOpen={setOpen}
      setCode={handleSetCode}
    />
  );
}
