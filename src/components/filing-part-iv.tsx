"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Badge } from "@/components/ui/badge"
import { updateFilingPartIV } from "@/lib/actions/filings"
import { toast } from "sonner"
import { Calculator, Info } from "lucide-react"
import { validatePartIV, formDataToObject, type ValidationResult } from "@/lib/validation"
import { FieldError, ValidationSummary } from "@/components/ui/field-error"

type PartIVData = {
  // Does this change require a 481(a) adjustment?
  requires481a?: string

  // Historical amounts (for calculation)
  presentMethodIncome?: number
  proposedMethodIncome?: number
  adjustmentAmount?: number
  adjustmentDirection?: string // "positive" or "negative"

  // Spread period
  spreadPeriod?: string // "1" or "4"
  yearOneAmount?: number
  yearTwoAmount?: number
  yearThreeAmount?: number
  yearFourAmount?: number

  // Explanation
  calculationMethod?: string
  supportingDocuments?: string

  // Net operating loss info
  hasNol?: string
  nolAmount?: number
  nolYears?: string
}

interface FilingPartIVProps {
  filingId: string
  initialData: PartIVData | null
  requires481a: boolean
  suggestedSpreadPeriod: number | null
}

export function FilingPartIV({
  filingId,
  initialData,
  requires481a,
  suggestedSpreadPeriod,
}: FilingPartIVProps) {
  const [saving, setSaving] = useState(false)
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, errors: {}, warnings: {} })
  const [presentMethodIncome, setPresentMethodIncome] = useState<number>(
    initialData?.presentMethodIncome || 0
  )
  const [proposedMethodIncome, setProposedMethodIncome] = useState<number>(
    initialData?.proposedMethodIncome || 0
  )
  const [spreadPeriod, setSpreadPeriod] = useState<string>(
    initialData?.spreadPeriod || (suggestedSpreadPeriod === 4 ? "4" : "1")
  )

  // Calculate adjustment
  const adjustmentAmount = proposedMethodIncome - presentMethodIncome
  const adjustmentDirection = adjustmentAmount >= 0 ? "positive" : "negative"
  const absAdjustment = Math.abs(adjustmentAmount)

  // Calculate spread amounts
  const spreadYears = parseInt(spreadPeriod) || 1
  const yearlyAmount = spreadYears > 1 ? absAdjustment / spreadYears : absAdjustment

  async function handleSubmit(formData: FormData) {
    // Add calculated values before validation
    formData.set("adjustmentAmount", adjustmentAmount.toString())
    formData.set("adjustmentDirection", adjustmentDirection)
    formData.set("presentMethodIncome", presentMethodIncome.toString())
    formData.set("proposedMethodIncome", proposedMethodIncome.toString())

    // Validate before submission
    const data = formDataToObject(formData)
    const validationResult = validatePartIV(data, requires481a)
    setValidation(validationResult)

    if (!validationResult.isValid) {
      toast.error("Please fix the validation errors before saving")
      return
    }

    setSaving(true)

    // Add spread amounts
    formData.set("yearOneAmount", (spreadYears === 1 ? absAdjustment : yearlyAmount).toString())
    if (spreadYears === 4) {
      formData.set("yearTwoAmount", yearlyAmount.toString())
      formData.set("yearThreeAmount", yearlyAmount.toString())
      formData.set("yearFourAmount", yearlyAmount.toString())
    }

    const result = await updateFilingPartIV(filingId, formData)
    setSaving(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Part IV saved successfully")
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <form action={handleSubmit}>
      <div className="space-y-6">
        {!requires481a && (
          <Card className="border-yellow-500/50 bg-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-600">
                <Info className="h-5 w-5" />
                <span>
                  Based on the selected DCN, a Section 481(a) adjustment may not be required.
                  Complete this section if an adjustment is applicable.
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Part IV - Section 481(a) Adjustment
            </CardTitle>
            <CardDescription>
              Calculate the cumulative adjustment required for the accounting method change
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ValidationSummary errors={validation.errors} warnings={validation.warnings} />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Does this change require a Section 481(a) adjustment?</Label>
                <Select name="requires481a" defaultValue={initialData?.requires481a || (requires481a ? "yes" : "")}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Section 481(a) Adjustment Calculator
              </h4>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="presentMethodIncome">
                    Cumulative income/deductions under PRESENT method {requires481a && "*"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                    <Input
                      id="presentMethodIncome"
                      name="presentMethodIncome"
                      type="number"
                      className={`pl-7 ${validation.errors.presentMethodIncome ? "border-destructive" : ""}`}
                      value={presentMethodIncome || ""}
                      onChange={(e) => setPresentMethodIncome(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <FieldError error={validation.errors.presentMethodIncome} />
                  <p className="text-xs text-muted-foreground">
                    Total amounts previously recognized under current method
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proposedMethodIncome">
                    Cumulative income/deductions under PROPOSED method {requires481a && "*"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                    <Input
                      id="proposedMethodIncome"
                      name="proposedMethodIncome"
                      type="number"
                      className={`pl-7 ${validation.errors.proposedMethodIncome ? "border-destructive" : ""}`}
                      value={proposedMethodIncome || ""}
                      onChange={(e) => setProposedMethodIncome(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <FieldError error={validation.errors.proposedMethodIncome} />
                  <p className="text-xs text-muted-foreground">
                    What would have been recognized under new method
                  </p>
                </div>
              </div>

              {(presentMethodIncome !== 0 || proposedMethodIncome !== 0) && (
                <div className="p-4 bg-background rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Section 481(a) Adjustment:</span>
                    <div className="text-right">
                      <span className={`text-2xl font-bold ${
                        adjustmentDirection === "positive" ? "text-green-600" : "text-red-600"
                      }`}>
                        {adjustmentDirection === "positive" ? "+" : "-"}
                        {formatCurrency(absAdjustment)}
                      </span>
                      <Badge variant="outline" className="ml-2">
                        {adjustmentDirection === "positive" ? "Increase to Income" : "Decrease to Income"}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>
                      {formatCurrency(proposedMethodIncome)} (proposed) - {formatCurrency(presentMethodIncome)} (present) = {" "}
                      {adjustmentDirection === "positive" ? "+" : "-"}{formatCurrency(absAdjustment)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Spread Period {requires481a && "*"}</Label>
                <Select
                  name="spreadPeriod"
                  value={spreadPeriod}
                  onValueChange={setSpreadPeriod}
                >
                  <SelectTrigger className={`w-[300px] ${validation.errors.spreadPeriod ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select spread period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year (entire adjustment in year of change)</SelectItem>
                    <SelectItem value="4">4 Years (spread evenly over 4 tax years)</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError error={validation.errors.spreadPeriod} warning={validation.warnings.spreadPeriod} />
                {suggestedSpreadPeriod && (
                  <p className="text-sm text-muted-foreground">
                    Suggested based on DCN: {suggestedSpreadPeriod === 4 ? "4-year spread" : "1-year adjustment"}
                  </p>
                )}
                <FieldError warning={validation.warnings.adjustmentAmount} />
              </div>

              {absAdjustment > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-3">Adjustment Schedule</h4>
                  <div className="grid gap-2">
                    <div className="flex justify-between py-2 border-b">
                      <span>Year 1 (Year of Change)</span>
                      <span className="font-medium">
                        {formatCurrency(spreadYears === 1 ? absAdjustment : yearlyAmount)}
                      </span>
                    </div>
                    {spreadYears === 4 && (
                      <>
                        <div className="flex justify-between py-2 border-b">
                          <span>Year 2</span>
                          <span className="font-medium">{formatCurrency(yearlyAmount)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Year 3</span>
                          <span className="font-medium">{formatCurrency(yearlyAmount)}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span>Year 4</span>
                          <span className="font-medium">{formatCurrency(yearlyAmount)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="calculationMethod">Explanation of calculation methodology</Label>
              <Textarea
                id="calculationMethod"
                name="calculationMethod"
                rows={3}
                placeholder="Describe how the adjustment was computed..."
                defaultValue={initialData?.calculationMethod || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportingDocuments">Supporting documentation</Label>
              <Textarea
                id="supportingDocuments"
                name="supportingDocuments"
                rows={2}
                placeholder="List supporting schedules or workpapers attached..."
                defaultValue={initialData?.supportingDocuments || ""}
              />
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Net Operating Loss Information</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Does the taxpayer have any NOL carryforwards or carrybacks affected by this change?</Label>
                  <Select name="hasNol" defaultValue={initialData?.hasNol || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nolAmount">NOL amount affected</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <Input
                        id="nolAmount"
                        name="nolAmount"
                        type="number"
                        className="pl-7"
                        defaultValue={initialData?.nolAmount || ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nolYears">Tax years of NOL</Label>
                    <Input
                      id="nolYears"
                      name="nolYears"
                      placeholder="e.g., 2021, 2022"
                      defaultValue={initialData?.nolYears || ""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Part IV"}
          </Button>
        </div>
      </div>
    </form>
  )
}
