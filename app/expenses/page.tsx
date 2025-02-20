"use client"

import { useState, useEffect } from "react"
import QrScannerModal from "./components/QrScannerModal"
import CupomList from "./components/CupomList"
import ManualEntryForm from "./components/ManualEntryForm"
import axios from "axios"

interface CupomData {
  nome: string
  valor: string
  data: string
  number: string
}

export default function Entradas() {
  const [, setCupomData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<CupomData[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem("cupons")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleScanSuccess = async (data: string) => {
    setCupomData(data)
    await handleRequestApi(data)
  }

  const handleRequestApi = async (qrData: string) => {
    setLoading(true)
    try {
      const backendURL = "https://leitor-cupom-fiscal-9ota.vercel.app"
      const response = await axios.get<CupomData>(`${backendURL}/api/cupom/buscar-dados`, {
        params: { url: qrData },
      })

      const updatedHistory = [...history, response.data]
      setHistory(updatedHistory)

      localStorage.setItem("cupons", JSON.stringify(updatedHistory))
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearList = () => {
    setHistory([])
    localStorage.removeItem("cupons")
  }

  const handleManualEntry = (data: CupomData) => {
    const updatedHistory = [...history, data]
    setHistory(updatedHistory)
    localStorage.setItem("cupons", JSON.stringify(updatedHistory))
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-primary">Tabela de saídas</h1>
      <div className="flex gap-4 mb-6">
        <QrScannerModal onScanSuccess={handleScanSuccess} />
        <ManualEntryForm onSubmit={handleManualEntry} />
      </div>

      {loading && <p className="text-muted-foreground">Carregando...</p>}

      <CupomList cupons={history} onClear={handleClearList} />
    </div>
  )
}

