"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import AddEntryForm from "./AddEntryForm"

export default function AddEntryButton() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>Add Entry</Button>
      {isFormOpen && <AddEntryForm onClose={() => setIsFormOpen(false)} />}
    </>
  )
}

