
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { FIELD_MAPPING } from './mapping';
import { type Filing, type Client } from '@prisma/client';

type FullFiling = Filing & {
    client: Client;
};

export async function generateFilingPdf(filing: FullFiling): Promise<Uint8Array> {
    const formPath = path.join(process.cwd(), 'public', 'f3115.pdf');
    const pdfBytes = fs.readFileSync(formPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    // Remove XFA data to force viewers to use the AcroForm fields we populate
    // This fixes issues where Adobe Reader ignores our filled data
    try {
        const formAny = form as any;
        if (typeof formAny.deleteXFA === 'function') {
            formAny.deleteXFA();
        } else if (typeof formAny.deleteXfa === 'function') {
            formAny.deleteXfa();
        } else {
            console.warn('Could not find deleteXFA method on PDFForm');
        }
    } catch (e) {
        console.warn('Could not delete XFA data:', e);
    }

    // Helper to safely set field
    const setField = (fieldName: string, value: string | undefined | null) => {
        if (!value) return;
        try {
            const field = form.getTextField(fieldName);
            if (field) {
                field.setText(value);
            }
        } catch (e) {
            console.warn(`Field ${fieldName} not found or not a text field`, e);
        }
    };

    // Parse Part I Data
    let partIData: any = {};
    if (filing.partI) {
        try {
            partIData = JSON.parse(filing.partI);
        } catch (e) {
            console.error('Error parsing Part I JSON', e);
        }
    }

    // Map Part I Fields
    // Map Part I Fields
    if (FIELD_MAPPING.partI) {
        setField(FIELD_MAPPING.partI.filerName, partIData.filerName || filing.client.name);
        setField(FIELD_MAPPING.partI.filerEin, partIData.filerEin || filing.client.ein);
        setField(FIELD_MAPPING.partI.filerAddress, partIData.filerAddress || filing.client.address);

        // Combine City, State, ZIP
        const city = partIData.filerCity || filing.client.city || "";
        const state = partIData.filerState || filing.client.state || "";
        const zip = partIData.filerZip || filing.client.zipCode || "";
        const cityStateZip = [city, state, zip].filter(Boolean).join(", ");
        setField(FIELD_MAPPING.partI.filerCityStateZip, cityStateZip);

        setField(FIELD_MAPPING.partI.contactName, partIData.contactName || filing.client.contactName);
        setField(FIELD_MAPPING.partI.contactPhone, partIData.contactPhone || filing.client.contactPhone);
        setField(FIELD_MAPPING.partI.taxYearBegin, partIData.taxYearBegin);
        setField(FIELD_MAPPING.partI.taxYearEnd, partIData.taxYearEnd || filing.client.taxYearEnd);

        setField(FIELD_MAPPING.partI.principalBusinessCode, partIData.principalBusinessCode);

        // nameOfApplicant is usually blank if same as filer
        setField(FIELD_MAPPING.partI.nameOfApplicant, "");
    }

    // Helper to safely set checkbox
    const setCheckBox = (fieldName: string, value: boolean) => {
        if (!fieldName) return;
        try {
            const field = form.getCheckBox(fieldName);
            if (field) {
                if (value) field.check();
                else field.uncheck();
            }
        } catch (e) {
            console.warn(`Field ${fieldName} not found or not a checkbox`);
        }
    };

    // Parse Part II Data
    let partIIData: any = {};
    if (filing.partII) {
        try {
            partIIData = JSON.parse(filing.partII);
        } catch (e) {
            console.error('Error parsing Part II JSON', e);
        }
    }

    // Map Part II Fields
    if (FIELD_MAPPING.partII) {
        setField(FIELD_MAPPING.partII.dcn, partIIData.dcn);
        setField(FIELD_MAPPING.partII.description, partIIData.description);
        // Handle "automatic change" checkbox if we mapped it (not yet mapped in FIELD_MAPPING but logical)
    }

    // Parse Part III Data
    let partIIIData: any = {};
    if (filing.partIII) {
        try {
            partIIIData = JSON.parse(filing.partIII);
        } catch (e) {
            console.error('Error parsing Part III JSON', e);
        }
    }

    if (FIELD_MAPPING.partIII) {
        if (partIIIData.priorMethodChange === "yes") {
            setCheckBox(FIELD_MAPPING.partIII.priorMethodChangeYes, true);
        } else if (partIIIData.priorMethodChange === "no") {
            setCheckBox(FIELD_MAPPING.partIII.priorMethodChangeNo, true);
        }

        // Consolidated group
        if (partIIIData.consolidatedGroup === "yes") {
            setCheckBox(FIELD_MAPPING.partIII.consolidatedGroupYes, true);
        } else if (partIIIData.consolidatedGroup === "no") {
            setCheckBox(FIELD_MAPPING.partIII.consolidatedGroupNo, true);
        }

        // Transaction Adjustment
        if (partIIIData.transactionAdjustment === "yes") {
            setCheckBox(FIELD_MAPPING.partIII.transactionAdjustmentYes, true);
        } else if (partIIIData.transactionAdjustment === "no") {
            setCheckBox(FIELD_MAPPING.partIII.transactionAdjustmentNo, true);
        }
    }

    // Parse Part IV Data (Section 481(a))
    let partIVData: any = {};
    if (filing.partIV) {
        try {
            partIVData = JSON.parse(filing.partIV);
        } catch (e) {
            console.error('Error parsing Part IV JSON', e);
        }
    }

    // Map Part IV Fields
    if (FIELD_MAPPING.partIV) {
        if (partIVData.yearOfChange) {
            setField(FIELD_MAPPING.partIV.yearOfChange, partIVData.yearOfChange.toString());
        }
        if (partIVData.totalAdjustment) {
            setField(FIELD_MAPPING.partIV.totalAdjustment, partIVData.totalAdjustment.toString());
        }

        // Spread Period Checkboxes
        if (partIVData.spreadPeriod) {
            const spread = Number(partIVData.spreadPeriod);
            if (spread === 1) {
                setCheckBox(FIELD_MAPPING.partIV.spreadPeriod1Year, true);
            } else if (spread === 4) {
                setCheckBox(FIELD_MAPPING.partIV.spreadPeriod4Year, true);
            }
        }
    }

    // Parse Schedule A Data
    let scheduleAData: any = {};
    if (filing.scheduleA) {
        try {
            scheduleAData = JSON.parse(filing.scheduleA);
        } catch (e) {
            console.error('Error parsing Schedule A JSON', e);
        }
    }

    if (FIELD_MAPPING.scheduleA) {
        // Line 2a: Income accrued but not received
        setField(FIELD_MAPPING.scheduleA.incomeAccrued, scheduleAData.incomeAccrued);

        // Line 3: Gross Receipts
        setField(FIELD_MAPPING.scheduleA.grossReceiptsAmount, scheduleAData.averageGrossReceipts);

        // Present Method
        if (scheduleAData.currentOverallMethod === 'cash') {
            setCheckBox(FIELD_MAPPING.scheduleA.presentMethodCash, true);
        } else if (scheduleAData.currentOverallMethod === 'accrual') {
            setCheckBox(FIELD_MAPPING.scheduleA.presentMethodAccrual, true);
        }

        // Proposed Method
        if (scheduleAData.proposedOverallMethod === 'cash') {
            setCheckBox(FIELD_MAPPING.scheduleA.proposedMethodCash, true);
        } else if (scheduleAData.proposedOverallMethod === 'accrual') {
            setCheckBox(FIELD_MAPPING.scheduleA.proposedMethodAccrual, true);
        }
    }

    return pdfDoc.save();
}
