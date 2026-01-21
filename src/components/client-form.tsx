"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { createClient, updateClient } from "@/lib/actions/clients"

type Client = {
  id: string
  name: string
  ein: string | null
  entityType: string | null
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  contactName: string | null
  contactPhone: string | null
  contactEmail: string | null
  taxYearEnd: string | null
}

const entityTypes = [
  { value: "c-corp", label: "C Corporation" },
  { value: "s-corp", label: "S Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "llc", label: "LLC" },
  { value: "sole-prop", label: "Sole Proprietorship" },
  { value: "nonprofit", label: "Tax-Exempt Organization" },
]

const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
]

interface ClientFormProps {
  client?: Client
}

export function ClientForm({ client }: ClientFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const isEditing = !!client

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const action = isEditing
      ? updateClient.bind(null, client.id)
      : createClient

    const result = await action(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="space-y-6">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Client name and entity details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Business or individual name"
                  defaultValue={client?.name || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ein">EIN</Label>
                <Input
                  id="ein"
                  name="ein"
                  placeholder="XX-XXXXXXX"
                  defaultValue={client?.ein || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entityType">Entity Type</Label>
                <Select name="entityType" defaultValue={client?.entityType || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {entityTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxYearEnd">Tax Year End</Label>
                <Input
                  id="taxYearEnd"
                  name="taxYearEnd"
                  placeholder="12/31"
                  defaultValue={client?.taxYearEnd || ""}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>
              Client mailing address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main Street"
                defaultValue={client?.address || ""}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  defaultValue={client?.city || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select name="state" defaultValue={client?.state || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {usStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="12345"
                  defaultValue={client?.zipCode || ""}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Primary contact for this client
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  placeholder="John Smith"
                  defaultValue={client?.contactName || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  defaultValue={client?.contactPhone || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder="contact@example.com"
                  defaultValue={client?.contactEmail || ""}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
              ? "Save Changes"
              : "Create Client"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}
