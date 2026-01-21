import html2pdf from "html2pdf.js";

function exportCV(): void {
    const element = document.querySelector(".jobs") as HTMLElement | null;
    if (!element) return;

    // Expand all details elements before export
    const details = element.querySelectorAll("details");
    details.forEach((d) => d.setAttribute("open", ""));

    const opt = {
        margin: 12,
        filename: "cv-kiril-abaskin.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
            unit: "mm" as const,
            format: "a4",
            orientation: "portrait" as const,
        },
    };

    html2pdf().set(opt).from(element).save();
}

document.getElementById("export-cv-btn")?.addEventListener("click", exportCV);
