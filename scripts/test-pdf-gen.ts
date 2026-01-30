
import { generateFilingPdf } from '../src/lib/pdf/generator';
import fs from 'fs';
import path from 'path';

// Mock data
const mockFiling: any = {
    id: 'test-id',
    clientId: 'test-client',
    status: 'DRAFT',
    createdAt: new Date(),
    updatedAt: new Date(),
    partI: JSON.stringify({
        filerName: 'Test Company LLC',
        filerEin: '12-3456789',
        filerAddress: '123 Test St',
        filerCity: 'Testville',
        filerState: 'TX',
        filerZip: '12345',
        contactName: 'John Doe',
        contactPhone: '555-0123'
    }),
    partII: JSON.stringify({
        dcn: '123',
        description: 'Test Method Change'
    }),
    partIII: JSON.stringify({
        priorMethodChange: 'no',
        consolidatedGroup: 'no'
    }),
    partIV: JSON.stringify({
        yearOfChange: 2024,
        totalAdjustment: 50000,
        spreadPeriod: 4
    }),
    scheduleA: JSON.stringify({
        currentOverallMethod: 'cash',
        proposedOverallMethod: 'accrual',
        incomeAccrued: '1000'
    }),
    client: {
        id: 'test-client',
        name: 'Test Company LLC',
        ein: '12-3456789',
        address: '123 Test St',
        city: 'Testville',
        state: 'TX',
        zipCode: '12345',
        contactName: 'John Doe',
        contactPhone: '555-0123',
        taxYearEnd: '12/31',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user-1'
    }
};

async function test() {
    console.log('Generating PDF...');
    try {
        const pdfBytes = await generateFilingPdf(mockFiling);
        const outputPath = path.join(process.cwd(), 'test-output.pdf');
        fs.writeFileSync(outputPath, pdfBytes);
        console.log(`Success! PDF written to ${outputPath}`);
    } catch (e) {
        console.error('Error generating PDF:', e);
        process.exit(1);
    }
}

test();
