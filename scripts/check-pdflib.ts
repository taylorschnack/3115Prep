
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function check() {
    const pdfPath = path.join(process.cwd(), 'public', 'f3115.pdf');
    if (!fs.existsSync(pdfPath)) {
        console.log('PDF not found, creating dummy');
        const doc = await PDFDocument.create();
        const form = doc.getForm();
        console.log('Has deleteXfa:', typeof (form as any).deleteXfa);
        console.log('Has deleteXFA:', typeof (form as any).deleteXFA);
        return;
    }
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    console.log('Has deleteXfa:', typeof (form as any).deleteXfa);
    console.log('Has deleteXFA:', typeof (form as any).deleteXFA);
}
check();
