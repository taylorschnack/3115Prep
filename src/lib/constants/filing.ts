export const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  in_progress: "In Progress",
  ready: "Ready for Review",
  completed: "Completed",
}

export const STATUS_COLORS = {
  draft: "secondary",
  in_progress: "default",
  ready: "outline",
  completed: "default",
} as const
