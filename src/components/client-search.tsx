"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ClientSearch() {
  return (
    <div className="mb-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or EIN..."
          className="pl-8"
        />
      </div>
    </div>
  )
}
