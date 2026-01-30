"use client"

import { useState } from "react"
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
import { updateFilingPartI } from "@/lib/actions/filings"
import { toast } from "sonner"
import { validatePartI, formDataToObject, type ValidationResult } from "@/lib/validation"
import { FieldError, ValidationSummary } from "@/components/ui/field-error"

type Client = {
  id: string
  name: string
  ein: string | null
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  contactName: string | null
  contactPhone: string | null
}

type PartIData = {
  filerName?: string
  filerEin?: string
  filerAddress?: string
  filerCity?: string
  filerState?: string
  filerZip?: string
  contactName?: string
  contactPhone?: string
  taxYearBegin?: string
  taxYearEnd?: string
  principalBusinessActivity?: string
  principalBusinessCode?: string
}

const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
]

interface FilingPartIProps {
  filingId: string
  client: Client
  initialData: PartIData | null
}

export function FilingPartI({ filingId, client, initialData }: FilingPartIProps) {
  const [saving, setSaving] = useState(false)
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, errors: {}, warnings: {} })

  async function handleSubmit(formData: FormData) {
    // Validate before submission
    const data = formDataToObject(formData)
    const validationResult = validatePartI(data)
    setValidation(validationResult)

    if (!validationResult.isValid) {
      toast.error("Please fix the validation errors before saving")
      return
    }

    setSaving(true)
    const result = await updateFilingPartI(filingId, formData)
    setSaving(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Part I saved successfully")
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Part I - Information Concerning the Applicant</CardTitle>
            <CardDescription>
              Identification and contact information for the taxpayer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ValidationSummary errors={validation.errors} warnings={validation.warnings} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="filerName">Name of filer (name of parent corporation if consolidated) *</Label>
                <Input
                  id="filerName"
                  name="filerName"
                  defaultValue={initialData?.filerName || client.name}
                  className={validation.errors.filerName ? "border-destructive" : ""}
                />
                <FieldError error={validation.errors.filerName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filerEin">Identification number (EIN or SSN) *</Label>
                <Input
                  id="filerEin"
                  name="filerEin"
                  placeholder="XX-XXXXXXX"
                  defaultValue={initialData?.filerEin || client.ein || ""}
                  className={validation.errors.filerEin ? "border-destructive" : ""}
                />
                <FieldError error={validation.errors.filerEin} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filerAddress">Number, street, and room or suite no. *</Label>
              <Input
                id="filerAddress"
                name="filerAddress"
                defaultValue={initialData?.filerAddress || client.address || ""}
                className={validation.errors.filerAddress ? "border-destructive" : ""}
              />
              <FieldError error={validation.errors.filerAddress} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="filerCity">City or town *</Label>
                <Input
                  id="filerCity"
                  name="filerCity"
                  defaultValue={initialData?.filerCity || client.city || ""}
                  className={validation.errors.filerCity ? "border-destructive" : ""}
                />
                <FieldError error={validation.errors.filerCity} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filerState">State *</Label>
                <Select name="filerState" defaultValue={initialData?.filerState || client.state || ""}>
                  <SelectTrigger className={validation.errors.filerState ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {usStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError error={validation.errors.filerState} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filerZip">ZIP code *</Label>
                <Input
                  id="filerZip"
                  name="filerZip"
                  defaultValue={initialData?.filerZip || client.zipCode || ""}
                  className={validation.errors.filerZip ? "border-destructive" : ""}
                />
                <FieldError error={validation.errors.filerZip} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactName">Name of contact person</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  defaultValue={initialData?.contactName || client.contactName || ""}
                  className={validation.errors.contactName ? "border-destructive" : ""}
                />
                <FieldError error={validation.errors.contactName} warning={validation.warnings.contactName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact person&apos;s telephone number</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  defaultValue={initialData?.contactPhone || client.contactPhone || ""}
                  className={validation.errors.contactPhone ? "border-destructive" : ""}
                />
                <FieldError error={validation.errors.contactPhone} warning={validation.warnings.contactPhone} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="taxYearBegin">Tax year of change begins (MM/DD/YYYY)</Label>
                <Input
                  id="taxYearBegin"
                  name="taxYearBegin"
                  placeholder="01/01/2025"
                  defaultValue={initialData?.taxYearBegin || ""}
                  className={validation.errors.taxYearBegin ? "border-destructive" : ""}
                />
                <FieldError error={validation.errors.taxYearBegin} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxYearEnd">Tax year of change ends (MM/DD/YYYY)</Label>
                <Input
                  id="taxYearEnd"
                  name="taxYearEnd"
                  placeholder="12/31/2025"
                  defaultValue={initialData?.taxYearEnd || ""}
                  className={validation.errors.taxYearEnd ? "border-destructive" : ""}
                />
                <FieldError error={validation.errors.taxYearEnd} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="principalBusinessActivity">Principal business activity</Label>
                <Input
                  id="principalBusinessActivity"
                  name="principalBusinessActivity"
                  placeholder="e.g., Manufacturing, Retail, Services"
                  defaultValue={initialData?.principalBusinessActivity || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="principalBusinessCode">Principal business activity code</Label>
                <Input
                  id="principalBusinessCode"
                  name="principalBusinessCode"
                  placeholder="e.g., 541200"
                  defaultValue={initialData?.principalBusinessCode || ""}
                />
                <FieldError warning={validation.warnings.principalBusinessCode} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Part I"}
          </Button>
        </div>
      </div>
    </form>
  )
}
