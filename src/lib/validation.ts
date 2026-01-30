// Form 3115 Validation Rules

export type ValidationResult = {
  isValid: boolean
  errors: Record<string, string>
  warnings: Record<string, string>
}

// EIN validation - format: XX-XXXXXXX
export function validateEin(ein: string): boolean {
  if (!ein) return false
  const einPattern = /^\d{2}-\d{7}$/
  return einPattern.test(ein)
}

// PTIN validation - format: PXXXXXXXX (P followed by 8 digits)
export function validatePtin(ptin: string): boolean {
  if (!ptin) return false
  const ptinPattern = /^P\d{8}$/i
  return ptinPattern.test(ptin)
}

// Phone validation - accepts various formats
export function validatePhone(phone: string): boolean {
  if (!phone) return false
  const phonePattern = /^[\d\s\-\(\)\.]+$/
  const digitsOnly = phone.replace(/\D/g, '')
  return phonePattern.test(phone) && digitsOnly.length >= 10
}

// Zip code validation
export function validateZipCode(zip: string): boolean {
  if (!zip) return false
  const zipPattern = /^\d{5}(-\d{4})?$/
  return zipPattern.test(zip)
}

// State code validation
export function validateStateCode(state: string): boolean {
  const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC', 'PR', 'VI', 'GU', 'AS', 'MP'
  ]
  return validStates.includes(state?.toUpperCase())
}

// Tax year validation
export function validateTaxYear(year: number): boolean {
  const currentYear = new Date().getFullYear()
  return year >= 1990 && year <= currentYear + 1
}

// DCN validation
export function validateDcn(dcn: string): boolean {
  if (!dcn) return false
  // DCN can be a number or number with letter suffix
  const dcnPattern = /^\d{1,3}[a-zA-Z]?$/
  return dcnPattern.test(dcn)
}

// Validate Part I data
export function validatePartI(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  // Required fields
  if (!data.filerName) {
    errors.filerName = "Filer name is required"
  }

  if (!data.filerEin) {
    errors.filerEin = "EIN is required"
  } else if (!validateEin(data.filerEin as string)) {
    errors.filerEin = "EIN must be in format XX-XXXXXXX"
  }

  if (!data.filerAddress) {
    errors.filerAddress = "Street address is required"
  }

  if (!data.filerCity) {
    errors.filerCity = "City is required"
  }

  if (!data.filerState) {
    errors.filerState = "State is required"
  } else if (!validateStateCode(data.filerState as string)) {
    errors.filerState = "Invalid state code"
  }

  if (!data.filerZip) {
    errors.filerZip = "ZIP code is required"
  } else if (!validateZipCode(data.filerZip as string)) {
    errors.filerZip = "ZIP code must be in format XXXXX or XXXXX-XXXX"
  }

  // Warnings for optional but recommended fields
  if (!data.contactPhone) {
    warnings.contactPhone = "Contact phone is recommended"
  } else if (!validatePhone(data.contactPhone as string)) {
    warnings.contactPhone = "Phone number format may be invalid"
  }

  if (!data.principalBusinessCode) {
    warnings.principalBusinessCode = "NAICS code is recommended"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate Part II data
export function validatePartII(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  // Required fields
  if (!data.dcn) {
    errors.dcn = "Designated Change Number (DCN) is required"
  } else if (!validateDcn(data.dcn as string)) {
    warnings.dcn = "DCN format may be invalid - verify against Rev. Proc. 2025-23"
  }

  if (!data.changeDescription) {
    errors.changeDescription = "Description of the change is required"
  } else if ((data.changeDescription as string).length < 50) {
    warnings.changeDescription = "Description should be more detailed (at least 50 characters)"
  }

  if (!data.presentMethod) {
    errors.presentMethod = "Present method of accounting is required"
  }

  if (!data.proposedMethod) {
    errors.proposedMethod = "Proposed method of accounting is required"
  }

  // Warnings
  if (!data.yearOfChangeReason) {
    warnings.yearOfChangeReason = "Explanation for year of change is recommended"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate Part III data
export function validatePartIII(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  // Conditional validations
  if (data.priorMethodChange === "yes") { // Only check if YES
    if (!data.priorMethodChangeYear) {
      errors.priorMethodChangeYear = "Year of prior change is required when prior change is indicated"
    }
  }

  if (data.transactionAdjustment === "yes") { // Only check if YES
    if (!data.transactionAdjustmentDetails) {
      errors.transactionAdjustmentDetails = "Details are required when there is a transaction adjustment"
    }
  }

  if (data.relatedEntities === "yes") { // Only check if YES
    if (!data.relatedEntitiesDetails) {
      errors.relatedEntitiesDetails = "Details are required when there are related entities"
    }
  }

  if (data.consolidatedGroup === "yes") {
    if (!data.parentName) {
      errors.parentName = "Parent company name is required for consolidated group members"
    }
    if (!data.parentEin) {
      errors.parentEin = "Parent company EIN is required for consolidated group members"
    } else if (!validateEin(data.parentEin as string)) {
      errors.parentEin = "Parent EIN must be in format XX-XXXXXXX"
    }
  }

  if (data.underExamination === "yes" && !data.examiningOffice) {
    errors.examiningOffice = "Examining office is required when under examination"
  }

  if (data.priorRequest === "yes") { // Only check if YES
    if (!data.priorRequestDetails) {
      errors.priorRequestDetails = "Details are required when there was a prior request"
    }
  }

  if (data.booksAndRecords === "no" && !data.booksAndRecordsExplanation) {
    errors.booksAndRecordsExplanation = "Explanation is required when books and records do not match proposed method"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate Part IV data (Section 481(a) adjustment)
export function validatePartIV(data: Record<string, unknown>, requires481a: boolean): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  if (requires481a) {
    const presentIncome = data.presentMethodIncome as number
    const proposedIncome = data.proposedMethodIncome as number

    if (presentIncome === undefined || presentIncome === null) {
      errors.presentMethodIncome = "Present method income is required for 481(a) calculation"
    }

    if (proposedIncome === undefined || proposedIncome === null) {
      errors.proposedMethodIncome = "Proposed method income is required for 481(a) calculation"
    }

    if (!data.spreadPeriod) {
      warnings.spreadPeriod = "Spread period should be selected"
    }

    // Check for unusually large adjustments
    const adjustment = Math.abs((proposedIncome || 0) - (presentIncome || 0))
    if (adjustment > 10000000) {
      warnings.adjustmentAmount = "Large adjustment amount - please verify calculations"
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate entire filing for completeness
export function validateFiling(filing: {
  partI: Record<string, unknown> | null
  partII: Record<string, unknown> | null
  partIII: Record<string, unknown> | null
  partIV: Record<string, unknown> | null
  requires481a: boolean
}): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  // Check all parts are present
  if (!filing.partI) {
    errors.partI = "Part I (Filer Information) is not complete"
  } else {
    const partIResult = validatePartI(filing.partI)
    if (!partIResult.isValid) {
      errors.partI = "Part I has validation errors"
    }
  }

  if (!filing.partII) {
    errors.partII = "Part II (Change Information) is not complete"
  } else {
    const partIIResult = validatePartII(filing.partII)
    if (!partIIResult.isValid) {
      errors.partII = "Part II has validation errors"
    }
  }

  if (!filing.partIII) {
    warnings.partIII = "Part III (Change Details) is not complete"
  }

  if (filing.requires481a && !filing.partIV) {
    errors.partIV = "Part IV (Section 481(a) Adjustment) is required for this DCN"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate Schedule A data (Overall Method Changes)
export function validateScheduleA(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  if (!data.currentOverallMethod) {
    errors.currentOverallMethod = "Current overall method is required"
  }

  if (!data.proposedOverallMethod) {
    errors.proposedOverallMethod = "Proposed overall method is required"
  }

  if (data.currentOverallMethod && data.proposedOverallMethod &&
    data.currentOverallMethod === data.proposedOverallMethod) {
    errors.proposedOverallMethod = "Proposed method must be different from current method"
  }

  if (!data.grossReceiptsTest) {
    errors.grossReceiptsTest = "Gross receipts test answer is required"
  }

  // Warning for cash method with high gross receipts
  if (data.proposedOverallMethod === "cash" && data.grossReceiptsTest === "no") {
    const receipts = parseFloat(String(data.averageGrossReceipts || "0").replace(/[,$]/g, ''))
    if (receipts > 30000000) {
      warnings.averageGrossReceipts = "Taxpayer may not qualify for cash method with gross receipts exceeding $30 million"
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate Schedule B data (Inventory Methods)
export function validateScheduleB(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  if (!data.currentInventoryMethod) {
    errors.currentInventoryMethod = "Current inventory method is required"
  }

  if (!data.proposedInventoryMethod) {
    errors.proposedInventoryMethod = "Proposed inventory method is required"
  }

  if (data.currentInventoryMethod && data.proposedInventoryMethod &&
    data.currentInventoryMethod === data.proposedInventoryMethod) {
    errors.proposedInventoryMethod = "Proposed method must be different from current method"
  }

  // If LIFO is involved, require LIFO details
  if (data.lifoElection && data.lifoElection !== "na") {
    if (!data.lifoMethod) {
      errors.lifoMethod = "LIFO method is required when LIFO election is involved"
    }
    if (!data.lifoPoolingMethod) {
      warnings.lifoPoolingMethod = "LIFO pooling method should be specified"
    }
  }

  // Section 263A validation
  if (data.section263A === "yes" && !data.section263AMethod) {
    errors.section263AMethod = "Section 263A method is required when UNICAP applies"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate Schedule C data (Depreciation Changes)
export function validateScheduleC(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  if (!data.assetDescription) {
    errors.assetDescription = "Asset description is required"
  }

  if (!data.currentMethod) {
    errors.currentMethod = "Current depreciation method is required"
  }

  if (!data.proposedMethod) {
    errors.proposedMethod = "Proposed depreciation method is required"
  }

  if (!data.changeReason) {
    errors.changeReason = "Reason for change is required"
  }

  // Warnings for incomplete information
  if (!data.dateAcquired) {
    warnings.dateAcquired = "Date acquired is recommended for complete filing"
  }

  if (!data.currentLife) {
    warnings.currentLife = "Current recovery period should be specified"
  }

  if (!data.proposedLife) {
    warnings.proposedLife = "Proposed recovery period should be specified"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate Schedule D data (Long-Term Contracts)
export function validateScheduleD(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  if (!data.contractType) {
    errors.contractType = "Contract type is required"
  }

  if (!data.currentMethod) {
    errors.currentMethod = "Current accounting method is required"
  }

  if (!data.proposedMethod) {
    errors.proposedMethod = "Proposed accounting method is required"
  }

  if (!data.contractDescription) {
    errors.contractDescription = "Contract description is required"
  }

  // Section 460 validation
  if (data.section460Applies === "yes" && !data.lookBackMethod) {
    warnings.lookBackMethod = "Look-back method should be specified when Section 460 applies"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Validate Schedule E data (Mark-to-Market)
export function validateScheduleE(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}
  const warnings: Record<string, string> = {}

  if (!data.traderStatus) {
    errors.traderStatus = "Trader status is required"
  }

  if (!data.securityTypes) {
    errors.securityTypes = "Security types are required"
  }

  if (!data.section475Election) {
    errors.section475Election = "Section 475 election status is required"
  }

  // If making Section 475 election, require additional info
  if (data.section475Election === "yes" && !data.electionYear) {
    errors.electionYear = "Election year is required when making Section 475 election"
  }

  // Warnings for trader qualification
  if (data.traderStatus === "yes") {
    if (!data.tradingFrequency) {
      warnings.tradingFrequency = "Trading frequency should be documented to support trader status"
    }
    if (!data.averageHoldingPeriod) {
      warnings.averageHoldingPeriod = "Average holding period should be documented"
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  }
}

// Helper to convert FormData to object for validation
export function formDataToObject(formData: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {}
  formData.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format EIN with dash
export function formatEin(ein: string): string {
  const digits = ein.replace(/\D/g, '')
  if (digits.length === 9) {
    return `${digits.slice(0, 2)}-${digits.slice(2)}`
  }
  return ein
}
