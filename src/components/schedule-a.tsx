"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { updateFilingScheduleA } from "@/lib/actions/filings"
import { toast } from "sonner"
import { validateScheduleA, formDataToObject, type ValidationResult } from "@/lib/validation"
import { FieldError, ValidationSummary } from "@/components/ui/field-error"

interface ScheduleAData {
  currentOverallMethod?: string
  proposedOverallMethod?: string
  grossReceiptsTest?: string
  averageGrossReceipts?: string
  qualifiesAsSmallBusiness?: string
  inventoryMethod?: string
  hasInventory?: string
  section448Applies?: string
  section448Exception?: string
  additionalInfo?: string
}

interface ScheduleAProps {
  filingId: string
  initialData: ScheduleAData | null
}

export function ScheduleA({ filingId, initialData }: ScheduleAProps) {
  const [saving, setSaving] = useState(false)
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, errors: {}, warnings: {} })

  async function handleSubmit(formData: FormData) {
    const data = formDataToObject(formData)
    const validationResult = validateScheduleA(data)
    setValidation(validationResult)

    if (!validationResult.isValid) {
      toast.error("Please fix the validation errors before saving")
      return
    }

    setSaving(true)
    const result = await updateFilingScheduleA(filingId, formData)
    setSaving(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Schedule A saved successfully")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule A - Changes in Overall Method of Accounting</CardTitle>
        <CardDescription>
          Complete this schedule if you are changing your overall method of accounting (e.g., cash to accrual)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <ValidationSummary errors={validation.errors} warnings={validation.warnings} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentOverallMethod">Current Overall Method *</Label>
              <RadioGroup
                name="currentOverallMethod"
                defaultValue={initialData?.currentOverallMethod || ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="current-cash" />
                  <Label htmlFor="current-cash">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="accrual" id="current-accrual" />
                  <Label htmlFor="current-accrual">Accrual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="current-hybrid" />
                  <Label htmlFor="current-hybrid">Hybrid</Label>
                </div>
              </RadioGroup>
              <FieldError error={validation.errors.currentOverallMethod} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposedOverallMethod">Proposed Overall Method *</Label>
              <RadioGroup
                name="proposedOverallMethod"
                defaultValue={initialData?.proposedOverallMethod || ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="proposed-cash" />
                  <Label htmlFor="proposed-cash">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="accrual" id="proposed-accrual" />
                  <Label htmlFor="proposed-accrual">Accrual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="proposed-hybrid" />
                  <Label htmlFor="proposed-hybrid">Hybrid</Label>
                </div>
              </RadioGroup>
              <FieldError error={validation.errors.proposedOverallMethod} />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Gross Receipts Test (Section 448)</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Does the taxpayer meet the gross receipts test under Section 448(c)? *</Label>
                <RadioGroup
                  name="grossReceiptsTest"
                  defaultValue={initialData?.grossReceiptsTest || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="grt-yes" />
                    <Label htmlFor="grt-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="grt-no" />
                    <Label htmlFor="grt-no">No</Label>
                  </div>
                </RadioGroup>
                <FieldError error={validation.errors.grossReceiptsTest} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageGrossReceipts">
                  Average Annual Gross Receipts (3-year average)
                </Label>
                <Input
                  id="averageGrossReceipts"
                  name="averageGrossReceipts"
                  type="number"
                  placeholder="0.00"
                  defaultValue={initialData?.averageGrossReceipts || ""}
                  className={validation.warnings.averageGrossReceipts ? "border-amber-500" : ""}
                />
                <FieldError warning={validation.warnings.averageGrossReceipts} />
                <p className="text-xs text-muted-foreground">
                  For 2024, the threshold is $30 million
                </p>
              </div>

              <div className="space-y-2">
                <Label>Does the taxpayer qualify as a small business taxpayer?</Label>
                <RadioGroup
                  name="qualifiesAsSmallBusiness"
                  defaultValue={initialData?.qualifiesAsSmallBusiness || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="small-yes" />
                    <Label htmlFor="small-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="small-no" />
                    <Label htmlFor="small-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Inventory</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Does the taxpayer have inventory?</Label>
                <RadioGroup
                  name="hasInventory"
                  defaultValue={initialData?.hasInventory || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="inv-yes" />
                    <Label htmlFor="inv-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="inv-no" />
                    <Label htmlFor="inv-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inventoryMethod">If yes, describe the inventory method being used</Label>
                <Input
                  id="inventoryMethod"
                  name="inventoryMethod"
                  defaultValue={initialData?.inventoryMethod || ""}
                  placeholder="e.g., FIFO, LIFO, Average Cost"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Section 448 Limitations</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Is the taxpayer subject to Section 448 limitations?</Label>
                <RadioGroup
                  name="section448Applies"
                  defaultValue={initialData?.section448Applies || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="s448-yes" />
                    <Label htmlFor="s448-yes">Yes (C corporation, partnership with C corp partner, tax shelter)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="s448-no" />
                    <Label htmlFor="s448-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section448Exception">If yes, does an exception apply?</Label>
                <Input
                  id="section448Exception"
                  name="section448Exception"
                  defaultValue={initialData?.section448Exception || ""}
                  placeholder="Describe applicable exception"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              defaultValue={initialData?.additionalInfo || ""}
              placeholder="Provide any additional information relevant to the overall method change..."
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Schedule A"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
