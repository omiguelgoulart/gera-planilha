"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import FormularioAdicionarEntrada from "./FormularioAdicionarEntrada"

export default function BotaoAdicionarEntrada() {
  const [isFormularioAberto, setIsFormularioAberto] = useState(false)

  return (
    <>
      <Button onClick={() => setIsFormularioAberto(true)}>Adicionar Entrada</Button>
      {isFormularioAberto && <FormularioAdicionarEntrada aoFechar={() => setIsFormularioAberto(false)} />}
    </>
  )
}

