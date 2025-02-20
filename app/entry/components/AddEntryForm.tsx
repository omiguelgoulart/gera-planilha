"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Entry = {
  date: string
  cash: number
  debitCard: number
  pix: number
  ifood: number
  creditCard: number
  voucher: number
  debitMachine: number
  creditMachine: number
}

type AddEntryFormProps = {
  onClose: () => void
}

export default function AddEntryForm({ onClose }: AddEntryFormProps) {
  const [entry, setEntry] = useState<Entry>({
    date: "",
    cash: 0,
    debitCard: 0,
    pix: 0,
    ifood: 0,
    creditCard: 0,
    voucher: 0,
    debitMachine: 0,
    creditMachine: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const entries = JSON.parse(localStorage.getItem("financialEntries") || "[]")
    entries.push(entry)
    localStorage.setItem("financialEntries", JSON.stringify(entries))
    onClose()
    window.dispatchEvent(new Event("storage"))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEntry((prev) => ({ ...prev, [name]: name === "date" ? value : Number.parseFloat(value) }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" name="date" value={entry.date} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="cash">Cash</Label>
            <Input type="number" id="cash" name="cash" value={entry.cash} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="debitCard">Debit Card</Label>
            <Input
              type="number"
              id="debitCard"
              name="debitCard"
              value={entry.debitCard}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="pix">PIX</Label>
            <Input type="number" id="pix" name="pix" value={entry.pix} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="ifood">iFood</Label>
            <Input type="number" id="ifood" name="ifood" value={entry.ifood} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="creditCard">Credit Card</Label>
            <Input
              type="number"
              id="creditCard"
              name="creditCard"
              value={entry.creditCard}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="voucher">Voucher</Label>
            <Input type="number" id="voucher" name="voucher" value={entry.voucher} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="debitMachine">Debit Machine</Label>
            <Input
              type="number"
              id="debitMachine"
              name="debitMachine"
              value={entry.debitMachine}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="creditMachine">Credit Machine</Label>
            <Input
              type="number"
              id="creditMachine"
              name="creditMachine"
              value={entry.creditMachine}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

