"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getFilings() {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const filings = await db.filing.findMany({
    where: {
      client: {
        userId: session.user.id,
      },
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return filings.map((filing) => ({
    id: filing.id,
    clientId: filing.client.id,
    clientName: filing.client.name,
    taxYearOfChange: filing.taxYearOfChange,
    dcn: filing.dcn,
    status: filing.status,
    updatedAt: filing.updatedAt.toLocaleDateString(),
  }))
}

export async function getFiling(id: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  const filing = await db.filing.findFirst({
    where: {
      id,
      client: {
        userId: session.user.id,
      },
    },
    include: {
      client: true,
    },
  })

  return filing
}

export async function createFiling(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const clientId = formData.get("clientId") as string
  const taxYearOfChange = parseInt(formData.get("taxYearOfChange") as string)

  if (!clientId) {
    return { error: "Please select a client" }
  }

  if (!taxYearOfChange || isNaN(taxYearOfChange)) {
    return { error: "Please enter a valid tax year" }
  }

  // Verify client ownership
  const client = await db.client.findFirst({
    where: { id: clientId, userId: session.user.id },
  })

  if (!client) {
    return { error: "Client not found" }
  }

  const filing = await db.filing.create({
    data: {
      clientId,
      taxYearOfChange,
      status: "draft",
    },
  })

  revalidatePath("/filings")
  revalidatePath(`/clients/${clientId}`)
  redirect(`/filings/${filing.id}`)
}

export async function updateFilingPartI(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  // Verify ownership
  const filing = await db.filing.findFirst({
    where: {
      id,
      client: {
        userId: session.user.id,
      },
    },
  })

  if (!filing) {
    return { error: "Filing not found" }
  }

  const partIData = {
    filerName: formData.get("filerName"),
    filerEin: formData.get("filerEin"),
    filerAddress: formData.get("filerAddress"),
    filerCity: formData.get("filerCity"),
    filerState: formData.get("filerState"),
    filerZip: formData.get("filerZip"),
    contactName: formData.get("contactName"),
    contactPhone: formData.get("contactPhone"),
    taxYearBegin: formData.get("taxYearBegin"),
    taxYearEnd: formData.get("taxYearEnd"),
    principalBusinessActivity: formData.get("principalBusinessActivity"),
    principalBusinessCode: formData.get("principalBusinessCode"),
  }

  await db.filing.update({
    where: { id },
    data: {
      partI: JSON.stringify(partIData),
      status: "in_progress",
      lastSavedStep: "part-i",
      completionPercentage: 25,
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}

export async function updateFilingPartII(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  // Verify ownership
  const filing = await db.filing.findFirst({
    where: {
      id,
      client: {
        userId: session.user.id,
      },
    },
  })

  if (!filing) {
    return { error: "Filing not found" }
  }

  const dcn = formData.get("dcn") as string
  const changeType = formData.get("changeType") as string

  const partIIData = {
    dcn,
    changeType,
    changeDescription: formData.get("changeDescription"),
    presentMethod: formData.get("presentMethod"),
    proposedMethod: formData.get("proposedMethod"),
    isAutomaticChange: changeType === "automatic",
    yearOfChangeReason: formData.get("yearOfChangeReason"),
    irsConsentDate: formData.get("irsConsentDate"),
  }

  await db.filing.update({
    where: { id },
    data: {
      dcn,
      changeType,
      partII: JSON.stringify(partIIData),
      status: "in_progress",
      lastSavedStep: "part-ii",
      completionPercentage: 50,
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}

export async function deleteFiling(id: string): Promise<void> {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  // Verify ownership
  const filing = await db.filing.findFirst({
    where: {
      id,
      client: {
        userId: session.user.id,
      },
    },
    include: {
      client: true,
    },
  })

  if (!filing) {
    redirect("/filings")
  }

  const clientId = filing.client.id

  await db.filing.delete({
    where: { id },
  })

  revalidatePath("/filings")
  revalidatePath(`/clients/${clientId}`)
  redirect("/filings")
}

export async function getClientsForSelect() {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const clients = await db.client.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      ein: true,
    },
    orderBy: { name: "asc" },
  })

  return clients
}
