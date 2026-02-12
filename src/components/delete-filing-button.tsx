"use client"

import { Trash2 } from "lucide-react"
import { deleteFiling } from "@/lib/actions/filings"

export function DeleteFilingButton({ filingId }: { filingId: string }) {
  async function handleDelete() {
    if (confirm("Are you sure you want to delete this filing? This action cannot be undone.")) {
      await deleteFiling(filingId)
    }
  }

  return (
    <button type="button" onClick={handleDelete} className="w-full text-destructive">
      Delete
    </button>
  )
}
