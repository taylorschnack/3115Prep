"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { downloadFilingPdf } from "@/lib/actions/filings"
import { toast } from "sonner"

interface DownloadPdfButtonProps {
    filingId: string
    variant?: "default" | "outline" | "secondary" | "ghost"
    size?: "default" | "sm" | "lg" | "icon"
}

export function DownloadPdfButton({ filingId, variant = "outline", size = "default" }: DownloadPdfButtonProps) {
    const [downloading, setDownloading] = useState(false)

    async function handleDownload() {
        try {
            setDownloading(true)
            const response = await fetch(`/api/filings/${filingId}/pdf`);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to download PDF");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Extract filename from Content-Disposition header if available
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = "form-3115.pdf";
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }

            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success("PDF downloaded successfully");

        } catch (error) {
            console.error(error)
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
        } finally {
            setDownloading(false)
        }
    }

    return (
        <Button variant={variant} size={size} onClick={handleDownload} disabled={downloading}>
            <Download className="mr-2 h-4 w-4" />
            {downloading ? "Generating..." : "Download PDF"}
        </Button>
    )
}
