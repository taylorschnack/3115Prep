"use server"

import { db } from "@/lib/db"

export async function searchDcns(query: string) {
  const dcns = await db.dcnReference.findMany({
    where: {
      OR: [
        { dcnNumber: { contains: query } },
        { description: { contains: query } },
        { category: { contains: query } },
      ],
    },
    orderBy: { dcnNumber: "asc" },
    take: 20,
  })

  return dcns
}

export async function getAllDcns() {
  const dcns = await db.dcnReference.findMany({
    orderBy: { dcnNumber: "asc" },
  })

  return dcns
}

export async function getDcnByNumber(dcnNumber: string) {
  const dcn = await db.dcnReference.findUnique({
    where: { dcnNumber },
  })

  return dcn
}

export async function getDcnsByCategory(category: string) {
  const dcns = await db.dcnReference.findMany({
    where: { category },
    orderBy: { dcnNumber: "asc" },
  })

  return dcns
}

export type DcnReference = {
  id: string
  dcnNumber: string
  description: string
  category: string
  isAutomatic: boolean
  requires481a: boolean
  spreadPeriod: number | null
  requiresScheduleA: boolean
  requiresScheduleB: boolean
  requiresScheduleC: boolean
  requiresScheduleD: boolean
  requiresScheduleE: boolean
  revProcReference: string | null
}

export const DCN_CATEGORIES = [
  { value: "overall_method", label: "Overall Method" },
  { value: "revenue", label: "Revenue Recognition" },
  { value: "inventory", label: "Inventory" },
  { value: "depreciation", label: "Depreciation" },
  { value: "tangible_property", label: "Tangible Property" },
  { value: "research", label: "Research & Experimental" },
  { value: "long_term_contracts", label: "Long-Term Contracts" },
  { value: "bad_debts", label: "Bad Debts" },
  { value: "leasing", label: "Leasing" },
  { value: "mark_to_market", label: "Mark-to-Market" },
] as const
