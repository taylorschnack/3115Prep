import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getFiling } from "@/lib/actions/filings"
import { FilingPartI } from "@/components/filing-part-i"
import { FilingPartII } from "@/components/filing-part-ii"
import { FilingPartIII } from "@/components/filing-part-iii"
import { FilingPartIV } from "@/components/filing-part-iv"
import { ScheduleA } from "@/components/schedule-a"
import { ScheduleB } from "@/components/schedule-b"
import { ScheduleC } from "@/components/schedule-c"
import { ScheduleD } from "@/components/schedule-d"
import { ScheduleE } from "@/components/schedule-e"

const statusLabels: Record<string, string> = {
  draft: "Draft",
  in_progress: "In Progress",
  ready: "Ready for Review",
  completed: "Completed",
}

export default async function FilingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const filing = await getFiling(id)

  if (!filing) {
    notFound()
  }

  const partIData = filing.partI ? JSON.parse(filing.partI) : null
  const partIIData = filing.partII ? JSON.parse(filing.partII) : null
  const partIIIData = filing.partIII ? JSON.parse(filing.partIII) : null
  const partIVData = filing.partIV ? JSON.parse(filing.partIV) : null
  const scheduleAData = filing.scheduleA ? JSON.parse(filing.scheduleA) : null
  const scheduleBData = filing.scheduleB ? JSON.parse(filing.scheduleB) : null
  const scheduleCData = filing.scheduleC ? JSON.parse(filing.scheduleC) : null
  const scheduleDData = filing.scheduleD ? JSON.parse(filing.scheduleD) : null
  const scheduleEData = filing.scheduleE ? JSON.parse(filing.scheduleE) : null

  // Extract DCN details from partII for Part IV requirements
  const dcnDetails = partIIData?.dcnDetails || null
  const requires481a = dcnDetails?.requires481a ?? true
  const suggestedSpreadPeriod = dcnDetails?.spreadPeriod ?? null

  // Extract required schedules from DCN details
  const requiresScheduleA = dcnDetails?.requiresScheduleA ?? false
  const requiresScheduleB = dcnDetails?.requiresScheduleB ?? false
  const requiresScheduleC = dcnDetails?.requiresScheduleC ?? false
  const requiresScheduleD = dcnDetails?.requiresScheduleD ?? false
  const requiresScheduleE = dcnDetails?.requiresScheduleE ?? false
  const hasRequiredSchedules = requiresScheduleA || requiresScheduleB || requiresScheduleC || requiresScheduleD || requiresScheduleE

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/filings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Form 3115 - {filing.client.name}
            </h1>
            <Badge variant="secondary">
              {statusLabels[filing.status] || filing.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Tax Year of Change: {filing.taxYearOfChange}
            {filing.dcn && ` • DCN: ${filing.dcn}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/clients/${filing.client.id}`}>
              View Client
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">Completion</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: `${filing.completionPercentage}%` }}
              />
            </div>
            <span className="text-sm font-medium">{filing.completionPercentage}%</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue={filing.lastSavedStep || "part-i"} className="space-y-4">
        <TabsList className={`grid w-full ${hasRequiredSchedules ? "grid-cols-5" : "grid-cols-4"}`}>
          <TabsTrigger value="part-i">Part I</TabsTrigger>
          <TabsTrigger value="part-ii">Part II</TabsTrigger>
          <TabsTrigger value="part-iii">Part III</TabsTrigger>
          <TabsTrigger value="part-iv">Part IV</TabsTrigger>
          {hasRequiredSchedules && (
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="part-i">
          <FilingPartI
            filingId={filing.id}
            client={filing.client}
            initialData={partIData}
          />
        </TabsContent>

        <TabsContent value="part-ii">
          <FilingPartII
            filingId={filing.id}
            initialData={partIIData}
          />
        </TabsContent>

        <TabsContent value="part-iii">
          <FilingPartIII
            filingId={filing.id}
            initialData={partIIIData}
          />
        </TabsContent>

        <TabsContent value="part-iv">
          <FilingPartIV
            filingId={filing.id}
            initialData={partIVData}
            requires481a={requires481a}
            suggestedSpreadPeriod={suggestedSpreadPeriod}
          />
        </TabsContent>

        {hasRequiredSchedules && (
          <TabsContent value="schedules">
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Required Schedules for DCN {filing.dcn}</h3>
                <p className="text-sm text-muted-foreground">
                  Based on the selected DCN, the following schedules are required for this filing:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {requiresScheduleA && <Badge>Schedule A - Overall Method</Badge>}
                  {requiresScheduleB && <Badge>Schedule B - Inventory</Badge>}
                  {requiresScheduleC && <Badge>Schedule C - Depreciation</Badge>}
                  {requiresScheduleD && <Badge>Schedule D - Long-Term Contracts</Badge>}
                  {requiresScheduleE && <Badge>Schedule E - Mark-to-Market</Badge>}
                </div>
              </div>

              {requiresScheduleA && (
                <ScheduleA filingId={filing.id} initialData={scheduleAData} />
              )}
              {requiresScheduleB && (
                <ScheduleB filingId={filing.id} initialData={scheduleBData} />
              )}
              {requiresScheduleC && (
                <ScheduleC filingId={filing.id} initialData={scheduleCData} />
              )}
              {requiresScheduleD && (
                <ScheduleD filingId={filing.id} initialData={scheduleDData} />
              )}
              {requiresScheduleE && (
                <ScheduleE filingId={filing.id} initialData={scheduleEData} />
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
