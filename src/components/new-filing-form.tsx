"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createFiling, getClientsForSelect } from "@/lib/actions/filings"

type Client = {
  id: string
  name: string
  ein: string | null
}

export function NewFilingForm() {
  const [clients, setClients] = useState<Client[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedClientId = searchParams.get("clientId")

  useEffect(() => {
    async function loadClients() {
      const data = await getClientsForSelect()
      setClients(data)
    }
    loadClients()
  }, [])

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const result = await createFiling(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <form action={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Filing Details</CardTitle>
          <CardDescription>
            Select the client and tax year for this Form 3115
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="clientId">Client *</Label>
            {clients.length === 0 ? (
              <div className="text-sm text-muted-foreground p-4 border rounded-md">
                No clients found.{" "}
                <Link href="/clients/new" className="text-primary hover:underline">
                  Add a client first
                </Link>
              </div>
            ) : (
              <Select name="clientId" defaultValue={preselectedClientId || ""} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                      {client.ein && ` (${client.ein})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxYearOfChange">Tax Year of Change *</Label>
            <Input
              id="taxYearOfChange"
              name="taxYearOfChange"
              type="number"
              min="1990"
              max={currentYear + 1}
              defaultValue={currentYear}
              required
            />
            <p className="text-sm text-muted-foreground">
              The tax year for which the accounting method change will take effect
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading || clients.length === 0}>
              {loading ? "Creating..." : "Create Filing"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
