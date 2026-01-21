import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Clock, CheckCircle, Plus } from "lucide-react"
import { getDashboardStats } from "@/lib/actions/dashboard"

const statusLabels: Record<string, string> = {
  draft: "Draft",
  in_progress: "In Progress",
  ready: "Ready",
  completed: "Completed",
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your Form 3115 filings.
          </p>
        </div>
        <Button asChild>
          <Link href="/filings/new">
            <Plus className="mr-2 h-4 w-4" />
            New Filing
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              Active client accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              Filings being prepared
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">
              Filings ready for submission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Filings</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFilings}</div>
            <p className="text-xs text-muted-foreground">
              All Form 3115 filings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Filings</CardTitle>
            <CardDescription>
              Your most recently updated Form 3115 filings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentFilings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No filings yet</p>
                <p className="text-sm">Create your first filing to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentFilings.map((filing) => (
                  <div
                    key={filing.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <Link
                        href={`/filings/${filing.id}`}
                        className="font-medium hover:underline"
                      >
                        {filing.clientName}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Tax Year {filing.taxYearOfChange}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {statusLabels[filing.status] || filing.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {filing.updatedAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/clients/new">
                <Users className="mr-2 h-4 w-4" />
                Add New Client
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/filings/new">
                <FileText className="mr-2 h-4 w-4" />
                Start New Form 3115
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
