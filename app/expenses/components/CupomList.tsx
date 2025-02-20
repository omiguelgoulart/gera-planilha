import type React from "react"
import { exportToCSV } from "../utils/csvHelper"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CupomData {
  nome: string
  valor: string
  data: string
  number: string
}

interface CupomListProps {
  cupons: CupomData[]
  onClear: () => void
}

const CupomList: React.FC<CupomListProps> = ({ cupons, onClear }) => {
  const handleExportAndClear = () => {
    const dataRows = cupons.map(cupom => ({
      nome: cupom.nome,
      valor: cupom.valor,
      data: cupom.data,
      number: cupom.number
    }))
    exportToCSV(dataRows)
    onClear()
  }

  return (
    <div className="w-full max-w-4xl mt-8">
      <Table>
        <TableCaption>Histórico de Cupons Fiscais</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Nº/ Série</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cupons.length > 0 ? (
            cupons.map((cupom, index) => (
              <TableRow key={index}>
                <TableCell>{cupom.nome}</TableCell>
                <TableCell>{cupom.number}</TableCell>
                <TableCell>{cupom.valor}</TableCell>
                <TableCell>{cupom.data}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhum cupom registrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {cupons.length > 0 && (
        <Button className="mt-6" onClick={handleExportAndClear}>
          Exportar Tabela
        </Button>
      )}
    </div>
  )
}

export default CupomList

