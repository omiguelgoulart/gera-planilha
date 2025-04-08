'use client';

import { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { QRCodeScanner } from './QRCodeScanner';

interface QRCodeDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCode: (code: string) => void;
}

export function QRCodeDialog({ open, setOpen, setCode }: QRCodeDialogProps) {
  const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-4 animate-fade-in scale-100 transition duration-200">
        {/* Header com título e botão de fechar */}
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Leitor de QR Code</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Fechar"
          >
            <IoIosClose className="text-2xl" />
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div className="mt-4">
          {typeof window !== 'undefined' && window.innerWidth < 768 && !isHttps ? (
            <p className="text-sm text-gray-600">
              Essa funcionalidade requer HTTPS para funcionar corretamente em dispositivos móveis.
            </p>
          ) : (
            <QRCodeScanner setCode={setCode} setOpen={setOpen} />
          )}
        </div>
      </div>
    </div>
  );
}
