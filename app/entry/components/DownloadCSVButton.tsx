"use client"

import { Button } from "@/components/ui/button"

export default function DownloadCSVButton() {
  const downloadCSV = () => {
    const entries = JSON.parse(localStorage.getItem("financialEntries") || "[]")
    const headers = [
      "Date",
      "Cash",
      "Debit Card",
      "PIX",
      "iFood",
      "Credit Card",
      "Voucher",
      "Debit Machine",
      "Credit Machine",
    ]
    const csvContent = [
      headers.join(","),
      ...entries.map((entry: { date: string; cash: number; debitCard: number; pix: number; ifood: number; creditCard: number; voucher: number; debitMachine: number; creditMachine: number }) =>
        [
          entry.date,
          entry.cash,
          entry.debitCard,
          entry.pix,
          entry.ifood,
          entry.creditCard,
          entry.voucher,
          entry.debitMachine,
          entry.creditMachine,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "financial_data.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return <Button onClick={downloadCSV}>Download CSV</Button>
}

