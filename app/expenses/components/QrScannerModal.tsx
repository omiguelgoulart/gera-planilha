"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import QrScanner from "./QrScanner"

interface QrScannerModalProps {
  onScanSuccess: (data: string) => void
}

const QrScannerModal: React.FC<QrScannerModalProps> = ({ onScanSuccess }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir Câmera</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Escanear QR Code</DialogTitle>
        </DialogHeader>
        <QrScanner
          onScanSuccess={(data) => {
            onScanSuccess(data)
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default QrScannerModal

