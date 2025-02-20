"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Defina a interface para os dados do formulário
interface FormData {
  nome: string
  number: string
  valor: string
  data: string
}

interface ManualEntryFormProps {
  onSubmit: (data: FormData) => void
}

const ManualEntryForm: React.FC<ManualEntryFormProps> = ({ onSubmit }) => {
  const [open, setOpen] = React.useState(false)

  // Inicialize o formulário com a interface FormData
  const form = useForm<FormData>({
    defaultValues: {
      nome: "",
      number: "",
      valor: "",
      data: "",
    },
  })

  // Função chamada ao enviar o formulário
  const handleSubmit = (data: FormData) => {
    onSubmit(data) // Passa os dados para a função onSubmit
    setOpen(false) // Fecha o modal
    form.reset() // Reseta o formulário
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Entrada Manual</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Cupom Manualmente</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Campo Nome */}
            <FormField
              control={form.control}
              name="nome"
              rules={{ required: "O nome é obrigatório" }} // Validação
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Nº/ Série */}
            <FormField
              control={form.control}
              name="number"
              rules={{ required: "O número/série é obrigatório" }} // Validação
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº/ Série</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o número/série" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Valor */}
            <FormField
              control={form.control}
              name="valor"
              rules={{ required: "O valor é obrigatório" }} // Validação
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o valor" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Data */}
            <FormField
              control={form.control}
              name="data"
              rules={{ required: "A data é obrigatória" }} // Validação
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botão de envio */}
            <Button type="submit">Adicionar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ManualEntryForm