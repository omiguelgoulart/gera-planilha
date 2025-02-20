import { Suspense } from "react"
import TabelaFinanceira from "./components/TabelaFinanceira"
import BotaoAdicionarEntrada from "./components/BotaoAdicionarEntrada"
import BotaoBaixarCSV from "./components/BotaoBaixarCSV"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tabela de entradas</h1>
      <div className="flex justify-between mb-4">
        <BotaoAdicionarEntrada />
        <BotaoBaixarCSV />
      </div>
      <Suspense fallback={<div>Carregando...</div>}>
        <TabelaFinanceira />
      </Suspense>
    </main>
  )
}

