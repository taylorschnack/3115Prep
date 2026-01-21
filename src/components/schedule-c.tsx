"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateFilingScheduleC } from "@/lib/actions/filings"

interface ScheduleCData {
  assetDescription?: string
  dateAcquired?: string
  currentMethod?: string
  currentLife?: string
  currentConvention?: string
  proposedMethod?: string
  proposedLife?: string
  proposedConvention?: string
  section168Property?: string
  section197Intangible?: string
  bonusDepreciation?: string
  section179Election?: string
  adsRequired?: string
  changeReason?: string
  additionalInfo?: string
}

interface ScheduleCProps {
  filingId: string
  initialData: ScheduleCData | null
}

export function ScheduleC({ filingId, initialData }: ScheduleCProps) {
  const [saving, setSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSaving(true)
    await updateFilingScheduleC(filingId, formData)
    setSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule C - Changes in Depreciation or Amortization</CardTitle>
        <CardDescription>
          Complete this schedule if you are changing your method of depreciation or amortization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-medium mb-4">Asset Information</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assetDescription">Description of Property or Asset Class</Label>
                <Textarea
                  id="assetDescription"
                  name="assetDescription"
                  defaultValue={initialData?.assetDescription || ""}
                  placeholder="Describe the property or asset class affected by this change"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateAcquired">Date Acquired or Placed in Service</Label>
                <Input
                  id="dateAcquired"
                  name="dateAcquired"
                  type="date"
                  defaultValue={initialData?.dateAcquired || ""}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Current Method</h3>

              <div className="space-y-2">
                <Label htmlFor="currentMethod">Depreciation Method</Label>
                <Select name="currentMethod" defaultValue={initialData?.currentMethod || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macrs-gds">MACRS GDS</SelectItem>
                    <SelectItem value="macrs-ads">MACRS ADS</SelectItem>
                    <SelectItem value="sl">Straight-Line</SelectItem>
                    <SelectItem value="db-200">200% Declining Balance</SelectItem>
                    <SelectItem value="db-150">150% Declining Balance</SelectItem>
                    <SelectItem value="units">Units of Production</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentLife">Recovery Period (Years)</Label>
                <Input
                  id="currentLife"
                  name="currentLife"
                  defaultValue={initialData?.currentLife || ""}
                  placeholder="e.g., 5, 7, 15, 27.5, 39"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentConvention">Convention</Label>
                <Select name="currentConvention" defaultValue={initialData?.currentConvention || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select convention" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half-year">Half-Year</SelectItem>
                    <SelectItem value="mid-quarter">Mid-Quarter</SelectItem>
                    <SelectItem value="mid-month">Mid-Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Proposed Method</h3>

              <div className="space-y-2">
                <Label htmlFor="proposedMethod">Depreciation Method</Label>
                <Select name="proposedMethod" defaultValue={initialData?.proposedMethod || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macrs-gds">MACRS GDS</SelectItem>
                    <SelectItem value="macrs-ads">MACRS ADS</SelectItem>
                    <SelectItem value="sl">Straight-Line</SelectItem>
                    <SelectItem value="db-200">200% Declining Balance</SelectItem>
                    <SelectItem value="db-150">150% Declining Balance</SelectItem>
                    <SelectItem value="units">Units of Production</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposedLife">Recovery Period (Years)</Label>
                <Input
                  id="proposedLife"
                  name="proposedLife"
                  defaultValue={initialData?.proposedLife || ""}
                  placeholder="e.g., 5, 7, 15, 27.5, 39"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposedConvention">Convention</Label>
                <Select name="proposedConvention" defaultValue={initialData?.proposedConvention || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select convention" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half-year">Half-Year</SelectItem>
                    <SelectItem value="mid-quarter">Mid-Quarter</SelectItem>
                    <SelectItem value="mid-month">Mid-Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Additional Information</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Is this Section 168 property?</Label>
                <RadioGroup
                  name="section168Property"
                  defaultValue={initialData?.section168Property || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="s168-yes" />
                    <Label htmlFor="s168-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="s168-no" />
                    <Label htmlFor="s168-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Is this a Section 197 intangible?</Label>
                <RadioGroup
                  name="section197Intangible"
                  defaultValue={initialData?.section197Intangible || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="s197-yes" />
                    <Label htmlFor="s197-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="s197-no" />
                    <Label htmlFor="s197-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Does this change involve bonus depreciation?</Label>
                <RadioGroup
                  name="bonusDepreciation"
                  defaultValue={initialData?.bonusDepreciation || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="bonus-yes" />
                    <Label htmlFor="bonus-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="bonus-no" />
                    <Label htmlFor="bonus-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Was a Section 179 election made for this property?</Label>
                <RadioGroup
                  name="section179Election"
                  defaultValue={initialData?.section179Election || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="s179-yes" />
                    <Label htmlFor="s179-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="s179-no" />
                    <Label htmlFor="s179-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Is ADS required for this property?</Label>
                <RadioGroup
                  name="adsRequired"
                  defaultValue={initialData?.adsRequired || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="ads-yes" />
                    <Label htmlFor="ads-yes">Yes (listed property, tax-exempt use, etc.)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="ads-no" />
                    <Label htmlFor="ads-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elected" id="ads-elected" />
                    <Label htmlFor="ads-elected">No, but electing ADS</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="changeReason">Reason for Change</Label>
            <Textarea
              id="changeReason"
              name="changeReason"
              defaultValue={initialData?.changeReason || ""}
              placeholder="Explain why you are requesting this change in depreciation method"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              defaultValue={initialData?.additionalInfo || ""}
              placeholder="Provide any additional information relevant to the depreciation change..."
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Schedule C"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
