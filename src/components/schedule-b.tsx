"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateFilingScheduleB } from "@/lib/actions/filings"
import { toast } from "sonner"
import { validateScheduleB, formDataToObject, type ValidationResult } from "@/lib/validation"
import { FieldError, ValidationSummary } from "@/components/ui/field-error"

interface ScheduleBData {
  currentInventoryMethod?: string
  proposedInventoryMethod?: string
  currentValuationMethod?: string
  proposedValuationMethod?: string
  inventoryTypes?: string
  lifoElection?: string
  lifoMethod?: string
  lifoPoolingMethod?: string
  section263A?: string
  section263AMethod?: string
  unicapMethod?: string
  simplifiedMethod?: string
  additionalInfo?: string
}

interface ScheduleBProps {
  filingId: string
  initialData: ScheduleBData | null
}

export function ScheduleB({ filingId, initialData }: ScheduleBProps) {
  const [saving, setSaving] = useState(false)
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, errors: {}, warnings: {} })

  async function handleSubmit(formData: FormData) {
    const data = formDataToObject(formData)
    const validationResult = validateScheduleB(data)
    setValidation(validationResult)

    if (!validationResult.isValid) {
      toast.error("Please fix the validation errors before saving")
      return
    }

    setSaving(true)
    const result = await updateFilingScheduleB(filingId, formData)
    setSaving(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Schedule B saved successfully")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule B - Changes in Inventory Methods</CardTitle>
        <CardDescription>
          Complete this schedule if you are changing your method of accounting for inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <ValidationSummary errors={validation.errors} warnings={validation.warnings} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentInventoryMethod">Current Inventory Cost Flow Method *</Label>
              <Select name="currentInventoryMethod" defaultValue={initialData?.currentInventoryMethod || ""}>
                <SelectTrigger className={validation.errors.currentInventoryMethod ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fifo">FIFO (First-In, First-Out)</SelectItem>
                  <SelectItem value="lifo">LIFO (Last-In, First-Out)</SelectItem>
                  <SelectItem value="average">Average Cost</SelectItem>
                  <SelectItem value="specific">Specific Identification</SelectItem>
                  <SelectItem value="retail">Retail Method</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FieldError error={validation.errors.currentInventoryMethod} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposedInventoryMethod">Proposed Inventory Cost Flow Method *</Label>
              <Select name="proposedInventoryMethod" defaultValue={initialData?.proposedInventoryMethod || ""}>
                <SelectTrigger className={validation.errors.proposedInventoryMethod ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fifo">FIFO (First-In, First-Out)</SelectItem>
                  <SelectItem value="lifo">LIFO (Last-In, First-Out)</SelectItem>
                  <SelectItem value="average">Average Cost</SelectItem>
                  <SelectItem value="specific">Specific Identification</SelectItem>
                  <SelectItem value="retail">Retail Method</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FieldError error={validation.errors.proposedInventoryMethod} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentValuationMethod">Current Inventory Valuation Method</Label>
              <Select name="currentValuationMethod" defaultValue={initialData?.currentValuationMethod || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cost">Cost</SelectItem>
                  <SelectItem value="lcm">Lower of Cost or Market</SelectItem>
                  <SelectItem value="lcnrv">Lower of Cost or Net Realizable Value</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposedValuationMethod">Proposed Inventory Valuation Method</Label>
              <Select name="proposedValuationMethod" defaultValue={initialData?.proposedValuationMethod || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cost">Cost</SelectItem>
                  <SelectItem value="lcm">Lower of Cost or Market</SelectItem>
                  <SelectItem value="lcnrv">Lower of Cost or Net Realizable Value</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inventoryTypes">Describe the types of inventory</Label>
            <Textarea
              id="inventoryTypes"
              name="inventoryTypes"
              defaultValue={initialData?.inventoryTypes || ""}
              placeholder="e.g., Raw materials, Work-in-process, Finished goods, Merchandise"
              rows={2}
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">LIFO Information (if applicable)</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Is LIFO involved in this change?</Label>
                <RadioGroup
                  name="lifoElection"
                  defaultValue={initialData?.lifoElection || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adopting" id="lifo-adopting" />
                    <Label htmlFor="lifo-adopting">Adopting LIFO</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="terminating" id="lifo-terminating" />
                    <Label htmlFor="lifo-terminating">Terminating LIFO</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="changing" id="lifo-changing" />
                    <Label htmlFor="lifo-changing">Changing LIFO method</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="na" id="lifo-na" />
                    <Label htmlFor="lifo-na">Not applicable</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lifoMethod">LIFO Method</Label>
                  <Select name="lifoMethod" defaultValue={initialData?.lifoMethod || ""}>
                    <SelectTrigger className={validation.errors.lifoMethod ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select LIFO method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dollar-value">Dollar-Value LIFO</SelectItem>
                      <SelectItem value="specific-goods">Specific Goods LIFO</SelectItem>
                      <SelectItem value="simplified-dv">Simplified Dollar-Value</SelectItem>
                      <SelectItem value="ipic">IPIC Method</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError error={validation.errors.lifoMethod} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifoPoolingMethod">LIFO Pooling Method</Label>
                  <Select name="lifoPoolingMethod" defaultValue={initialData?.lifoPoolingMethod || ""}>
                    <SelectTrigger className={validation.warnings.lifoPoolingMethod ? "border-amber-500" : ""}>
                      <SelectValue placeholder="Select pooling method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural-business-unit">Natural Business Unit</SelectItem>
                      <SelectItem value="multiple-pools">Multiple Pools</SelectItem>
                      <SelectItem value="single-pool">Single Pool</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError warning={validation.warnings.lifoPoolingMethod} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Section 263A - Uniform Capitalization (UNICAP)</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Is Section 263A applicable to the taxpayer?</Label>
                <RadioGroup
                  name="section263A"
                  defaultValue={initialData?.section263A || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="263a-yes" />
                    <Label htmlFor="263a-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="263a-no" />
                    <Label htmlFor="263a-no">No (meets small business exception)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exempt" id="263a-exempt" />
                    <Label htmlFor="263a-exempt">No (other exemption applies)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section263AMethod">Section 263A Method (if applicable)</Label>
                <Select name="section263AMethod" defaultValue={initialData?.section263AMethod || ""}>
                  <SelectTrigger className={validation.errors.section263AMethod ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select 263A method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simplified-production">Simplified Production Method</SelectItem>
                    <SelectItem value="simplified-resale">Simplified Resale Method</SelectItem>
                    <SelectItem value="facts-circumstances">Facts and Circumstances</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError error={validation.errors.section263AMethod} />
              </div>

              <div className="space-y-2">
                <Label>Is this change related to UNICAP methods?</Label>
                <RadioGroup
                  name="unicapMethod"
                  defaultValue={initialData?.unicapMethod || ""}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adopting" id="unicap-adopting" />
                    <Label htmlFor="unicap-adopting">Adopting Section 263A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="discontinuing" id="unicap-discontinuing" />
                    <Label htmlFor="unicap-discontinuing">Discontinuing Section 263A (now exempt)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="changing" id="unicap-changing" />
                    <Label htmlFor="unicap-changing">Changing 263A computation method</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="na" id="unicap-na" />
                    <Label htmlFor="unicap-na">Not applicable to this change</Label>
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
              placeholder="Provide any additional information relevant to the inventory method change..."
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Schedule B"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
