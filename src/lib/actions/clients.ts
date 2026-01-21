"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getClients() {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const clients = await db.client.findMany({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: { filings: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return clients.map((client) => ({
    ...client,
    filingsCount: client._count.filings,
  }))
}

export async function getClient(id: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  const client = await db.client.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      filings: {
        orderBy: { updatedAt: "desc" },
      },
    },
  })

  return client
}

export async function createClient(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const name = formData.get("name") as string
  const ein = formData.get("ein") as string
  const entityType = formData.get("entityType") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const state = formData.get("state") as string
  const zipCode = formData.get("zipCode") as string
  const contactName = formData.get("contactName") as string
  const contactPhone = formData.get("contactPhone") as string
  const contactEmail = formData.get("contactEmail") as string
  const taxYearEnd = formData.get("taxYearEnd") as string

  if (!name) {
    return { error: "Client name is required" }
  }

  const client = await db.client.create({
    data: {
      userId: session.user.id,
      name,
      ein: ein || null,
      entityType: entityType || null,
      address: address || null,
      city: city || null,
      state: state || null,
      zipCode: zipCode || null,
      contactName: contactName || null,
      contactPhone: contactPhone || null,
      contactEmail: contactEmail || null,
      taxYearEnd: taxYearEnd || null,
    },
  })

  revalidatePath("/clients")
  redirect(`/clients/${client.id}`)
}

export async function updateClient(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const name = formData.get("name") as string
  const ein = formData.get("ein") as string
  const entityType = formData.get("entityType") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const state = formData.get("state") as string
  const zipCode = formData.get("zipCode") as string
  const contactName = formData.get("contactName") as string
  const contactPhone = formData.get("contactPhone") as string
  const contactEmail = formData.get("contactEmail") as string
  const taxYearEnd = formData.get("taxYearEnd") as string

  if (!name) {
    return { error: "Client name is required" }
  }

  // Verify ownership
  const existing = await db.client.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!existing) {
    return { error: "Client not found" }
  }

  await db.client.update({
    where: { id },
    data: {
      name,
      ein: ein || null,
      entityType: entityType || null,
      address: address || null,
      city: city || null,
      state: state || null,
      zipCode: zipCode || null,
      contactName: contactName || null,
      contactPhone: contactPhone || null,
      contactEmail: contactEmail || null,
      taxYearEnd: taxYearEnd || null,
    },
  })

  revalidatePath("/clients")
  revalidatePath(`/clients/${id}`)
  redirect(`/clients/${id}`)
}

export async function deleteClient(id: string): Promise<void> {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  // Verify ownership
  const existing = await db.client.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!existing) {
    redirect("/clients")
  }

  await db.client.delete({
    where: { id },
  })

  revalidatePath("/clients")
  redirect("/clients")
}
