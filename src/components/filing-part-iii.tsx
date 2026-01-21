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
import { updateFilingPartIII } from "@/lib/actions/filings"
import { toast } from "sonner"

type PartIIIData = {
  // Line 1 - Has the applicant changed this method in any prior tax year?
  priorMethodChange?: string
  priorMethodChangeYear?: string
  priorMethodChangeDcn?: string

  // Line 2 - During the proposed year of change, has the taxpayer engaged in any transaction that would require adjustment?
  transactionAdjustment?: string
  transactionAdjustmentDetails?: string

  // Line 3 - Is the applicant a member of a consolidated group?
  consolidatedGroup?: string
  parentName?: string
  parentEin?: string

  // Line 4 - Does the applicant have any related corporations or partnerships?
  relatedEntities?: string
  relatedEntitiesDetails?: string

  // Line 5 - Will the proposed method of accounting be used for the applicant's books and records?
  booksAndRecords?: string
  booksAndRecordsExplanation?: string

  // Line 6 - Has the applicant, its predecessor, or a related party requested or made this method change within the past 5 years?
  priorRequest?: string
  priorRequestDetails?: string

  // Line 7 - Is the applicant under examination?
  underExamination?: string
  examiningOffice?: string

  // Line 8 - Does the applicant request a conference?
  conferenceRequest?: string

  // Additional information
  additionalInfo?: string
}

interface FilingPartIIIProps {
  filingId: string
  initialData: PartIIIData | null
}

export function FilingPartIII({ filingId, initialData }: FilingPartIIIProps) {
  const [saving, setSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSaving(true)
    const result = await updateFilingPartIII(filingId, formData)
    setSaving(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Part III saved successfully")
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Part III - Information About the Requested Change</CardTitle>
            <CardDescription>
              Additional information required for the accounting method change
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Line 1 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <span className="font-medium text-sm bg-muted px-2 py-1 rounded">1</span>
                <div className="flex-1 space-y-4">
                  <Label>
                    Has the applicant (or any present or former consolidated group in which the applicant
                    was a member during the applicable tax year(s)) previously changed this method of
                    accounting for the same item?
                  </Label>
                  <Select name="priorMethodChange" defaultValue={initialData?.priorMethodChange || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="priorMethodChangeYear">If yes, tax year of change</Label>
                      <Input
                        id="priorMethodChangeYear"
                        name="priorMethodChangeYear"
                        placeholder="YYYY"
                        defaultValue={initialData?.priorMethodChangeYear || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priorMethodChangeDcn">DCN used</Label>
                      <Input
                        id="priorMethodChangeDcn"
                        name="priorMethodChangeDcn"
                        placeholder="DCN number"
                        defaultValue={initialData?.priorMethodChangeDcn || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Line 2 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <span className="font-medium text-sm bg-muted px-2 py-1 rounded">2</span>
                <div className="flex-1 space-y-4">
                  <Label>
                    During the proposed year of change or any prior tax year, has the taxpayer engaged
                    in any transaction to which section 381(a) applies (relating to carryovers in certain
                    corporate acquisitions)?
                  </Label>
                  <Select name="transactionAdjustment" defaultValue={initialData?.transactionAdjustment || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label htmlFor="transactionAdjustmentDetails">If yes, provide details</Label>
                    <Textarea
                      id="transactionAdjustmentDetails"
                      name="transactionAdjustmentDetails"
                      rows={2}
                      placeholder="Describe the transaction..."
                      defaultValue={initialData?.transactionAdjustmentDetails || ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line 3 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <span className="font-medium text-sm bg-muted px-2 py-1 rounded">3</span>
                <div className="flex-1 space-y-4">
                  <Label>
                    Is the applicant a member of a consolidated group for the year of change?
                  </Label>
                  <Select name="consolidatedGroup" defaultValue={initialData?.consolidatedGroup || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">If yes, name of parent corporation</Label>
                      <Input
                        id="parentName"
                        name="parentName"
                        placeholder="Parent corporation name"
                        defaultValue={initialData?.parentName || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentEin">Parent EIN</Label>
                      <Input
                        id="parentEin"
                        name="parentEin"
                        placeholder="XX-XXXXXXX"
                        defaultValue={initialData?.parentEin || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Line 4 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <span className="font-medium text-sm bg-muted px-2 py-1 rounded">4</span>
                <div className="flex-1 space-y-4">
                  <Label>
                    Does the applicant have any related corporations or partnerships filing separate returns
                    that use the same method of accounting that the applicant is now requesting to change?
                  </Label>
                  <Select name="relatedEntities" defaultValue={initialData?.relatedEntities || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label htmlFor="relatedEntitiesDetails">If yes, list names and EINs</Label>
                    <Textarea
                      id="relatedEntitiesDetails"
                      name="relatedEntitiesDetails"
                      rows={2}
                      placeholder="Entity name, EIN..."
                      defaultValue={initialData?.relatedEntitiesDetails || ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line 5 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <span className="font-medium text-sm bg-muted px-2 py-1 rounded">5</span>
                <div className="flex-1 space-y-4">
                  <Label>
                    Will the proposed method of accounting be used for the applicant&apos;s books and records
                    and financial statements?
                  </Label>
                  <Select name="booksAndRecords" defaultValue={initialData?.booksAndRecords || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label htmlFor="booksAndRecordsExplanation">If no, explain</Label>
                    <Textarea
                      id="booksAndRecordsExplanation"
                      name="booksAndRecordsExplanation"
                      rows={2}
                      placeholder="Explanation..."
                      defaultValue={initialData?.booksAndRecordsExplanation || ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line 6 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <span className="font-medium text-sm bg-muted px-2 py-1 rounded">6</span>
                <div className="flex-1 space-y-4">
                  <Label>
                    Has the applicant, its predecessor, or a related party requested or made this
                    method change within the past 5 tax years?
                  </Label>
                  <Select name="priorRequest" defaultValue={initialData?.priorRequest || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label htmlFor="priorRequestDetails">If yes, provide details</Label>
                    <Textarea
                      id="priorRequestDetails"
                      name="priorRequestDetails"
                      rows={2}
                      placeholder="Year, DCN, outcome..."
                      defaultValue={initialData?.priorRequestDetails || ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line 7 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <span className="font-medium text-sm bg-muted px-2 py-1 rounded">7</span>
                <div className="flex-1 space-y-4">
                  <Label>
                    Is the applicant currently under examination by the IRS?
                  </Label>
                  <Select name="underExamination" defaultValue={initialData?.underExamination || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label htmlFor="examiningOffice">If yes, examining office and contact</Label>
                    <Input
                      id="examiningOffice"
                      name="examiningOffice"
                      placeholder="IRS office, agent name, phone..."
                      defaultValue={initialData?.examiningOffice || ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line 8 */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <span className="font-medium text-sm bg-muted px-2 py-1 rounded">8</span>
                <div className="flex-1 space-y-4">
                  <Label>
                    Does the applicant request a conference with the IRS National Office if the
                    application is being reviewed (non-automatic changes only)?
                  </Label>
                  <Select name="conferenceRequest" defaultValue={initialData?.conferenceRequest || ""}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="na">N/A (Automatic Change)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                placeholder="Any additional information or explanations..."
                defaultValue={initialData?.additionalInfo || ""}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Part III & Continue"}
          </Button>
        </div>
      </div>
    </form>
  )
}
