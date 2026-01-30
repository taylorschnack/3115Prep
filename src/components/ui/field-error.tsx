"use client"

import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

interface FieldErrorProps {
  error?: string
  warning?: string
  className?: string
}

export function FieldError({ error, warning, className }: FieldErrorProps) {
  if (!error && !warning) return null

  return (
    <p
      className={cn(
        "text-sm flex items-center gap-1 mt-1",
        error ? "text-destructive" : "text-amber-600",
        className
      )}
    >
      <AlertCircle className="h-3 w-3 flex-shrink-0" />
      <span>{error || warning}</span>
    </p>
  )
}

interface ValidationSummaryProps {
  errors: Record<string, string>
  warnings?: Record<string, string>
  className?: string
}

export function ValidationSummary({ errors, warnings = {}, className }: ValidationSummaryProps) {
  const hasErrors = Object.keys(errors).length > 0
  const hasWarnings = Object.keys(warnings).length > 0

  if (!hasErrors && !hasWarnings) return null

  return (
    <div className={cn("rounded-lg p-4 space-y-2", className)}>
      {hasErrors && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
          <p className="font-medium text-destructive text-sm mb-2">
            Please fix the following errors:
          </p>
          <ul className="list-disc list-inside text-sm text-destructive space-y-1">
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {hasWarnings && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
          <p className="font-medium text-amber-700 text-sm mb-2">
            Warnings:
          </p>
          <ul className="list-disc list-inside text-sm text-amber-600 space-y-1">
            {Object.values(warnings).map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
