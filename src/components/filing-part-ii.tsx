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
import { updateFilingPartII } from "@/lib/actions/filings"
import { toast } from "sonner"

type PartIIData = {
  dcn?: string
  changeType?: string
  changeDescription?: string
  presentMethod?: string
  proposedMethod?: string
  yearOfChangeReason?: string
  irsConsentDate?: string
}

interface FilingPartIIProps {
  filingId: string
  initialData: PartIIData | null
}

export function FilingPartII({ filingId, initialData }: FilingPartIIProps) {
  const [saving, setSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSaving(true)
    const result = await updateFilingPartII(filingId, formData)
    setSaving(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Part II saved successfully")
    }
  }

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
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dcn">Designated Change Number (DCN)</Label>
                <Input
                  id="dcn"
                  name="dcn"
                  placeholder="e.g., 7"
                  defaultValue={initialData?.dcn || ""}
                />
                <p className="text-sm text-muted-foreground">
                  Enter the DCN from Rev. Proc. 2023-34 (or current guidance)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="changeType">Type of Change</Label>
                <Select name="changeType" defaultValue={initialData?.changeType || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select change type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic Change</SelectItem>
                    <SelectItem value="non_automatic">Non-Automatic Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="changeDescription">Description of the change in accounting method</Label>
              <Textarea
                id="changeDescription"
                name="changeDescription"
                rows={4}
                placeholder="Describe the accounting method change being requested..."
                defaultValue={initialData?.changeDescription || ""}
              />
              <p className="text-sm text-muted-foreground">
                Provide a complete description of the method of accounting the applicant is changing from and to
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="presentMethod">Present method of accounting</Label>
              <Textarea
                id="presentMethod"
                name="presentMethod"
                rows={3}
                placeholder="Describe the current/present accounting method..."
                defaultValue={initialData?.presentMethod || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposedMethod">Proposed method of accounting</Label>
              <Textarea
                id="proposedMethod"
                name="proposedMethod"
                rows={3}
                placeholder="Describe the proposed new accounting method..."
                defaultValue={initialData?.proposedMethod || ""}
              />
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

        <Card>
          <CardHeader>
            <CardTitle>Common DCN References</CardTitle>
            <CardDescription>
              Quick reference for frequently used Designated Change Numbers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">DCN 7</span>
                <span className="text-muted-foreground">Change to overall cash method</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">DCN 184</span>
                <span className="text-muted-foreground">Tangible property - materials and supplies</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">DCN 205</span>
                <span className="text-muted-foreground">Depreciation - late election</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">DCN 233</span>
                <span className="text-muted-foreground">Revenue recognition under ASC 606</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">DCN 236</span>
                <span className="text-muted-foreground">Research and experimental expenditures</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Part II"}
          </Button>
        </div>
      </div>
    </form>
  )
}
