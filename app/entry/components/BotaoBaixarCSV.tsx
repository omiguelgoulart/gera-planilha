"use client"

import { Button } from "@/components/ui/button"

export default function BotaoBaixarCSV() {
  const baixarCSV = () => {
    const entradas = JSON.parse(localStorage.getItem("entradasFinanceiras") || "[]")
    const cabecalhos = [
      "Data",
      "Dinheiro",
      "Cartão Débito",
      "PIX",
      "iFood",
      "Cartão Crédito",
      "Voucher",
      "Máquina Débito",
      "Máquina Crédito",
    ]
    const conteudoCSV = [
      cabecalhos.join(","),
      ...entradas.map((entrada: { data: string; dinheiro: number; cartaoDebito: number; pix: number; ifood: number; cartaoCredito: number; voucher: number; maquinaDebito: number; maquinaCredito: number; }) =>
        [
          entrada.data,
          entrada.dinheiro,
          entrada.cartaoDebito,
          entrada.pix,
          entrada.ifood,
          entrada.cartaoCredito,
          entrada.voucher,
          entrada.maquinaDebito,
          entrada.maquinaCredito,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([conteudoCSV], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "dados_financeiros.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return <Button onClick={baixarCSV}>Baixar CSV</Button>
}

