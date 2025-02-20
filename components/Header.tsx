"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-4 py-4">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/entry"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/entradas" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Entradas
          </Link>
          <Link
            href="/expenses"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/saidas" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Saídas
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

