"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InputMoeda } from "./InputMoeda"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

type Entrada = {
  data: Date
  dinheiro: number
  cartaoDebito: number
  pix: number
  ifood: number
  cartaoCredito: number
  voucher: number
  maquinaDebito: number
  maquinaCredito: number
}

type FormularioAdicionarEntradaProps = {
  aoFechar: () => void
}

export default function FormularioAdicionarEntrada({ aoFechar }: FormularioAdicionarEntradaProps) {
  const [entrada, setEntrada] = useState<Entrada>({
    data: new Date(),
    dinheiro: 0,
    cartaoDebito: 0,
    pix: 0,
    ifood: 0,
    cartaoCredito: 0,
    voucher: 0,
    maquinaDebito: 0,
    maquinaCredito: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const entradas = JSON.parse(localStorage.getItem("entradasFinanceiras") || "[]")
    entradas.push({ ...entrada, data: entrada.data.toISOString() })
    localStorage.setItem("entradasFinanceiras", JSON.stringify(entradas))
    aoFechar()
    window.dispatchEvent(new Event("storage"))
  }

  const handleChange = (name: keyof Entrada) => (value: number) => {
    setEntrada((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={true} onOpenChange={aoFechar}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Entrada</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !entrada.data && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {entrada.data ? format(entrada.data, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={entrada.data}
                    onSelect={(date) => date && setEntrada((prev) => ({ ...prev, data: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dinheiro">Dinheiro</Label>
              <InputMoeda id="dinheiro" name="dinheiro" value={entrada.dinheiro} onChange={handleChange("dinheiro")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cartaoDebito">Cartão Débito</Label>
              <InputMoeda
                id="cartaoDebito"
                name="cartaoDebito"
                value={entrada.cartaoDebito}
                onChange={handleChange("cartaoDebito")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pix">PIX</Label>
              <InputMoeda id="pix" name="pix" value={entrada.pix} onChange={handleChange("pix")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifood">iFood</Label>
              <InputMoeda id="ifood" name="ifood" value={entrada.ifood} onChange={handleChange("ifood")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cartaoCredito">Cartão Crédito</Label>
              <InputMoeda
                id="cartaoCredito"
                name="cartaoCredito"
                value={entrada.cartaoCredito}
                onChange={handleChange("cartaoCredito")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voucher">Voucher</Label>
              <InputMoeda id="voucher" name="voucher" value={entrada.voucher} onChange={handleChange("voucher")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maquinaDebito">Máquina Débito</Label>
              <InputMoeda
                id="maquinaDebito"
                name="maquinaDebito"
                value={entrada.maquinaDebito}
                onChange={handleChange("maquinaDebito")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maquinaCredito">Máquina Crédito</Label>
              <InputMoeda
                id="maquinaCredito"
                name="maquinaCredito"
                value={entrada.maquinaCredito}
                onChange={handleChange("maquinaCredito")}
              />
            </div>
            <Button type="submit">Salvar</Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

