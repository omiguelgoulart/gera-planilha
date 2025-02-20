"use client"

import { useState, useEffect } from "react"

type Entry = {
  date: string
  cash: number
  debitCard: number
  pix: number
  ifood: number
  creditCard: number
  voucher: number
  debitMachine: number
  creditMachine: number
}

export default function FinancialTable() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    const loadEntries = () => {
      const storedEntries = JSON.parse(localStorage.getItem("financialEntries") || "[]")
      setEntries(storedEntries)
    }

    loadEntries()
    window.addEventListener("storage", loadEntries)

    return () => {
      window.removeEventListener("storage", loadEntries)
    }
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Data</th>
            <th className="px-4 py-2 border">Dinheiro</th>
            <th className="px-4 py-2 border">Cartão Débito</th>
            <th className="px-4 py-2 border">PIX</th>
            <th className="px-4 py-2 border">iFood</th>
            <th className="px-4 py-2 border">Cartão Crédito</th>
            <th className="px-4 py-2 border">Voucher</th>
            <th className="px-4 py-2 border">Máquina Débito</th>
            <th className="px-4 py-2 border">Máquina Crédito</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{entry.date}</td>
              <td className="px-4 py-2 border">{entry.cash}</td>
              <td className="px-4 py-2 border">{entry.debitCard}</td>
              <td className="px-4 py-2 border">{entry.pix}</td>
              <td className="px-4 py-2 border">{entry.ifood}</td>
              <td className="px-4 py-2 border">{entry.creditCard}</td>
              <td className="px-4 py-2 border">{entry.voucher}</td>
              <td className="px-4 py-2 border">{entry.debitMachine}</td>
              <td className="px-4 py-2 border">{entry.creditMachine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

