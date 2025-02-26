import FileSaver from "file-saver"
import type { CupomData } from "../components/ManualEntryForm"

export const exportToCSV = (data: CupomData[]) => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Nome,Nº/ Série,Valor,Data\n" + // CSV header
    data.map((row) => `${row.nome},${row.number},${row.valor},${row.data}`).join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  FileSaver.saveAs(blob, "cupons.csv")

  // Clear localStorage after exporting
  localStorage.removeItem("cupons")
}

