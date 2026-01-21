declare module "html2pdf.js" {
    interface Html2PdfOptions {
        margin?: number | [number, number, number, number];
        filename?: string;
        image?: { type?: "jpeg" | "png" | "webp"; quality?: number };
        html2canvas?: {
            scale?: number;
            useCORS?: boolean;
            logging?: boolean;
            letterRendering?: boolean;
        };
        jsPDF?: {
            unit?: "pt" | "mm" | "cm" | "in";
            format?: string | [number, number];
            orientation?: "portrait" | "landscape";
        };
        pagebreak?: { mode?: string | string[] };
    }

    interface Html2PdfInstance {
        set(options: Html2PdfOptions): Html2PdfInstance;
        from(element: HTMLElement | string): Html2PdfInstance;
        save(): Promise<void>;
        outputPdf(type?: string): Promise<unknown>;
    }

    function html2pdf(): Html2PdfInstance;
}
