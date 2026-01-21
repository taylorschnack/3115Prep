import { ClientForm } from "@/components/client-form"

export default function NewClientPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Client</h1>
        <p className="text-muted-foreground">
          Enter your client&apos;s information to get started
        </p>
      </div>
      <ClientForm />
    </div>
  )
}
