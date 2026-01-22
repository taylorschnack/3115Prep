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

export type DcnCategory = (typeof DCN_CATEGORIES)[number]["value"]
