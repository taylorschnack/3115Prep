import { notFound } from "next/navigation"
import { ClientForm } from "@/components/client-form"
import { getClient } from "@/lib/actions/clients"

export default async function EditClientPage({
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
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
        <p className="text-muted-foreground">
          Update {client.name}&apos;s information
        </p>
      </div>
      <ClientForm client={client} />
    </div>
  )
}
