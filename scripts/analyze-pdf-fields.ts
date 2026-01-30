
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function analyzePdf() {
    const pdfPath = path.join(process.cwd(), 'public', 'f3115.pdf');
    if (!fs.existsSync(pdfPath)) {
        console.error('PDF file not found at:', pdfPath);
        return;
    }

    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();


    const output = fields.map(field => {
        const name = field.getName();
        const type = field.constructor.name;
        return `${name} (${type})`;
    }).join('\n');

    fs.writeFileSync(path.join(process.cwd(), 'pdf_fields_dump.txt'), output);
    console.log('Wrote fields to pdf_fields_dump.txt');
}

analyzePdf().catch(console.error);
