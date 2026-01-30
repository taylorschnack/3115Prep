# Form 3115 Field Mapping Reference

This document provides a comprehensive mapping of all fillable fields in Form 3115 (Rev. December 2022).

## Field Naming Convention

- **Text fields**: Prefixed with `f#_##[0]` (e.g., `f1_1[0]`, `f2_5[0]`)
- **Checkbox fields**: Prefixed with `c#_##[0]` (e.g., `c1_1[0]`, `c2_3[0]`)
- **Page containers**: Named as `Page#[0]` (e.g., `Page1[0]`, `Page2[0]`)
- All fields are nested under `topmostSubform[0]`

## Page 1 - Header Information

### Basic Taxpayer Information
| Field Name | Description | Type |
|------------|-------------|------|
| `f1_1[0]` | Name of filer | Text |
| `f1_2[0]` | Street address | Text |
| `f1_3[0]` | City, state, ZIP | Text |
| `f1_4[0]` | Identification number | Text |
| `f1_5[0]` | Principal business activity code | Text |
| `f1_6[0]` | Tax year begins (MM/DD/YYYY) | Text |
| `f1_7[0]` | Tax year ends (MM/DD/YYYY) | Text |
| `f1_8[0]` | Contact person name | Text |
| `f1_9[0]` | Applicant name (if different) | Text |
| `f1_10[0]` | Contact telephone number | Text |

### Communication Preferences
| Field Name | Description | Type |
|------------|-------------|------|
| `c1_1[0]` | Receive by fax/email - Yes | Checkbox |
| `c1_1[1]` | Receive by fax/email - No | Checkbox |
| `c1_2[0]` | Member of consolidated group | Checkbox |
| `c1_3[0]` | Form 2848 attached | Checkbox |

### Type of Applicant (Checkboxes)
| Field Name | Description | Type |
|------------|-------------|------|
| `c1_4[0]` | Individual | Checkbox |
| `c1_4[1]` | Corporation | Checkbox |
| `c1_4[2]` | Controlled foreign corporation (Sec. 957) | Checkbox |
| `c1_4[3]` | 10/50 corporation (Sec. 904(d)(2)(E)) | Checkbox |
| `c1_4[4]` | Qualified personal service corporation | Checkbox |
| `c1_4[5]` | Exempt organization | Checkbox |
| `f1_11[0]` | Exempt organization - Code section | Text |
| `c1_4[6]` | Cooperative (Sec. 1381) | Checkbox |
| `c1_4[7]` | Partnership | Checkbox |
| `c1_4[8]` | S corporation | Checkbox |
| `c1_4[9]` | Insurance co. (Sec. 816(a)) | Checkbox |
| `c1_4[10]` | Insurance co. (Sec. 831) | Checkbox |
| `c1_4[11]` | Other (specify) | Checkbox |
| `f1_12[0]` | Other applicant type description | Text |

### Type of Accounting Method Change
| Field Name | Description | Type |
|------------|-------------|------|
| `c1_5[0]` | Depreciation or Amortization | Checkbox |
| `c1_5[1]` | Financial Products and/or Financial Activities | Checkbox |
| `c1_5[2]` | Other (specify) | Checkbox |
| `f1_13[0]` | Other method change description | Text |

### Part I - Automatic Change Request - DCN Fields
| Field Name | Description | Type |
|------------|-------------|------|
| `f1_15[0]` | DCN (1) | Text |
| `f1_16[0]` | DCN (2) | Text |
| `f1_17[0]` | DCN (3) | Text |
| `f1_18[0]` | DCN (4) | Text |
| `f1_19[0]` | DCN (5) | Text |
| `f1_20[0]` | DCN (6) | Text |
| `f1_21[0]` | DCN (7) | Text |
| `f1_22[0]` | DCN (8) | Text |
| `f1_23[0]` | DCN (9) | Text |
| `f1_24[0]` | DCN (10) | Text |
| `f1_25[0]` | DCN (11) | Text |
| `f1_26[0]` | DCN (12) | Text |
| `c1_6[0]` | Other (non-DCN change) | Checkbox |
| `f1_14[0]` | Other description | Text |

### Part I - Questions 2-3
| Field Name | Description | Type |
|------------|-------------|------|
| `f1_27[0]` | Line 2 - Eligibility rules explanation | Text |
| `c1_7[0]` | Line 2 - Yes | Checkbox |
| `c1_7[1]` | Line 2 - No | Checkbox |
| `c1_8[0]` | Line 3 - Yes | Checkbox |
| `c1_8[1]` | Line 3 - No | Checkbox |

### Part II - Questions 4-5
| Field Name | Description | Type |
|------------|-------------|------|
| `c1_9[0]` | Line 4 - Yes | Checkbox |
| `c1_9[1]` | Line 4 - No | Checkbox |
| `c1_10[0]` | Line 5 - Yes | Checkbox |
| `c1_10[1]` | Line 5 - No | Checkbox |

### Signature Section
| Field Name | Description | Type |
|------------|-------------|------|
| `f1_28[0]` | Date | Text |
| `f1_29[0]` | Name and title | Text |
| `f1_30[0]` | Preparer name | Text |
| `f1_31[0]` | Preparer signature | Text |
| `f1_32[0]` | Preparer date | Text |
| `f1_33[0]` | Firm name | Text |

## Page 2 - Part II Information (Lines 6-13)

### Line 6 - Under Examination
| Field Name | Description | Type |
|------------|-------------|------|
| `c2_1[0]` | Line 6a - Yes | Checkbox |
| `c2_1[1]` | Line 6a - No | Checkbox |
| `c2_2[0]` | Line 6b - Yes | Checkbox |
| `c2_2[1]` | Line 6b - No | Checkbox |
| `f2_1[0]` | Line 6c - Name | Text |
| `f2_2[0]` | Line 6c - Telephone | Text |
| `f2_3[0]` | Line 6c - Tax years | Text |
| `c2_3[0]` | Line 6d - Yes | Checkbox |
| `c2_3[1]` | Line 6d - No | Checkbox |

### Line 7 - Audit Protection
| Field Name | Description | Type |
|------------|-------------|------|
| `c2_4[0]` | Line 7a - Yes | Checkbox |
| `c2_4[1]` | Line 7a - No | Checkbox |
| `c2_5[0]` | Line 7b - Not under exam | Checkbox |
| `c2_5[1]` | Line 7b - Method not before director | Checkbox |
| `c2_5[2]` | Line 7b - Audit protection at end of exam | Checkbox |
| `c2_5[3]` | Line 7b - 3-month window | Checkbox |
| `c2_5[4]` | Line 7b - Negative adjustment | Checkbox |
| `c2_5[5]` | Line 7b - Other | Checkbox |
| `c2_5[6]` | Line 7b - 120 day | Checkbox |
| `f2_4[0]` | Line 7b - 120 day date | Text |
| `c2_5[7]` | Line 7b - CAP | Checkbox |
| `f2_5[0]` | Line 7b - CAP date | Text |

### Line 8 - Before Appeals/Federal Court
| Field Name | Description | Type |
|------------|-------------|------|
| `c2_6[0]` | Line 8a - Yes | Checkbox |
| `c2_6[1]` | Line 8a - No | Checkbox |
| `c2_10[0]` | Line 8b - Yes | Checkbox |
| `c2_10[1]` | Line 8b - No | Checkbox |
| `c2_7[0]` | Line 8c - Appeals officer checkbox | Checkbox |
| `c2_8[0]` | Line 8c - Counsel checkbox | Checkbox |
| `f2_6[0]` | Line 8c - Name | Text |
| `f2_7[0]` | Line 8c - Telephone | Text |
| `f2_8[0]` | Line 8c - Tax years | Text |
| `c2_9[0]` | Line 8d - Yes | Checkbox |
| `c2_9[1]` | Line 8d - No | Checkbox |

### Lines 10-13
| Field Name | Description | Type |
|------------|-------------|------|
| `c2_11[0]` | Line 10 - Yes | Checkbox |
| `c2_11[1]` | Line 10 - No | Checkbox |
| `c2_12[0]` | Line 11a - Yes | Checkbox |
| `c2_12[1]` | Line 11a - No | Checkbox |
| `c2_13[0]` | Line 12 - Yes | Checkbox |
| `c2_13[1]` | Line 12 - No | Checkbox |
| `c2_14[0]` | Line 13 - Yes | Checkbox |
| `c2_14[1]` | Line 13 - No | Checkbox |

## Page 3 - Part II (Lines 17-19) & Part III

### Line 17-19
| Field Name | Description | Type |
|------------|-------------|------|
| `c3_1[0]` | Line 17 - Yes | Checkbox |
| `c3_1[1]` | Line 17 - No | Checkbox |
| `c3_2[0]` | Line 18 - Yes | Checkbox |
| `c3_2[1]` | Line 18 - No | Checkbox |

### Line 19a - Gross Receipts
| Field Name | Description | Type |
|------------|-------------|------|
| `f3_1[0]` | 1st preceding year - Month | Text |
| `f3_2[0]` | 1st preceding year - Year | Text |
| `f3_3[0]` | 1st preceding year - Amount | Text |
| `f3_4[0]` | 2nd preceding year - Month | Text |
| `f3_5[0]` | 2nd preceding year - Year | Text |
| `f3_6[0]` | 2nd preceding year - Amount | Text |
| `f3_7[0]` | 3rd preceding year - Month | Text |
| `f3_8[0]` | 3rd preceding year - Year | Text |
| `f3_9[0]` | 3rd preceding year - Amount | Text |

### Line 19b - Long-term Contracts
| Field Name | Description | Type |
|------------|-------------|------|
| `f3_10[0]` | 4th preceding year - Month | Text |
| `f3_11[0]` | 4th preceding year - Year | Text |
| `f3_12[0]` | 4th preceding year - Amount | Text |

### Part III - Non-Automatic Change
| Field Name | Description | Type |
|------------|-------------|------|
| `c3_3[0]` | Line 20 - Yes | Checkbox |
| `c3_3[1]` | Line 20 - No | Checkbox |
| `c3_4[0]` | Line 23 - Yes | Checkbox |
| `c3_4[1]` | Line 23 - No | Checkbox |
| `f3_13[0]` | Line 24a - User fee amount | Text |

## Page 4 - Part IV & Schedule A

### Part IV - Section 481(a) Adjustment
| Field Name | Description | Type |
|------------|-------------|------|
| `c4_0[0]` | Line 25 - Yes | Checkbox |
| `c4_0[1]` | Line 25 - No | Checkbox |
| `f4_1[0]` | Line 26 - Section 481(a) adjustment amount | Text |
| `f4_2[0]` | Line 27 - Prior adjustment amount | Text |
| `c4_1[0]` | Line 27 - Yes | Checkbox |
| `c4_1[1]` | Line 27 - No | Checkbox |
| `c4_2[0]` | Line 28 - $50,000 de minimis election | Checkbox |
| `c4_2[1]` | Line 28 - Eligible acquisition transaction | Checkbox |
| `c4_3[0]` | Line 29 - Yes | Checkbox |
| `c4_3[1]` | Line 29 - No | Checkbox |

### Schedule A - Part I - Change in Overall Method
| Field Name | Description | Type |
|------------|-------------|------|
| `c4_4[0]` | Present method - Cash | Checkbox |
| `c4_4[1]` | Present method - Accrual | Checkbox |
| `c4_5[0]` | Present method - Hybrid | Checkbox |
| `c4_5[1]` | Proposed method - Cash | Checkbox |
| `c4_5[2]` | Proposed method - Accrual | Checkbox |
| `c4_6[0]` | Proposed method - Hybrid | Checkbox |
| `c4_6[1]` | Line 3 - Recurring item exception - Yes | Checkbox |
| `c4_6[2]` | Line 3 - Recurring item exception - No | Checkbox |

### Schedule A - Line 2 - Amounts
| Field Name | Description | Type |
|------------|-------------|------|
| `f4_3[0]` | Line 2a - Income accrued | Text |
| `f4_4[0]` | Line 2b - Income received | Text |
| `f4_5[0]` | Line 2c - Expenses accrued | Text |
| `f4_6[0]` | Line 2d - Prepaid expenses | Text |
| `f4_7[0]` | Line 2e - Supplies on hand | Text |
| `f4_8[0]` | Line 2f - Inventory on hand | Text |
| `f4_9[0]` | Line 2g - Other amounts | Text |
| `f4_10[0]` | Line 2h - Net section 481(a) | Text |

### Schedule A - Part I - Line 5
| Field Name | Description | Type |
|------------|-------------|------|
| `c4_7[0]` | Line 5 - Yes | Checkbox |
| `c4_7[1]` | Line 5 - No | Checkbox |

### Schedule A - Part II
| Field Name | Description | Type |
|------------|-------------|------|
| `f4_11[0]` | Part II description field | Text |

## Page 5 - Schedules B & C

*Note: Page 5 does not contain fillable form fields in this version.*

## Page 6 - Schedule D

### Part I - Long-term Contracts
| Field Name | Description | Type |
|------------|-------------|------|
| `c6_1[0]` | Line 2a - Yes | Checkbox |
| `c6_1[1]` | Line 2a - No | Checkbox |
| `c6_2[0]` | Line 2b - Yes | Checkbox |
| `c6_2[1]` | Line 2b - No | Checkbox |
| `c6_3[0]` | Line 2c - Yes | Checkbox |
| `c6_3[1]` | Line 2c - No | Checkbox |
| `c6_4[0]` | Line 2d - Yes | Checkbox |
| `c6_4[1]` | Line 2d - No | Checkbox |
| `c6_5[0]` | Line 2e - Yes | Checkbox |
| `c6_5[1]` | Line 2e - No | Checkbox |
| `c6_6[0]` | Line 3a - Yes | Checkbox |
| `c6_6[1]` | Line 3a - No | Checkbox |
| `c6_7[0]` | Line 4a - Yes | Checkbox |
| `c6_7[1]` | Line 4a - No | Checkbox |
| `c6_8[0]` | Line 4b - Yes | Checkbox |
| `c6_8[1]` | Line 4b - No | Checkbox |

### Part II - Valuing Inventories
| Field Name | Description | Type |
|------------|-------------|------|
| `c6_9[0]` | Line 3a - Yes | Checkbox |
| `c6_9[1]` | Line 3a - No | Checkbox |
| `c6_10[0]` | Line 3b - Yes | Checkbox |
| `c6_10[1]` | Line 3b - No | Checkbox |

### Part II - Line 4a - Inventory Methods Table
**Present Method Column:**
| Field Name | Description | Type |
|------------|-------------|------|
| `c6_11[0]` | Specific identification - Present | Checkbox |
| `c6_14[0]` | FIFO - Present | Checkbox |
| `c6_17[0]` | LIFO - Present | Checkbox |
| `c6_20[0]` | Other identification - Present | Checkbox |
| `c6_23[0]` | Cost - Present | Checkbox |
| `c6_26[0]` | Cost or market - Present | Checkbox |
| `c6_29[0]` | Retail cost - Present | Checkbox |
| `c6_32[0]` | Retail, lower of cost or market - Present | Checkbox |
| `c6_35[0]` | Other valuation - Present | Checkbox |

**Proposed Method Column:**
| Field Name | Description | Type |
|------------|-------------|------|
| `c6_12[0]` | Specific identification - Proposed | Checkbox |
| `c6_15[0]` | FIFO - Proposed | Checkbox |
| `c6_18[0]` | LIFO - Proposed | Checkbox |
| `c6_21[0]` | Other identification - Proposed | Checkbox |
| `c6_24[0]` | Cost - Proposed | Checkbox |
| `c6_27[0]` | Cost or market - Proposed | Checkbox |
| `c6_30[0]` | Retail cost - Proposed | Checkbox |
| `c6_33[0]` | Retail, lower of cost or market - Proposed | Checkbox |
| `c6_36[0]` | Other valuation - Proposed | Checkbox |

**Method Not Being Changed Column:**
| Field Name | Description | Type |
|------------|-------------|------|
| `c6_13[0]` | Specific identification - Not changed | Checkbox |
| `c6_16[0]` | FIFO - Not changed | Checkbox |
| `c6_19[0]` | LIFO - Not changed | Checkbox |
| `c6_22[0]` | Other identification - Not changed | Checkbox |
| `c6_25[0]` | Cost - Not changed | Checkbox |
| `c6_28[0]` | Cost or market - Not changed | Checkbox |
| `c6_31[0]` | Retail cost - Not changed | Checkbox |
| `c6_34[0]` | Retail, lower of cost or market - Not changed | Checkbox |
| `c6_37[0]` | Other valuation - Not changed | Checkbox |

### Part II - Line 4b & Line 6
| Field Name | Description | Type |
|------------|-------------|------|
| `f6_1[0]` | Line 4b - Value (Method being changed) | Text |
| `f6_2[0]` | Line 4b - Value (Method not being changed) | Text |
| `c6_11[0]` | Line 6 - Yes | Checkbox |
| `c6_11[1]` | Line 6 - No | Checkbox |

## Page 7 - Part III Section B - Direct and Indirect Costs

### Cost Allocation Table (28 rows)
Each row has two fields: Present Method and Proposed Method

| Field Name | Description | Type |
|------------|-------------|------|
| `f7_1[0]` | Row 1 - Direct material - Present | Text |
| `f7_2[0]` | Row 1 - Direct material - Proposed | Text |
| `f7_3[0]` | Row 2 - Direct labor - Present | Text |
| `f7_4[0]` | Row 2 - Direct labor - Proposed | Text |
| `f7_5[0]` | Row 3 - Indirect labor - Present | Text |
| `f7_6[0]` | Row 3 - Indirect labor - Proposed | Text |
| `f7_7[0]` | Row 4 - Officers' compensation - Present | Text |
| `f7_8[0]` | Row 4 - Officers' compensation - Proposed | Text |
| `f7_9[0]` | Row 5 - Pension and related costs - Present | Text |
| `f7_10[0]` | Row 5 - Pension and related costs - Proposed | Text |
| `f7_11[0]` | Row 6 - Employee benefits - Present | Text |
| `f7_12[0]` | Row 6 - Employee benefits - Proposed | Text |
| `f7_13[0]` | Row 7 - Indirect materials/supplies - Present | Text |
| `f7_14[0]` | Row 7 - Indirect materials/supplies - Proposed | Text |
| `f7_15[0]` | Row 8 - Purchasing costs - Present | Text |
| `f7_16[0]` | Row 8 - Purchasing costs - Proposed | Text |
| `f7_17[0]` | Row 9 - Handling/processing costs - Present | Text |
| `f7_18[0]` | Row 9 - Handling/processing costs - Proposed | Text |
| `f7_19[0]` | Row 10 - Offsite storage - Present | Text |
| `f7_20[0]` | Row 10 - Offsite storage - Proposed | Text |
| `f7_21[0]` | Row 11 - Depreciation/amortization - Present | Text |
| `f7_22[0]` | Row 11 - Depreciation/amortization - Proposed | Text |
| `f7_23[0]` | Row 12 - Depletion - Present | Text |
| `f7_24[0]` | Row 12 - Depletion - Proposed | Text |
| `f7_25[0]` | Row 13 - Rent - Present | Text |
| `f7_26[0]` | Row 13 - Rent - Proposed | Text |
| `f7_27[0]` | Row 14 - Taxes - Present | Text |
| `f7_28[0]` | Row 14 - Taxes - Proposed | Text |
| `f7_29[0]` | Row 15 - Insurance - Present | Text |
| `f7_30[0]` | Row 15 - Insurance - Proposed | Text |
| `f7_31[0]` | Row 16 - Utilities - Present | Text |
| `f7_32[0]` | Row 16 - Utilities - Proposed | Text |
| `f7_33[0]` | Row 17 - Maintenance/repairs - Present | Text |
| `f7_34[0]` | Row 17 - Maintenance/repairs - Proposed | Text |
| `f7_35[0]` | Row 18 - Engineering/design - Present | Text |
| `f7_36[0]` | Row 18 - Engineering/design - Proposed | Text |
| `f7_37[0]` | Row 19 - Rework/scrap/spoilage - Present | Text |
| `f7_38[0]` | Row 19 - Rework/scrap/spoilage - Proposed | Text |
| `f7_39[0]` | Row 20 - Tools and equipment - Present | Text |
| `f7_40[0]` | Row 20 - Tools and equipment - Proposed | Text |
| `f7_41[0]` | Row 21 - Quality control - Present | Text |
| `f7_42[0]` | Row 21 - Quality control - Proposed | Text |
| `f7_43[0]` | Row 22 - Bidding expenses - Present | Text |
| `f7_44[0]` | Row 22 - Bidding expenses - Proposed | Text |
| `f7_45[0]` | Row 23 - Licensing/franchise - Present | Text |
| `f7_46[0]` | Row 23 - Licensing/franchise - Proposed | Text |
| `f7_47[0]` | Row 24 - Service costs - Present | Text |
| `f7_48[0]` | Row 24 - Service costs - Proposed | Text |
| `f7_49[0]` | Row 25 - Administrative costs - Present | Text |
| `f7_50[0]` | Row 25 - Administrative costs - Proposed | Text |
| `f7_51[0]` | Row 26 - Research/experimental - Present | Text |
| `f7_52[0]` | Row 26 - Research/experimental - Proposed | Text |
| `f7_53[0]` | Row 27 - Interest - Present | Text |
| `f7_54[0]` | Row 27 - Interest - Proposed | Text |
| `f7_55[0]` | Row 28 - Other costs - Present | Text |
| `f7_56[0]` | Row 28 - Other costs - Proposed | Text |

## Page 8 - Part III Section C & Schedule E

### Section C - Other Costs Not Required (11 rows)
| Field Name | Description | Type |
|------------|-------------|------|
| `f8_1[0]` | Row 1 - Marketing/selling - Present | Text |
| `f8_2[0]` | Row 1 - Marketing/selling - Proposed | Text |
| `f8_3[0]` | Row 2 - Research/experimental - Present | Text |
| `f8_4[0]` | Row 2 - Research/experimental - Proposed | Text |
| `f8_5[0]` | Row 3 - Bidding expenses - Present | Text |
| `f8_6[0]` | Row 3 - Bidding expenses - Proposed | Text |
| `f8_7[0]` | Row 4 - General/admin costs - Present | Text |
| `f8_8[0]` | Row 4 - General/admin costs - Proposed | Text |
| `f8_9[0]` | Row 5 - Income taxes - Present | Text |
| `f8_10[0]` | Row 5 - Income taxes - Proposed | Text |
| `f8_11[0]` | Row 6 - Cost of strikes - Present | Text |
| `f8_12[0]` | Row 6 - Cost of strikes - Proposed | Text |
| `f8_13[0]` | Row 7 - Warranty/product liability - Present | Text |
| `f8_14[0]` | Row 7 - Warranty/product liability - Proposed | Text |
| `f8_15[0]` | Row 8 - Section 179 costs - Present | Text |
| `f8_16[0]` | Row 8 - Section 179 costs - Proposed | Text |
| `f8_17[0]` | Row 9 - On-site storage - Present | Text |
| `f8_18[0]` | Row 9 - On-site storage - Proposed | Text |
| `f8_19[0]` | Row 10 - Depreciation - Present | Text |
| `f8_20[0]` | Row 10 - Depreciation - Proposed | Text |
| `f8_21[0]` | Row 11 - Other costs - Present | Text |
| `f8_22[0]` | Row 11 - Other costs - Proposed | Text |

### Schedule E - Depreciation/Amortization
| Field Name | Description | Type |
|------------|-------------|------|
| `c8_1[0]` | Line 1 - Yes | Checkbox |
| `c8_1[1]` | Line 1 - No | Checkbox |
| `c8_2[0]` | Line 2 - Yes | Checkbox |
| `c8_2[1]` | Line 2 - No | Checkbox |
| `f8_23[0]` | Line 2 - Applicable section | Text |
| `c8_3[0]` | Line 3 - Yes | Checkbox |
| `c8_3[1]` | Line 3 - No | Checkbox |
| `f8_24[0]` | Line 3 - Election made | Text |
| `c8_4[0]` | Line 4b - Yes | Checkbox |
| `c8_4[1]` | Line 4b - No | Checkbox |
| `c8_5[0]` | Line 4c - Yes | Checkbox |
| `c8_5[1]` | Line 4c - No | Checkbox |

## Field Type Legend

- **/Tx**: Text field (single-line or multi-line input)
- **/Btn**: Button field (typically used for checkboxes with /Off or /Yes values)

## Notes for Programming

1. **Full Path Required**: When programmatically filling fields, use the full path (e.g., `topmostSubform[0].Page1[0].f1_1[0]`)

2. **Checkbox Values**: Checkboxes use `/Off` (unchecked) or `/Yes` (checked) as values

3. **Read-Only Flags**: Fields with flag `8388608` or `8392704` may have special properties. Test behavior when filling.

4. **Array Notation**: The `[0]`, `[1]` notation indicates multiple fields with the same base name (common for Yes/No checkboxes)

5. **Missing Pages**: Page 5 is not represented in the field list (likely contains static content only)

6. **Container Fields**: Fields marked as "Unknown" type are typically container elements (subforms, rows) and don't need direct values

## Python Example for Field Population

```python
from pypdf import PdfReader, PdfWriter

def fill_form_3115(input_pdf, output_pdf, field_data):
    """
    Fill Form 3115 with provided data
    
    Args:
        input_pdf: Path to blank Form 3115
        output_pdf: Path for filled form
        field_data: Dict with field names as keys and values to fill
    """
    reader = PdfReader(input_pdf)
    writer = PdfWriter()
    
    # Add all pages
    for page in reader.pages:
        writer.add_page(page)
    
    # Fill form fields
    writer.update_page_form_field_values(
        writer.pages[0],  # Page reference
        field_data
    )
    
    # Write output
    with open(output_pdf, 'wb') as output_file:
        writer.write(output_file)

# Example usage
data = {
    'topmostSubform[0].Page1[0].f1_1[0]': 'ABC Company Inc',
    'topmostSubform[0].Page1[0].f1_2[0]': '123 Main Street',
    'topmostSubform[0].Page1[0].f1_3[0]': 'New York, NY 10001',
    'topmostSubform[0].Page1[0].f1_4[0]': '12-3456789',
    'topmostSubform[0].Page1[0].c1_4[1]': '/Yes',  # Corporation checkbox
}

fill_form_3115('f3115.pdf', 'f3115_filled.pdf', data)
```

## Total Field Count

- **Total fillable fields**: 354
- **Text fields**: ~160
- **Checkbox fields**: ~194
- **Container fields**: ~50

---

*Generated from Form 3115 (Rev. December 2022)*
