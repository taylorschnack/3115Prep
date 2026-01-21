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

  // Extract DCN details from partII for Part IV requirements
  const dcnDetails = partIIData?.dcnDetails || null
  const requires481a = dcnDetails?.requires481a ?? true
  const suggestedSpreadPeriod = dcnDetails?.spreadPeriod ?? null

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="part-i">Part I - Filer Info</TabsTrigger>
          <TabsTrigger value="part-ii">Part II - Change Info</TabsTrigger>
          <TabsTrigger value="part-iii" disabled>Part III - Details</TabsTrigger>
          <TabsTrigger value="part-iv" disabled>Part IV - 481(a)</TabsTrigger>
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
          <div className="text-center py-12 text-muted-foreground">
            Part III will be available in a future update
          </div>
        </TabsContent>

        <TabsContent value="part-iv">
          <div className="text-center py-12 text-muted-foreground">
            Part IV (Section 481(a) Adjustment) will be available in a future update
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
