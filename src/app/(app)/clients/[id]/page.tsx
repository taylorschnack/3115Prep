import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Edit, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { getClient } from "@/lib/actions/clients"
import { DeleteClientButton } from "@/components/delete-client-button"

const entityTypeLabels: Record<string, string> = {
  "c-corp": "C Corporation",
  "s-corp": "S Corporation",
  "partnership": "Partnership",
  "llc": "LLC",
  "sole-prop": "Sole Proprietorship",
  "nonprofit": "Tax-Exempt Organization",
}

const statusLabels: Record<string, string> = {
  draft: "Draft",
  in_progress: "In Progress",
  ready: "Ready",
  completed: "Completed",
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const client = await getClient(id)

  if (!client) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground">
            {client.entityType ? entityTypeLabels[client.entityType] || client.entityType : "Entity type not specified"}
            {client.ein && ` • EIN: ${client.ein}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/clients/${client.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteClientButton clientId={client.id} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            {client.address || client.city || client.state ? (
              <address className="not-italic text-muted-foreground">
                {client.address && <div>{client.address}</div>}
                {(client.city || client.state || client.zipCode) && (
                  <div>
                    {client.city}{client.city && client.state && ", "}
                    {client.state} {client.zipCode}
                  </div>
                )}
              </address>
            ) : (
              <p className="text-muted-foreground">No address on file</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            {client.contactName && <div>{client.contactName}</div>}
            {client.contactPhone && <div>{client.contactPhone}</div>}
            {client.contactEmail && (
              <div>
                <a href={`mailto:${client.contactEmail}`} className="text-primary hover:underline">
                  {client.contactEmail}
                </a>
              </div>
            )}
            {!client.contactName && !client.contactPhone && !client.contactEmail && (
              <p>No contact information on file</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Form 3115 Filings</CardTitle>
            <CardDescription>
              All accounting method change applications for this client
            </CardDescription>
          </div>
          <Button asChild>
            <Link href={`/filings/new?clientId=${client.id}`}>
              <Plus className="mr-2 h-4 w-4" />
              New Filing
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {client.filings.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <p className="text-muted-foreground">No filings yet</p>
              <p className="text-sm text-muted-foreground">
                Create a new Form 3115 filing for this client
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tax Year</TableHead>
                  <TableHead>DCN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client.filings.map((filing) => (
                  <TableRow key={filing.id}>
                    <TableCell>
                      <Link
                        href={`/filings/${filing.id}`}
                        className="font-medium hover:underline"
                      >
                        {filing.taxYearOfChange}
                      </Link>
                    </TableCell>
                    <TableCell>{filing.dcn || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {statusLabels[filing.status] || filing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(filing.updatedAt).toLocaleDateString()}
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
