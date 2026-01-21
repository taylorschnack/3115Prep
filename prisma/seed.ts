import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dcnData = [
  // Overall Method Changes
  {
    dcnNumber: "7",
    description: "Change to overall cash method for small business taxpayer",
    category: "overall_method",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleA: true,
    revProcReference: "Rev. Proc. 2023-34, Section 15.01",
  },
  {
    dcnNumber: "8",
    description: "Change from overall cash method to overall accrual method",
    category: "overall_method",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleA: true,
    revProcReference: "Rev. Proc. 2023-34, Section 15.02",
  },

  // Timing of Income Recognition
  {
    dcnNumber: "32",
    description: "Change to advance payment deferral method under Rev. Proc. 2004-34",
    category: "revenue",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 16.04",
  },
  {
    dcnNumber: "233",
    description: "Change to comply with final revenue recognition regulations (ASC 606)",
    category: "revenue",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 16.12",
  },

  // Inventories
  {
    dcnNumber: "21",
    description: "Change from LIFO inventory method",
    category: "inventory",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleB: true,
    revProcReference: "Rev. Proc. 2023-34, Section 22.01",
  },
  {
    dcnNumber: "22",
    description: "Change to LIFO inventory method",
    category: "inventory",
    isAutomatic: false,
    requires481a: false,
    requiresScheduleB: true,
    revProcReference: "Rev. Proc. 2023-34, Section 22.02",
  },
  {
    dcnNumber: "24",
    description: "Change to UNICAP method",
    category: "inventory",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleB: true,
    revProcReference: "Rev. Proc. 2023-34, Section 22.04",
  },

  // Depreciation
  {
    dcnNumber: "7",
    description: "Late depreciation election under Section 168(k)",
    category: "depreciation",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2023-34, Section 6.01",
  },
  {
    dcnNumber: "205",
    description: "Depreciation - late partial disposition election",
    category: "depreciation",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2023-34, Section 6.19",
  },
  {
    dcnNumber: "206",
    description: "Depreciation - revoke partial disposition election",
    category: "depreciation",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2023-34, Section 6.20",
  },
  {
    dcnNumber: "207",
    description: "Change in depreciation due to change in use",
    category: "depreciation",
    isAutomatic: true,
    requires481a: false,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2023-34, Section 6.21",
  },

  // Tangible Property Regulations
  {
    dcnNumber: "184",
    description: "Change to deducting amounts paid for materials and supplies",
    category: "tangible_property",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 11.08",
  },
  {
    dcnNumber: "186",
    description: "Change to capitalizing repair and maintenance costs",
    category: "tangible_property",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 11.10",
  },
  {
    dcnNumber: "187",
    description: "Change to deducting repair and maintenance costs",
    category: "tangible_property",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 11.11",
  },

  // Research and Experimental Expenditures
  {
    dcnNumber: "236",
    description: "Change to required capitalization of specified R&E expenditures under Section 174",
    category: "research",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 7.02",
  },
  {
    dcnNumber: "237",
    description: "Change in amortization period for specified R&E expenditures",
    category: "research",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 7.03",
  },

  // Long-Term Contracts
  {
    dcnNumber: "30",
    description: "Change to percentage-of-completion method for long-term contracts",
    category: "long_term_contracts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleD: true,
    revProcReference: "Rev. Proc. 2023-34, Section 19.01",
  },
  {
    dcnNumber: "31",
    description: "Change from percentage-of-completion method for exempt contracts",
    category: "long_term_contracts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleD: true,
    revProcReference: "Rev. Proc. 2023-34, Section 19.02",
  },

  // Bad Debts
  {
    dcnNumber: "166",
    description: "Change to specific charge-off method for bad debts",
    category: "bad_debts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 23.01",
  },
  {
    dcnNumber: "167",
    description: "Change from reserve method to specific charge-off method for bad debts",
    category: "bad_debts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 23.02",
  },

  // Leasing
  {
    dcnNumber: "228",
    description: "Change for leases to comply with ASC 842",
    category: "leasing",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2023-34, Section 14.17",
  },

  // Mark-to-Market
  {
    dcnNumber: "64",
    description: "Change to mark-to-market method for dealers in securities",
    category: "mark_to_market",
    isAutomatic: false,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleE: true,
    revProcReference: "Rev. Proc. 2023-34, Section 24.01",
  },
]

async function main() {
  console.log("Seeding DCN reference data...")

  for (const dcn of dcnData) {
    await prisma.dcnReference.upsert({
      where: { dcnNumber: dcn.dcnNumber },
      update: dcn,
      create: dcn,
    })
  }

  console.log(`Seeded ${dcnData.length} DCN references`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
