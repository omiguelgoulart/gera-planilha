"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Entrada = {
  data: string
  dinheiro: number
  cartaoDebito: number
  pix: number
  ifood: number
  cartaoCredito: number
  voucher: number
  maquinaDebito: number
  maquinaCredito: number
}

export default function TabelaFinanceira() {
  const [entradas, setEntradas] = useState<Entrada[]>([])

  useEffect(() => {
    const carregarEntradas = () => {
      const entradasArmazenadas = JSON.parse(localStorage.getItem("entradasFinanceiras") || "[]")
      setEntradas(entradasArmazenadas)
    }

    carregarEntradas()
    window.addEventListener("storage", carregarEntradas)

    return () => {
      window.removeEventListener("storage", carregarEntradas)
    }
  }, [])

  return (
    <Table>
      <TableCaption>Lista de entradas financeiras</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Dinheiro</TableHead>
          <TableHead>Cartão Débito</TableHead>
          <TableHead>PIX</TableHead>
          <TableHead>iFood</TableHead>
          <TableHead>Cartão Crédito</TableHead>
          <TableHead>Voucher</TableHead>
          <TableHead>Máquina Débito</TableHead>
          <TableHead>Máquina Crédito</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entradas.map((entrada, index) => (
          <TableRow key={index}>
            <TableCell>{entrada.data}</TableCell>
            <TableCell>{entrada.dinheiro.toFixed(2)}</TableCell>
            <TableCell>{entrada.cartaoDebito.toFixed(2)}</TableCell>
            <TableCell>{entrada.pix.toFixed(2)}</TableCell>
            <TableCell>{entrada.ifood.toFixed(2)}</TableCell>
            <TableCell>{entrada.cartaoCredito.toFixed(2)}</TableCell>
            <TableCell>{entrada.voucher.toFixed(2)}</TableCell>
            <TableCell>{entrada.maquinaDebito.toFixed(2)}</TableCell>
            <TableCell>{entrada.maquinaCredito.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

