"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateFilingScheduleD } from "@/lib/actions/filings"

interface ScheduleDData {
  contractType?: string
  currentMethod?: string
  proposedMethod?: string
  contractDescription?: string
  estimatedDuration?: string
  totalContractPrice?: string
  completionPercentage?: string
  section460Applies?: string
  homeConstructionContract?: string
  exemptSmallConstruction?: string
  lookBackMethod?: string
  simplifiedMethod?: string
  additionalInfo?: string
}

interface ScheduleDProps {
  filingId: string
  initialData: ScheduleDData | null
}

export function ScheduleD({ filingId, initialData }: ScheduleDProps) {
  const [saving, setSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSaving(true)
    await updateFilingScheduleD(filingId, formData)
    setSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule D - Changes for Long-Term Contracts</CardTitle>
        <CardDescription>
          Complete this schedule if you are changing your method of accounting for long-term contracts under Section 460
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contractType">Type of Long-Term Contract</Label>
              <Select name="contractType" defaultValue={initialData?.contractType || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="construction">Construction Contract</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing Contract</SelectItem>
                  <SelectItem value="engineering">Engineering Contract</SelectItem>
                  <SelectItem value="architecture">Architectural Contract</SelectItem>
                  <SelectItem value="other">Other Long-Term Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractDescription">Contract Description</Label>
              <Textarea
                id="contractDescription"
                name="contractDescription"
                defaultValue={initialData?.contractDescription || ""}
                placeholder="Describe the nature of the contract(s) affected by this change"
                rows={2}
              />
            </div>
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
                    <SelectItem value="pcm">Percentage of Completion (PCM)</SelectItem>
                    <SelectItem value="ccm">Completed Contract (CCM)</SelectItem>
                    <SelectItem value="pcm-ccm">PCM/CCM (70/30)</SelectItem>
                    <SelectItem value="exempt-ccm">Exempt CCM (Small Contractor)</SelectItem>
                    <SelectItem value="other">Other Method</SelectItem>
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
                    <SelectItem value="pcm">Percentage of Completion (PCM)</SelectItem>
                    <SelectItem value="ccm">Completed Contract (CCM)</SelectItem>
                    <SelectItem value="pcm-ccm">PCM/CCM (70/30)</SelectItem>
                    <SelectItem value="exempt-ccm">Exempt CCM (Small Contractor)</SelectItem>
                    <SelectItem value="other">Other Method</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Contract Details</h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Estimated Duration (months)</Label>
                <Input
                  id="estimatedDuration"
                  name="estimatedDuration"
                  type="number"
                  defaultValue={initialData?.estimatedDuration || ""}
                  placeholder="e.g., 24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalContractPrice">Total Contract Price</Label>
                <Input
                  id="totalContractPrice"
                  name="totalContractPrice"
                  type="number"
                  defaultValue={initialData?.totalContractPrice || ""}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="completionPercentage">Current Completion %</Label>
                <Input
                  id="completionPercentage"
                  name="completionPercentage"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={initialData?.completionPercentage || ""}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Section 460 Information</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Does Section 460 apply to these contracts?</Label>
                <RadioGroup
                  name="section460Applies"
                  defaultValue={initialData?.section460Applies || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="s460-yes" />
                    <Label htmlFor="s460-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="s460-no" />
                    <Label htmlFor="s460-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Is this a home construction contract?</Label>
                <RadioGroup
                  name="homeConstructionContract"
                  defaultValue={initialData?.homeConstructionContract || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="home-yes" />
                    <Label htmlFor="home-yes">Yes (4 or fewer dwelling units)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="home-no" />
                    <Label htmlFor="home-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Does the small construction contract exception apply?</Label>
                <RadioGroup
                  name="exemptSmallConstruction"
                  defaultValue={initialData?.exemptSmallConstruction || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="small-yes" />
                    <Label htmlFor="small-yes">Yes (average receipts ≤ $30M and contract completed within 2 years)</Label>
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
            <h3 className="font-medium mb-4">Look-Back and Simplified Methods</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Is the look-back method required?</Label>
                <RadioGroup
                  name="lookBackMethod"
                  defaultValue={initialData?.lookBackMethod || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="lookback-yes" />
                    <Label htmlFor="lookback-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="lookback-no" />
                    <Label htmlFor="lookback-no">No (de minimis exception or exempt contract)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Are you using the simplified cost-to-cost method?</Label>
                <RadioGroup
                  name="simplifiedMethod"
                  defaultValue={initialData?.simplifiedMethod || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="simplified-yes" />
                    <Label htmlFor="simplified-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="simplified-no" />
                    <Label htmlFor="simplified-no">No</Label>
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
              placeholder="Provide any additional information relevant to the long-term contract method change..."
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Schedule D"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
