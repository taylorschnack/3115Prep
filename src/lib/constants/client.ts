export const ENTITY_TYPES = [
  { value: "c-corp", label: "C Corporation" },
  { value: "s-corp", label: "S Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "llc", label: "LLC" },
  { value: "sole-prop", label: "Sole Proprietorship" },
  { value: "nonprofit", label: "Tax-Exempt Organization" },
] as const

export const ENTITY_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  ENTITY_TYPES.map((t) => [t.value, t.label])
)
