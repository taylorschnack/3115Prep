import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dcnData = [
  // Overall Method Changes
  {
    dcnNumber: "122",
    description: "Change to overall cash method for small business taxpayer",
    category: "overall_method",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleA: true,
    revProcReference: "Rev. Proc. 2025-23, Section 15.01",
  },
  {
    dcnNumber: "123",
    description: "Change from overall cash method to overall accrual method",
    category: "overall_method",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleA: true,
    revProcReference: "Rev. Proc. 2025-23, Section 15.02",
  },
  {
    dcnNumber: "124",
    description: "Change from cash to accrual method for specific item (excludes foreign income taxes)",
    category: "overall_method",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleA: true,
    revProcReference: "Rev. Proc. 2025-23, Section 15.08",
  },

  // Timing of Income Recognition
  {
    dcnNumber: "32",
    description: "Change to advance payment deferral method under Treas. Reg. §1.451-8",
    category: "revenue",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 17.04",
  },
  {
    dcnNumber: "233",
    description: "Change to comply with final revenue recognition regulations (ASC 606)",
    category: "revenue",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 17.12",
  },

  // Inventories - LIFO (Section 23)
  {
    dcnNumber: "21",
    description: "Change from LIFO inventory method",
    category: "inventory",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleB: true,
    revProcReference: "Rev. Proc. 2025-23, Section 23.01",
  },
  {
    dcnNumber: "22",
    description: "Change to LIFO inventory method",
    category: "inventory",
    isAutomatic: false,
    requires481a: false,
    requiresScheduleB: true,
    revProcReference: "Rev. Proc. 2025-23, Section 23.02",
  },

  // Inventories - UNICAP (Section 22)
  {
    dcnNumber: "24",
    description: "Change to UNICAP method",
    category: "inventory",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleB: true,
    revProcReference: "Rev. Proc. 2025-23, Section 22.01",
  },

  // Depreciation (Section 6)
  {
    dcnNumber: "7",
    description: "Impermissible to permissible method of accounting for depreciation",
    category: "depreciation",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2025-23, Section 6.01",
  },
  {
    dcnNumber: "8",
    description: "Permissible to permissible method of accounting for depreciation",
    category: "depreciation",
    isAutomatic: true,
    requires481a: false,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2025-23, Section 6.02",
  },
  {
    dcnNumber: "205",
    description: "Depreciation - late partial disposition election",
    category: "depreciation",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2025-23, Section 6.10",
  },
  {
    dcnNumber: "206",
    description: "Depreciation - revoke partial disposition election",
    category: "depreciation",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2025-23, Section 6.11",
  },
  {
    dcnNumber: "244",
    description: "Disposition of tangible depreciable assets (other than buildings)",
    category: "depreciation",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleC: true,
    revProcReference: "Rev. Proc. 2025-23, Section 6.14",
  },

  // Tangible Property Regulations (Section 11)
  {
    dcnNumber: "184",
    description: "Change to deducting amounts paid for materials and supplies",
    category: "tangible_property",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 11.08",
  },
  {
    dcnNumber: "186",
    description: "Change to capitalizing repair and maintenance costs",
    category: "tangible_property",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 11.10",
  },
  {
    dcnNumber: "187",
    description: "Change to deducting repair and maintenance costs",
    category: "tangible_property",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 11.11",
  },

  // Interest Capitalization (Section 12)
  {
    dcnNumber: "224",
    description: "Change to interest capitalization method (excludes certain improvement property)",
    category: "tangible_property",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 12.14",
  },

  // Research and Experimental Expenditures (Section 7)
  {
    dcnNumber: "265",
    description: "Change for domestic R&E expenditures under TCJA Section 174 (tax years beginning before 1/1/2025)",
    category: "research",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 7.01",
  },
  {
    dcnNumber: "236",
    description: "Change to Section 174A method for domestic R&E expenditures (tax years beginning after 12/31/2024)",
    category: "research",
    isAutomatic: true,
    requires481a: false,
    spreadPeriod: null,
    revProcReference: "Rev. Proc. 2025-23, Section 7.02",
  },
  {
    dcnNumber: "237",
    description: "Change in method for foreign R&E expenditures under Section 174",
    category: "research",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 7.03",
  },

  // Long-Term Contracts (Section 19)
  {
    dcnNumber: "30",
    description: "Change to percentage-of-completion method for long-term contracts",
    category: "long_term_contracts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleD: true,
    revProcReference: "Rev. Proc. 2025-23, Section 19.01",
  },
  {
    dcnNumber: "31",
    description: "Change from percentage-of-completion method for exempt contracts",
    category: "long_term_contracts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    requiresScheduleD: true,
    revProcReference: "Rev. Proc. 2025-23, Section 19.02",
  },

  // Recurring Item Exception (Section 20)
  {
    dcnNumber: "135",
    description: "Change to recurring item exception (excludes reward program liabilities)",
    category: "expenses",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 20.07",
  },

  // Bad Debts (Section 24)
  {
    dcnNumber: "166",
    description: "Change to specific charge-off method for bad debts",
    category: "bad_debts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 24.01",
  },
  {
    dcnNumber: "167",
    description: "Change from reserve method to specific charge-off method for bad debts",
    category: "bad_debts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 24.02",
  },
  {
    dcnNumber: "266",
    description: "Change to allowance charge-off method for regulated financial companies",
    category: "bad_debts",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 24.03",
  },

  // Leasing (Section 14)
  {
    dcnNumber: "228",
    description: "Change for leases to comply with ASC 842",
    category: "leasing",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 14.17",
  },

  // Mark-to-Market (Section 25)
  {
    dcnNumber: "64",
    description: "Change to mark-to-market method for dealers in securities",
    category: "mark_to_market",
    isAutomatic: false,
    requires481a: true,
    spreadPeriod: null,
    requiresScheduleE: true,
    revProcReference: "Rev. Proc. 2025-23, Section 25.01",
  },

  // Utilities (Section 10)
  {
    dcnNumber: "91",
    description: "Up-front payments for network upgrades received by utilities",
    category: "revenue",
    isAutomatic: true,
    requires481a: true,
    spreadPeriod: 4,
    revProcReference: "Rev. Proc. 2025-23, Section 10.01",
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
