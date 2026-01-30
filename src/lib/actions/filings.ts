"use server"

import { generateFilingPdf } from "@/lib/pdf/generator"

export async function downloadFilingPdf(filingId: string) {
  try {
    const filing = await db.filing.findUnique({
      where: { id: filingId },
      include: { client: true },
    })

    if (!filing) {
      return { error: "Filing not found" }
    }

    const pdfBytes = await generateFilingPdf(filing);
    // Convert to base64 to send to client
    const base64 = Buffer.from(pdfBytes).toString('base64');

    return { success: true, data: base64, filename: `f3115_${filing.client.name.replace(/\s+/g, '_')}_${filing.taxYearOfChange}.pdf` }
  } catch (error) {
    console.error("Error generating PDF:", error)
    return { error: "Failed to generate PDF" }
  }
}


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
  const dcnDetailsRaw = formData.get("dcnDetails") as string

  let dcnDetails = null
  if (dcnDetailsRaw) {
    try {
      dcnDetails = JSON.parse(dcnDetailsRaw)
    } catch {
      // Invalid JSON, ignore
    }
  }

  const partIIData = {
    dcn,
    changeType,
    changeDescription: formData.get("changeDescription"),
    presentMethod: formData.get("presentMethod"),
    proposedMethod: formData.get("proposedMethod"),
    isAutomaticChange: changeType === "automatic",
    yearOfChangeReason: formData.get("yearOfChangeReason"),
    irsConsentDate: formData.get("irsConsentDate"),
    dcnDetails,
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

export async function updateFilingPartIII(id: string, formData: FormData) {
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

  const partIIIData = {
    priorMethodChange: formData.get("priorMethodChange"),
    priorMethodChangeYear: formData.get("priorMethodChangeYear"),
    priorMethodChangeDcn: formData.get("priorMethodChangeDcn"),
    transactionAdjustment: formData.get("transactionAdjustment"),
    transactionAdjustmentDetails: formData.get("transactionAdjustmentDetails"),
    consolidatedGroup: formData.get("consolidatedGroup"),
    parentName: formData.get("parentName"),
    parentEin: formData.get("parentEin"),
    relatedEntities: formData.get("relatedEntities"),
    relatedEntitiesDetails: formData.get("relatedEntitiesDetails"),
    booksAndRecords: formData.get("booksAndRecords"),
    booksAndRecordsExplanation: formData.get("booksAndRecordsExplanation"),
    priorRequest: formData.get("priorRequest"),
    priorRequestDetails: formData.get("priorRequestDetails"),
    underExamination: formData.get("underExamination"),
    examiningOffice: formData.get("examiningOffice"),
    conferenceRequest: formData.get("conferenceRequest"),
    additionalInfo: formData.get("additionalInfo"),
  }

  await db.filing.update({
    where: { id },
    data: {
      partIII: JSON.stringify(partIIIData),
      status: "in_progress",
      lastSavedStep: "part-iii",
      completionPercentage: 75,
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}

export async function updateFilingPartIV(id: string, formData: FormData) {
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

  const adjustmentAmount = parseFloat(formData.get("adjustmentAmount") as string) || 0
  const spreadPeriodValue = parseInt(formData.get("spreadPeriod") as string) || 1

  const partIVData = {
    requires481a: formData.get("requires481a"),
    presentMethodIncome: parseFloat(formData.get("presentMethodIncome") as string) || 0,
    proposedMethodIncome: parseFloat(formData.get("proposedMethodIncome") as string) || 0,
    adjustmentAmount,
    adjustmentDirection: formData.get("adjustmentDirection"),
    spreadPeriod: formData.get("spreadPeriod"),
    yearOneAmount: parseFloat(formData.get("yearOneAmount") as string) || 0,
    yearTwoAmount: parseFloat(formData.get("yearTwoAmount") as string) || 0,
    yearThreeAmount: parseFloat(formData.get("yearThreeAmount") as string) || 0,
    yearFourAmount: parseFloat(formData.get("yearFourAmount") as string) || 0,
    calculationMethod: formData.get("calculationMethod"),
    supportingDocuments: formData.get("supportingDocuments"),
    hasNol: formData.get("hasNol"),
    nolAmount: parseFloat(formData.get("nolAmount") as string) || 0,
    nolYears: formData.get("nolYears"),
  }

  await db.filing.update({
    where: { id },
    data: {
      partIV: JSON.stringify(partIVData),
      section481aAdjustment: adjustmentAmount,
      spreadPeriod: spreadPeriodValue,
      status: "in_progress",
      lastSavedStep: "part-iv",
      completionPercentage: 100,
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}

export async function updateFilingScheduleA(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const filing = await db.filing.findFirst({
    where: { id, client: { userId: session.user.id } },
  })

  if (!filing) {
    return { error: "Filing not found" }
  }

  const scheduleAData = {
    currentOverallMethod: formData.get("currentOverallMethod"),
    proposedOverallMethod: formData.get("proposedOverallMethod"),
    grossReceiptsTest: formData.get("grossReceiptsTest"),
    averageGrossReceipts: formData.get("averageGrossReceipts"),
    qualifiesAsSmallBusiness: formData.get("qualifiesAsSmallBusiness"),
    inventoryMethod: formData.get("inventoryMethod"),
    hasInventory: formData.get("hasInventory"),
    section448Applies: formData.get("section448Applies"),
    section448Exception: formData.get("section448Exception"),
    additionalInfo: formData.get("additionalInfo"),
  }

  await db.filing.update({
    where: { id },
    data: {
      scheduleA: JSON.stringify(scheduleAData),
      status: "in_progress",
      lastSavedStep: "schedule-a",
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}

export async function updateFilingScheduleB(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const filing = await db.filing.findFirst({
    where: { id, client: { userId: session.user.id } },
  })

  if (!filing) {
    return { error: "Filing not found" }
  }

  const scheduleBData = {
    currentInventoryMethod: formData.get("currentInventoryMethod"),
    proposedInventoryMethod: formData.get("proposedInventoryMethod"),
    currentValuationMethod: formData.get("currentValuationMethod"),
    proposedValuationMethod: formData.get("proposedValuationMethod"),
    inventoryTypes: formData.get("inventoryTypes"),
    lifoElection: formData.get("lifoElection"),
    lifoMethod: formData.get("lifoMethod"),
    lifoPoolingMethod: formData.get("lifoPoolingMethod"),
    section263A: formData.get("section263A"),
    section263AMethod: formData.get("section263AMethod"),
    unicapMethod: formData.get("unicapMethod"),
    simplifiedMethod: formData.get("simplifiedMethod"),
    additionalInfo: formData.get("additionalInfo"),
  }

  await db.filing.update({
    where: { id },
    data: {
      scheduleB: JSON.stringify(scheduleBData),
      status: "in_progress",
      lastSavedStep: "schedule-b",
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}

export async function updateFilingScheduleC(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const filing = await db.filing.findFirst({
    where: { id, client: { userId: session.user.id } },
  })

  if (!filing) {
    return { error: "Filing not found" }
  }

  const scheduleCData = {
    assetDescription: formData.get("assetDescription"),
    dateAcquired: formData.get("dateAcquired"),
    currentMethod: formData.get("currentMethod"),
    currentLife: formData.get("currentLife"),
    currentConvention: formData.get("currentConvention"),
    proposedMethod: formData.get("proposedMethod"),
    proposedLife: formData.get("proposedLife"),
    proposedConvention: formData.get("proposedConvention"),
    section168Property: formData.get("section168Property"),
    section197Intangible: formData.get("section197Intangible"),
    bonusDepreciation: formData.get("bonusDepreciation"),
    section179Election: formData.get("section179Election"),
    adsRequired: formData.get("adsRequired"),
    changeReason: formData.get("changeReason"),
    additionalInfo: formData.get("additionalInfo"),
  }

  await db.filing.update({
    where: { id },
    data: {
      scheduleC: JSON.stringify(scheduleCData),
      status: "in_progress",
      lastSavedStep: "schedule-c",
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}

export async function updateFilingScheduleD(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const filing = await db.filing.findFirst({
    where: { id, client: { userId: session.user.id } },
  })

  if (!filing) {
    return { error: "Filing not found" }
  }

  const scheduleDData = {
    contractType: formData.get("contractType"),
    currentMethod: formData.get("currentMethod"),
    proposedMethod: formData.get("proposedMethod"),
    contractDescription: formData.get("contractDescription"),
    estimatedDuration: formData.get("estimatedDuration"),
    totalContractPrice: formData.get("totalContractPrice"),
    completionPercentage: formData.get("completionPercentage"),
    section460Applies: formData.get("section460Applies"),
    homeConstructionContract: formData.get("homeConstructionContract"),
    exemptSmallConstruction: formData.get("exemptSmallConstruction"),
    lookBackMethod: formData.get("lookBackMethod"),
    simplifiedMethod: formData.get("simplifiedMethod"),
    additionalInfo: formData.get("additionalInfo"),
  }

  await db.filing.update({
    where: { id },
    data: {
      scheduleD: JSON.stringify(scheduleDData),
      status: "in_progress",
      lastSavedStep: "schedule-d",
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}

export async function updateFilingScheduleE(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const filing = await db.filing.findFirst({
    where: { id, client: { userId: session.user.id } },
  })

  if (!filing) {
    return { error: "Filing not found" }
  }

  const scheduleEData = {
    traderStatus: formData.get("traderStatus"),
    electionType: formData.get("electionType"),
    securityTypes: formData.get("securityTypes"),
    currentMethod: formData.get("currentMethod"),
    proposedMethod: formData.get("proposedMethod"),
    section475Election: formData.get("section475Election"),
    electionYear: formData.get("electionYear"),
    priorElection: formData.get("priorElection"),
    businessDescription: formData.get("businessDescription"),
    tradingFrequency: formData.get("tradingFrequency"),
    averageHoldingPeriod: formData.get("averageHoldingPeriod"),
    substantialActivity: formData.get("substantialActivity"),
    separateAccounts: formData.get("separateAccounts"),
    hedgingTransactions: formData.get("hedgingTransactions"),
    additionalInfo: formData.get("additionalInfo"),
  }

  await db.filing.update({
    where: { id },
    data: {
      scheduleE: JSON.stringify(scheduleEData),
      status: "in_progress",
      lastSavedStep: "schedule-e",
    },
  })

  revalidatePath(`/filings/${id}`)
  return { success: true }
}
