"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ManualEntryFormProps {
  onSubmit: (data: CupomData) => void
  initialData?: CupomData
  children?: React.ReactNode
}

export interface CupomData {
  id?: string
  nome: string
  number: string
  valor: string
  data: string
}

const ManualEntryForm: React.FC<ManualEntryFormProps> = ({ onSubmit, initialData, children }) => {
  const [open, setOpen] = React.useState(false)
  const form = useForm<CupomData>({
    defaultValues: initialData || {
      nome: "",
      number: "",
      valor: "",
      data: new Date().toISOString().split("T")[0],
    },
  })

  const handleSubmit = (data: CupomData) => {
    onSubmit(data)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">{initialData ? "Editar Entrada" : "Entrada Manual"}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Cupom" : "Adicionar Cupom Manualmente"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº/ Série</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data"
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
            <Button type="submit">{initialData ? "Atualizar" : "Adicionar"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ManualEntryForm

