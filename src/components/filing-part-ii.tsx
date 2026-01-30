"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { updateFilingPartII } from "@/lib/actions/filings"
import { DcnLookup } from "@/components/dcn-lookup"
import { type DcnReference } from "@/lib/actions/dcn"
import { toast } from "sonner"
import { Info, AlertCircle } from "lucide-react"
import { validatePartII, formDataToObject, type ValidationResult } from "@/lib/validation"
import { FieldError, ValidationSummary } from "@/components/ui/field-error"

type PartIIData = {
  dcn?: string
  changeType?: string
  changeDescription?: string
  presentMethod?: string
  proposedMethod?: string
  yearOfChangeReason?: string
  irsConsentDate?: string
  dcnDetails?: {
    isAutomatic: boolean
    requires481a: boolean
    spreadPeriod: number | null
    requiresScheduleA: boolean
    requiresScheduleB: boolean
    requiresScheduleC: boolean
    requiresScheduleD: boolean
    requiresScheduleE: boolean
  }
}

interface FilingPartIIProps {
  filingId: string
  initialData: PartIIData | null
}

export function FilingPartII({ filingId, initialData }: FilingPartIIProps) {
  const [saving, setSaving] = useState(false)
  const [selectedDcn, setSelectedDcn] = useState<DcnReference | null>(null)
  const [dcnNumber, setDcnNumber] = useState(initialData?.dcn || "")
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, errors: {}, warnings: {} })

  function handleDcnSelect(dcn: DcnReference) {
    setSelectedDcn(dcn)
    setDcnNumber(dcn.dcnNumber)
    // Clear DCN error when a DCN is selected
    if (validation.errors.dcn) {
      const { dcn: _, ...remainingErrors } = validation.errors
      setValidation(prev => ({
        ...prev,
        errors: remainingErrors
      }))
    }
  }

  async function handleSubmit(formData: FormData) {
    // Validate before submission
    const data = formDataToObject(formData)
    const validationResult = validatePartII(data)
    setValidation(validationResult)

    if (!validationResult.isValid) {
      toast.error("Please fix the validation errors before saving")
      return
    }

    setSaving(true)

    // Add DCN details if selected
    if (selectedDcn) {
      formData.set("dcnDetails", JSON.stringify({
        isAutomatic: selectedDcn.isAutomatic,
        requires481a: selectedDcn.requires481a,
        spreadPeriod: selectedDcn.spreadPeriod,
        requiresScheduleA: selectedDcn.requiresScheduleA,
        requiresScheduleB: selectedDcn.requiresScheduleB,
        requiresScheduleC: selectedDcn.requiresScheduleC,
        requiresScheduleD: selectedDcn.requiresScheduleD,
        requiresScheduleE: selectedDcn.requiresScheduleE,
      }))
      formData.set("changeType", selectedDcn.isAutomatic ? "automatic" : "non_automatic")
    }

    const result = await updateFilingPartII(filingId, formData)
    setSaving(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Part II saved successfully")
    }
  }

  const dcnDetails = selectedDcn || initialData?.dcnDetails

  return (
    <form action={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Part II - Information About the Change</CardTitle>
            <CardDescription>
              Details about the accounting method change being requested
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ValidationSummary errors={validation.errors} warnings={validation.warnings} />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Designated Change Number (DCN) *</Label>
                <div className="flex gap-2">
                  <Input
                    name="dcn"
                    placeholder="e.g., 7"
                    value={dcnNumber}
                    onChange={(e) => setDcnNumber(e.target.value)}
                    className={`flex-1 ${validation.errors.dcn ? "border-destructive" : ""}`}
                  />
                  <DcnLookup onSelect={handleDcnSelect} selectedDcn={dcnNumber} />
                </div>
                <FieldError error={validation.errors.dcn} warning={validation.warnings.dcn} />
                <p className="text-sm text-muted-foreground">
                  Use the lookup to find the correct DCN from Rev. Proc. 2025-23
                </p>
              </div>

              {dcnDetails && (
                <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <span className="font-medium">DCN {dcnNumber} Requirements</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={dcnDetails.isAutomatic ? "default" : "secondary"}>
                      {dcnDetails.isAutomatic ? "Automatic Change" : "Non-Automatic Change"}
                    </Badge>
                    {dcnDetails.requires481a && (
                      <Badge variant="outline">Section 481(a) Adjustment Required</Badge>
                    )}
                    {dcnDetails.spreadPeriod && (
                      <Badge variant="outline">{dcnDetails.spreadPeriod}-Year Spread Period</Badge>
                    )}
                  </div>
                  {(dcnDetails.requiresScheduleA || dcnDetails.requiresScheduleB ||
                    dcnDetails.requiresScheduleC || dcnDetails.requiresScheduleD ||
                    dcnDetails.requiresScheduleE) && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          Required schedules:{" "}
                          {[
                            dcnDetails.requiresScheduleA && "A",
                            dcnDetails.requiresScheduleB && "B",
                            dcnDetails.requiresScheduleC && "C",
                            dcnDetails.requiresScheduleD && "D",
                            dcnDetails.requiresScheduleE && "E",
                          ].filter(Boolean).join(", ")}
                        </span>
                      </div>
                    )}
                </div>
              )}
            </div>

            <input
              type="hidden"
              name="changeType"
              value={dcnDetails?.isAutomatic ? "automatic" : initialData?.changeType || ""}
            />

            <div className="space-y-2">
              <Label htmlFor="changeDescription">Description of the change in accounting method *</Label>
              <Textarea
                id="changeDescription"
                name="changeDescription"
                rows={4}
                placeholder="Describe the accounting method change being requested..."
                defaultValue={initialData?.changeDescription || ""}
                className={validation.errors.changeDescription ? "border-destructive" : ""}
              />
              <FieldError error={validation.errors.changeDescription} warning={validation.warnings.changeDescription} />
              <p className="text-sm text-muted-foreground">
                Provide a complete description of the method of accounting the applicant is changing from and to
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="presentMethod">Present method of accounting *</Label>
              <Textarea
                id="presentMethod"
                name="presentMethod"
                rows={3}
                placeholder="Describe the current/present accounting method..."
                defaultValue={initialData?.presentMethod || ""}
                className={validation.errors.presentMethod ? "border-destructive" : ""}
              />
              <FieldError error={validation.errors.presentMethod} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposedMethod">Proposed method of accounting *</Label>
              <Textarea
                id="proposedMethod"
                name="proposedMethod"
                rows={3}
                placeholder="Describe the proposed new accounting method..."
                defaultValue={initialData?.proposedMethod || ""}
                className={validation.errors.proposedMethod ? "border-destructive" : ""}
              />
              <FieldError error={validation.errors.proposedMethod} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearOfChangeReason">
                Why is the applicant requesting this change for this particular year?
              </Label>
              <Textarea
                id="yearOfChangeReason"
                name="yearOfChangeReason"
                rows={2}
                placeholder="Explain why this year was selected for the change..."
                defaultValue={initialData?.yearOfChangeReason || ""}
              />
              <FieldError warning={validation.warnings.yearOfChangeReason} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="irsConsentDate">
                If the applicant has previously received IRS consent to change this method, enter the date
              </Label>
              <Input
                id="irsConsentDate"
                name="irsConsentDate"
                placeholder="MM/DD/YYYY or N/A"
                defaultValue={initialData?.irsConsentDate || ""}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Part II & Continue"}
          </Button>
        </div>
      </div>
    </form>
  )
}
