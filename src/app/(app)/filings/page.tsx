import Link from "next/link"
import { Plus, MoreHorizontal, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { getFilings } from "@/lib/actions/filings"
import { DeleteFilingButton } from "@/components/delete-filing-button"
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/constants/filing"

export default async function FilingsPage() {
  const filings = await getFilings()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Filings</h1>
          <p className="text-muted-foreground">
            Manage all Form 3115 filings across your clients
          </p>
        </div>
        <Button asChild>
          <Link href="/filings/new">
            <Plus className="mr-2 h-4 w-4" />
            New Filing
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Filings</CardTitle>
          <CardDescription>
            Track and manage Form 3115 applications for accounting method changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filings.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">No filings yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by creating a new Form 3115 filing
              </p>
              <Button asChild>
                <Link href="/filings/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Filing
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Tax Year</TableHead>
                  <TableHead>DCN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filings.map((filing) => (
                  <TableRow key={filing.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/filings/${filing.id}`}
                        className="hover:underline"
                      >
                        {filing.clientName}
                      </Link>
                    </TableCell>
                    <TableCell>{filing.taxYearOfChange}</TableCell>
                    <TableCell>{filing.dcn || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_COLORS[filing.status as keyof typeof STATUS_COLORS] || "secondary"}>
                        {STATUS_LABELS[filing.status] || filing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{filing.updatedAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/filings/${filing.id}`}>
                              Continue Editing
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/clients/${filing.clientId}`}>
                              View Client
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <DeleteFilingButton filingId={filing.id} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
