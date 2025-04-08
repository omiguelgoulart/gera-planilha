'use client';

import { useState, useEffect } from 'react';
import QRCodeScannerModal from './components/QRCodeScannerModal'; // ajuste o nome se necessário
import CupomList from './components/CupomList';
import ManualEntryForm, { type CupomData } from './components/ManualEntryForm';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function Entradas() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<CupomData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('cupons');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleScanSuccess = async (data: string) => {
    setModalOpen(false); // Fecha o modal
    await handleRequestApi(data);
  };

  const handleRequestApi = async (qrData: string) => {
    setLoading(true);
    try {
      const backendURL = 'https://leitor-cupom-fiscal-9ota.vercel.app';
      const response = await axios.get<CupomData>(`${backendURL}/api/cupom/buscar-dados`, {
        params: { url: qrData },
      });

      const newCupom = { ...response.data, id: uuidv4() };
      const updatedHistory = [...history, newCupom];
      setHistory(updatedHistory);
      localStorage.setItem('cupons', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearList = () => {
    setHistory([]);
    localStorage.removeItem('cupons');
  };

  const handleManualEntry = (data: CupomData) => {
    const newCupom = { ...data, id: uuidv4() };
    const updatedHistory = [...history, newCupom];
    setHistory(updatedHistory);
    localStorage.setItem('cupons', JSON.stringify(updatedHistory));
  };

  const handleEdit = (id: string, data: CupomData) => {
    const updatedHistory = history.map((cupom) => (cupom.id === id ? { ...data, id } : cupom));
    setHistory(updatedHistory);
    localStorage.setItem('cupons', JSON.stringify(updatedHistory));
  };

  const handleDelete = (id: string) => {
    const updatedHistory = history.filter((cupom) => cupom.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('cupons', JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-primary">Entradas de Cupons Fiscais</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Escanear QR Code
        </button>

        <ManualEntryForm onSubmit={handleManualEntry} />
      </div>

      {loading && <p className="text-muted-foreground">Carregando...</p>}

      <CupomList
        cupons={history}
        onClear={handleClearList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <QRCodeScannerModal
        open={modalOpen}
        setOpen={setModalOpen}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}
