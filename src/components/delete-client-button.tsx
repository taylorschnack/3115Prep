"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteClient } from "@/lib/actions/clients"

export function DeleteClientButton({ clientId }: { clientId: string }) {
  async function handleDelete() {
    if (confirm("Are you sure you want to delete this client? This will also delete all associated filings.")) {
      await deleteClient(clientId)
    }
  }

  return (
    <form action={handleDelete}>
      <Button variant="destructive" type="submit">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </form>
  )
}
