import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateFilingPdf } from "@/lib/pdf/generator";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // Standard Next.js 15+ params type
) {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await context.params;

        const filing = await db.filing.findUnique({
            where: {
                id,
                client: {
                    userId: session.user.id
                }
            },
            include: {
                client: true
            }
        });

        if (!filing) {
            return NextResponse.json({ error: "Filing not found" }, { status: 404 });
        }

        const pdfBytes = await generateFilingPdf(filing);

        const filename = `Form3115_${filing.client.name.replace(/[^a-zA-Z0-9]/g, '_')}_${filing.taxYearOfChange}.pdf`;

        return new NextResponse(Buffer.from(pdfBytes), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': pdfBytes.length.toString(),
            },
        });

    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
