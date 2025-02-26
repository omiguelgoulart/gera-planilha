import type React from "react"
import { exportToCSV } from "../utils/csvHelper"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import ManualEntryForm, { type CupomData } from "./ManualEntryForm"

interface CupomListProps {
  cupons: CupomData[]
  onClear: () => void
  onEdit: (id: string, data: CupomData) => void
  onDelete: (id: string) => void
}

const CupomList: React.FC<CupomListProps> = ({ cupons, onClear, onEdit, onDelete }) => {
  const handleExportAndClear = () => {
    exportToCSV(cupons)
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
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cupons.length > 0 ? (
            cupons.map((cupom) => (
              <TableRow key={cupom.id}>
                <TableCell>{cupom.nome}</TableCell>
                <TableCell>{cupom.number}</TableCell>
                <TableCell>{cupom.valor}</TableCell>
                <TableCell>{cupom.data}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <ManualEntryForm onSubmit={(data) => onEdit(cupom.id!, data)} initialData={cupom}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </ManualEntryForm>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(cupom.id!)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
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

