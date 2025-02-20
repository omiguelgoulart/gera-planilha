"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"

interface InputMoedaProps {
  value: number
  onChange: (value: number) => void
  name: string
  id: string
}

export function InputMoeda({ value, onChange, name, id }: InputMoedaProps) {
  const [displayValue, setDisplayValue] = useState(value.toFixed(2).replace(".", ","))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d,]/g, "")
    setDisplayValue(rawValue)

    const numericValue = Number.parseFloat(rawValue.replace(",", "."))
    if (!isNaN(numericValue)) {
      onChange(numericValue)
    }
  }

  const handleBlur = () => {
    const numericValue = Number.parseFloat(displayValue.replace(",", "."))
    if (!isNaN(numericValue)) {
      setDisplayValue(numericValue.toFixed(2).replace(".", ","))
    } else {
      setDisplayValue("0,00")
      onChange(0)
    }
  }

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      name={name}
      id={id}
      placeholder="0,00"
    />
  )
}

