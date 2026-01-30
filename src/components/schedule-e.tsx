"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateFilingScheduleE } from "@/lib/actions/filings"
import { toast } from "sonner"
import { validateScheduleE, formDataToObject, type ValidationResult } from "@/lib/validation"
import { FieldError, ValidationSummary } from "@/components/ui/field-error"

interface ScheduleEData {
  traderStatus?: string
  electionType?: string
  securityTypes?: string
  currentMethod?: string
  proposedMethod?: string
  section475Election?: string
  electionYear?: string
  priorElection?: string
  businessDescription?: string
  tradingFrequency?: string
  averageHoldingPeriod?: string
  substantialActivity?: string
  separateAccounts?: string
  hedgingTransactions?: string
  additionalInfo?: string
}

interface ScheduleEProps {
  filingId: string
  initialData: ScheduleEData | null
}

export function ScheduleE({ filingId, initialData }: ScheduleEProps) {
  const [saving, setSaving] = useState(false)
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, errors: {}, warnings: {} })

  async function handleSubmit(formData: FormData) {
    const data = formDataToObject(formData)
    const validationResult = validateScheduleE(data)
    setValidation(validationResult)

    if (!validationResult.isValid) {
      toast.error("Please fix the validation errors before saving")
      return
    }

    setSaving(true)
    const result = await updateFilingScheduleE(filingId, formData)
    setSaving(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Schedule E saved successfully")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule E - Changes for Mark-to-Market Accounting</CardTitle>
        <CardDescription>
          Complete this schedule if you are making or revoking a Section 475 mark-to-market election for securities or commodities dealers/traders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <ValidationSummary errors={validation.errors} warnings={validation.warnings} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Taxpayer Status *</Label>
              <RadioGroup
                name="traderStatus"
                defaultValue={initialData?.traderStatus || ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dealer" id="status-dealer" />
                  <Label htmlFor="status-dealer">Dealer in Securities/Commodities</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trader" id="status-trader" />
                  <Label htmlFor="status-trader">Trader in Securities/Commodities</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="status-both" />
                  <Label htmlFor="status-both">Both Dealer and Trader</Label>
                </div>
              </RadioGroup>
              <FieldError error={validation.errors.traderStatus} />
            </div>

            <div className="space-y-2">
              <Label>Type of Election/Change</Label>
              <RadioGroup
                name="electionType"
                defaultValue={initialData?.electionType || ""}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="making" id="election-making" />
                  <Label htmlFor="election-making">Making Section 475 Election</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="revoking" id="election-revoking" />
                  <Label htmlFor="election-revoking">Revoking Section 475 Election</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="changing" id="election-changing" />
                  <Label htmlFor="election-changing">Changing MTM Method</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="securityTypes">Types of Securities/Commodities *</Label>
            <Select name="securityTypes" defaultValue={initialData?.securityTypes || ""}>
              <SelectTrigger className={validation.errors.securityTypes ? "border-destructive" : ""}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="securities">Securities Only</SelectItem>
                <SelectItem value="commodities">Commodities Only</SelectItem>
                <SelectItem value="both">Both Securities and Commodities</SelectItem>
              </SelectContent>
            </Select>
            <FieldError error={validation.errors.securityTypes} />
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-4">
            <div className="space-y-4">
              <h3 className="font-medium">Current Method</h3>

              <div className="space-y-2">
                <Label htmlFor="currentMethod">Accounting Method</Label>
                <Select name="currentMethod" defaultValue={initialData?.currentMethod || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realization">Realization Method</SelectItem>
                    <SelectItem value="mtm">Mark-to-Market (Section 475)</SelectItem>
                    <SelectItem value="lcm">Lower of Cost or Market</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Proposed Method</h3>

              <div className="space-y-2">
                <Label htmlFor="proposedMethod">Accounting Method</Label>
                <Select name="proposedMethod" defaultValue={initialData?.proposedMethod || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realization">Realization Method</SelectItem>
                    <SelectItem value="mtm">Mark-to-Market (Section 475)</SelectItem>
                    <SelectItem value="lcm">Lower of Cost or Market</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Section 475 Election Information</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Section 475(f) Election Status *</Label>
                <RadioGroup
                  name="section475Election"
                  defaultValue={initialData?.section475Election || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="securities" id="s475-securities" />
                    <Label htmlFor="s475-securities">Section 475(f)(1) - Securities</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="commodities" id="s475-commodities" />
                    <Label htmlFor="s475-commodities">Section 475(f)(2) - Commodities</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="s475-both" />
                    <Label htmlFor="s475-both">Both Sections 475(f)(1) and (f)(2)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="na" id="s475-na" />
                    <Label htmlFor="s475-na">Not Applicable (Dealer by statute)</Label>
                  </div>
                </RadioGroup>
                <FieldError error={validation.errors.section475Election} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="electionYear">Year Election Effective</Label>
                  <Input
                    id="electionYear"
                    name="electionYear"
                    type="number"
                    defaultValue={initialData?.electionYear || ""}
                    placeholder="e.g., 2024"
                    className={validation.errors.electionYear ? "border-destructive" : ""}
                  />
                  <FieldError error={validation.errors.electionYear} />
                </div>

                <div className="space-y-2">
                  <Label>Was a prior Section 475 election in effect?</Label>
                  <RadioGroup
                    name="priorElection"
                    defaultValue={initialData?.priorElection || ""}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="prior-yes" />
                      <Label htmlFor="prior-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="prior-no" />
                      <Label htmlFor="prior-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Trading Activity (for Trader Status)</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Description of Trading Business</Label>
                <Textarea
                  id="businessDescription"
                  name="businessDescription"
                  defaultValue={initialData?.businessDescription || ""}
                  placeholder="Describe the nature of the trading activity"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tradingFrequency">Trading Frequency</Label>
                  <Select name="tradingFrequency" defaultValue={initialData?.tradingFrequency || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Several times per week</SelectItem>
                      <SelectItem value="monthly">Several times per month</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="averageHoldingPeriod">Average Holding Period</Label>
                  <Select name="averageHoldingPeriod" defaultValue={initialData?.averageHoldingPeriod || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="intraday">Intraday</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="long-term">Long-term (over 1 year)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Does trading constitute substantial activity?</Label>
                <RadioGroup
                  name="substantialActivity"
                  defaultValue={initialData?.substantialActivity || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="substantial-yes" />
                    <Label htmlFor="substantial-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="substantial-no" />
                    <Label htmlFor="substantial-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Additional Requirements</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Are investment securities held in separate accounts?</Label>
                <RadioGroup
                  name="separateAccounts"
                  defaultValue={initialData?.separateAccounts || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="separate-yes" />
                    <Label htmlFor="separate-yes">Yes (properly identified before close of day acquired)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="separate-no" />
                    <Label htmlFor="separate-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="na" id="separate-na" />
                    <Label htmlFor="separate-na">Not Applicable</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Are there hedging transactions involved?</Label>
                <RadioGroup
                  name="hedgingTransactions"
                  defaultValue={initialData?.hedgingTransactions || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hedging-yes" />
                    <Label htmlFor="hedging-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hedging-no" />
                    <Label htmlFor="hedging-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              defaultValue={initialData?.additionalInfo || ""}
              placeholder="Provide any additional information relevant to the mark-to-market election or change..."
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Schedule E"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
