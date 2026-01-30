
export const FIELD_MAPPING = {
    // Part I
    partI: {
        filerName: 'topmostSubform[0].Page1[0].f1_1[0]',
        filerAddress: 'topmostSubform[0].Page1[0].f1_2[0]',
        filerCityStateZip: 'topmostSubform[0].Page1[0].f1_3[0]',
        filerEin: 'topmostSubform[0].Page1[0].f1_4[0]',
        principalBusinessCode: 'topmostSubform[0].Page1[0].f1_5[0]',
        taxYearBegin: 'topmostSubform[0].Page1[0].f1_6[0]',
        taxYearEnd: 'topmostSubform[0].Page1[0].f1_7[0]',
        contactName: 'topmostSubform[0].Page1[0].f1_8[0]',
        nameOfApplicant: 'topmostSubform[0].Page1[0].f1_9[0]',
        contactPhone: 'topmostSubform[0].Page1[0].f1_10[0]',
    },
    partII: {
        dcn: 'topmostSubform[0].Page1[0].f1_15[0]', // Best guess for DCN field based on layout
        description: 'topmostSubform[0].Page1[0].f1_16[0]', // Description of change
    },
    partIII: {
        // "Part III" in UI corresponds to Part II of the form (Page 2)
        // Q11a (Prior Change)
        priorMethodChangeYes: 'topmostSubform[0].Page2[0].c2_11[0]',
        priorMethodChangeNo: 'topmostSubform[0].Page2[0].c2_11[1]',
        // Note: Q11b (Details) says "attach statement", no text fields found on Page 2 for this.

        // Q10 (Consolidated Group)
        consolidatedGroupYes: 'topmostSubform[0].Page2[0].c2_9[0]',
        consolidatedGroupNo: 'topmostSubform[0].Page2[0].c2_9[1]',

        // Q16 (Transaction Adjustment)? Assuming c2_14 based on layout order
        transactionAdjustmentYes: 'topmostSubform[0].Page2[0].c2_14[0]',
        transactionAdjustmentNo: 'topmostSubform[0].Page2[0].c2_14[1]',
        // Note: Details likely "attach statement".
    },
    partIV: {
        // Section 481(a) Adjustment (Page 4)
        // Line 25: Year of change
        yearOfChange: 'topmostSubform[0].Page4[0].f4_1[0]',
        // Line 26: Amount of section 481(a) adjustment
        totalAdjustment: 'topmostSubform[0].Page4[0].f4_2[0]',

        // Line 27: Period (Checkboxes) - Guessing order: 1 year, 4 year
        spreadPeriod1Year: 'topmostSubform[0].Page4[0].c4_1[0]',
        spreadPeriod4Year: 'topmostSubform[0].Page4[0].c4_1[1]', // Warning: Checkboxes often are c4_1[0], c4_2[0] OR c4_1[0], c4_1[1]. Dump shows c4_1, c4_2...
        // Checking dump: c4_1[0], c4_1[1]. c4_2[0], c4_2[1]. 
        // Let's assume c4_1 is the first group (Line 27). 
        // [0] might be "1 year", [1] might be "4 year"? Or separate checks?
        // Let's map generalized keys and test visually if possible, or pick likely candidates.
    },
    scheduleA: {
        // Schedule A: Change in Overall Method (Page 4)
        // Line 1: Present/Proposed Method
        presentMethodCash: 'topmostSubform[0].Page4[0].c4_5[0]',
        presentMethodAccrual: 'topmostSubform[0].Page4[0].c4_5[1]',
        proposedMethodCash: 'topmostSubform[0].Page4[0].c4_6[0]',
        proposedMethodAccrual: 'topmostSubform[0].Page4[0].c4_6[1]',

        // Line 2a: Income accrued but not received
        incomeAccrued: 'topmostSubform[0].Page4[0].f4_3[0]',

        // Line 3: Gross Receipts (Table). Mapping first field to average.
        grossReceiptsAmount: 'topmostSubform[0].Page4[0].f4_4[0]',
    },
    scheduleD: {
        // Schedule D (Page 6)
        // Part I: Long-Term Contracts
        // Q2a: Long-term contracts?
        contractsLongTermYes: 'topmostSubform[0].Page6[0].c6_1[0]',
        contractsLongTermNo: 'topmostSubform[0].Page6[0].c6_1[1]',
        // Q2b: Section 460(e) exception?
        contractsExceptionYes: 'topmostSubform[0].Page6[0].c6_2[0]',
        contractsExceptionNo: 'topmostSubform[0].Page6[0].c6_2[1]',
        // Q2c: Percentage-of-completion?
        contractsPcmYes: 'topmostSubform[0].Page6[0].c6_3[0]',
        contractsPcmNo: 'topmostSubform[0].Page6[0].c6_3[1]',
        // Q2d: Simplified cost-to-cost?
        contractsSimplifiedYes: 'topmostSubform[0].Page6[0].c6_4[0]',
        contractsSimplifiedNo: 'topmostSubform[0].Page6[0].c6_4[1]',
        // Q2e: Exempt-contract PCM?
        contractsExemptPcmYes: 'topmostSubform[0].Page6[0].c6_5[0]',
        contractsExemptPcmNo: 'topmostSubform[0].Page6[0].c6_5[1]',

        // Q3a: Manufacturing contracts?
        contractsManufacturingYes: 'topmostSubform[0].Page6[0].c6_6[0]',
        contractsManufacturingNo: 'topmostSubform[0].Page6[0].c6_6[1]',

        // Q4a: Cost-plus long-term?
        contractsCostPlusYes: 'topmostSubform[0].Page6[0].c6_7[0]',
        contractsCostPlusNo: 'topmostSubform[0].Page6[0].c6_7[1]',
        // Q4b: Federal long-term?
        contractsFederalYes: 'topmostSubform[0].Page6[0].c6_8[0]',
        contractsFederalNo: 'topmostSubform[0].Page6[0].c6_8[1]',

        // Part II: Valuing Inventories
        // Q3a: Subject to 263A?
        inventory263aYes: 'topmostSubform[0].Page6[0].c6_9[0]',
        inventory263aNo: 'topmostSubform[0].Page6[0].c6_9[1]',
        // Q3b: Compliance with 263A?
        inventoryComplianceYes: 'topmostSubform[0].Page6[0].c6_10[0]',
        inventoryComplianceNo: 'topmostSubform[0].Page6[0].c6_10[1]',

        // Q4b: Value at end of tax year. Two text fields f6_1 (left?) and f6_2 (right?)
        // Assuming f6_1 is Present (or Preceding year) and f6_2 is Proposed (or Current).
        // Label says: "Enter the value at the end of the tax year preceding the year of change."
        // There are two dollar boxes. Likely one for "Inventory Method Being Changed" column and one for "Not Being Changed"?
        // Or maybe just one value? Let's map both for now or guess f6_1.
        inventoryValuePrecedingYear: 'topmostSubform[0].Page6[0].f6_1[0]',
    },
    partIIICostAllocation: {
        // Part III Section B (Page 7) and C (Page 8)
        // Fields are f7_1 to f7_56 (28 rows * 2 cols) for Section B
        // Fields are f8_1 to f8_22 (11 rows * 2 cols) for Section C
        // We can map these programmatically or just expose the start for custom logic
        sectionBStart: 'topmostSubform[0].Page7[0].Pg7Table[0].BodyRow1[0].f7_1[0]',
        sectionCStart: 'topmostSubform[0].Page8[0].Pg8Table[0].BodyRow1[0].f8_1[0]',
    },
    scheduleE: {
        // Schedule E: Depreciation/Amortization (Page 8)
        // Q1: Regs 1.167(a)-11?
        deprecRegs1167Yes: 'topmostSubform[0].Page8[0].c8_1[0]',
        deprecRegs1167No: 'topmostSubform[0].Page8[0].c8_1[1]',

        // Q2: Capitalized under 263A?
        deprecCap263aYes: 'topmostSubform[0].Page8[0].c8_2[0]',
        deprecCap263aNo: 'topmostSubform[0].Page8[0].c8_2[1]',
        deprecCap263aSection: 'topmostSubform[0].Page8[0].f8_23[0]', // "If Yes enter applicable section"

        // Q3: Election under 168(f)(1)?
        deprecElection168Yes: 'topmostSubform[0].Page8[0].c8_3[0]',
        deprecElection168No: 'topmostSubform[0].Page8[0].c8_3[1]',
        deprecElectionMade: 'topmostSubform[0].Page8[0].f8_24[0]', // "If Yes state election made"

        // Q4b: Residential rental?
        deprecResidentialYes: 'topmostSubform[0].Page8[0].c8_4[0]',
        deprecResidentialNo: 'topmostSubform[0].Page8[0].c8_4[1]',

        // Q4c: Public utility?
        deprecPublicUtilityYes: 'topmostSubform[0].Page8[0].c8_5[0]',
        deprecPublicUtilityNo: 'topmostSubform[0].Page8[0].c8_5[1]',
    }
};
