// CV PDF Export functionality
// Requires jsPDF to be loaded first

function initCvExport(cvData) {
    const button = document.getElementById("export-cv-btn");
    if (!button) return;

    button.addEventListener("click", async () => {
        button.disabled = true;
        button.textContent = "Generating...";

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            });

            // Load Source Sans 3 TTF fonts
            let hasCustomFont = false;
            const loadedFonts = new Set();
            const ttfFonts = {
                "SourceSans3-Regular":
                    "/assets/fonts/ttf/SourceSans3-Regular.ttf",
                "SourceSans3-Bold": "/assets/fonts/ttf/SourceSans3-Bold.ttf",
                "SourceSans3-SemiBold":
                    "/assets/fonts/ttf/SourceSans3-SemiBold.ttf",
                "SourceSans3-Light": "/assets/fonts/ttf/SourceSans3-Light.ttf",
            };

            for (const [fontName, url] of Object.entries(ttfFonts)) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
                    const arrayBuffer = await response.arrayBuffer();
                    const bytes = new Uint8Array(arrayBuffer);
                    let binary = "";
                    for (let i = 0; i < bytes.length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    const base64 = btoa(binary);
                    doc.addFileToVFS(`${fontName}.ttf`, base64);
                    doc.addFont(`${fontName}.ttf`, fontName, "normal");
                    loadedFonts.add(fontName);
                } catch (e) {
                    console.warn(`Font ${fontName} not available:`, e.message);
                }
            }

            hasCustomFont = loadedFonts.has("SourceSans3-Regular");

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            const margin = 20;
            const contentWidth = pageWidth - margin * 2;
            let y = margin;

            // Colors - clean black/grey palette
            const colors = {
                black: [0, 0, 0],
                dark: [51, 51, 51],
                grey: [102, 102, 102],
                lightGrey: [153, 153, 153],
            };

            // Spacing
            const sp = {
                section: 8,
                item: 4,
                line: 4.5,
            };

            function setFont(weight) {
                if (hasCustomFont) {
                    const fontMap = {
                        bold: "SourceSans3-Bold",
                        semibold: "SourceSans3-SemiBold",
                        normal: "SourceSans3-Regular",
                        light: "SourceSans3-Light",
                    };
                    let fontName = fontMap[weight] || "SourceSans3-Regular";
                    if (!loadedFonts.has(fontName))
                        fontName = "SourceSans3-Regular";
                    if (loadedFonts.has(fontName)) {
                        try {
                            doc.setFont(fontName, "normal");
                            return;
                        } catch (e) {}
                    }
                }
                doc.setFont("helvetica", weight === "bold" ? "bold" : "normal");
            }

            function checkPageBreak(space) {
                if (y + space > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                    return true;
                }
                return false;
            }

            function wrapText(text, maxWidth, fontSize) {
                doc.setFontSize(fontSize);
                return doc.splitTextToSize(text, maxWidth);
            }

            // ============ HEADER - Two Column Layout ============
            const headerLeftWidth = 90;
            const headerRightX = margin + headerLeftWidth + 10;

            // Left side - Name and title
            doc.setFontSize(28);
            setFont("bold");
            doc.setTextColor(...colors.black);
            doc.text("KIRIL ABASKIN", margin, y + 2);

            doc.setFontSize(11);
            setFont("normal");
            doc.setTextColor(...colors.grey);
            doc.text("Senior Frontend Developer", margin, y + 10);

            // Right side - Contact Info
            doc.setFontSize(9);
            setFont("semibold");
            doc.setTextColor(...colors.dark);
            doc.text("INFO", headerRightX, y - 2);

            // Line under INFO
            doc.setDrawColor(...colors.dark);
            doc.setLineWidth(0.3);
            doc.line(headerRightX, y, pageWidth - margin, y);

            // Contact details in two columns
            const col1X = headerRightX;
            const col2X = headerRightX + 45;
            let infoY = y + 5;

            doc.setFontSize(9);
            setFont("semibold");
            doc.setTextColor(...colors.dark);
            doc.text("Email", col1X, infoY);
            doc.text("LinkedIn", col2X, infoY);
            infoY += 4;

            setFont("normal");
            doc.setTextColor(...colors.grey);
            doc.text(cvData.contact.email, col1X, infoY);
            doc.text(cvData.contact.linkedin, col2X, infoY);
            infoY += 6;

            setFont("semibold");
            doc.setTextColor(...colors.dark);
            doc.text("GitHub", col1X, infoY);
            infoY += 4;

            setFont("normal");
            doc.setTextColor(...colors.grey);
            doc.text(cvData.contact.github, col1X, infoY);

            y += 28;

            // Horizontal line
            doc.setDrawColor(...colors.dark);
            doc.setLineWidth(0.5);
            doc.line(margin, y, pageWidth - margin, y);
            y += sp.section + 4;

            // ============ SUMMARY ============
            if (cvData.summary) {
                doc.setFontSize(10);
                setFont("normal");
                doc.setTextColor(...colors.lightGrey);
                doc.text("SUMMARY", margin, y);
                y += sp.section;

                doc.setFontSize(10);
                setFont("normal");
                doc.setTextColor(...colors.dark);
                const summaryLines = wrapText(cvData.summary, contentWidth, 10);
                summaryLines.forEach((line) => {
                    checkPageBreak(5);
                    doc.text(line, margin, y);
                    y += sp.line;
                });
                y += sp.section;
            }

            // ============ WORK EXPERIENCE ============
            doc.setFontSize(10);
            setFont("normal");
            doc.setTextColor(...colors.lightGrey);
            doc.text("WORK EXPERIENCE", margin, y);
            y += sp.section;

            // Companies
            cvData.companies.forEach((company, companyIndex) => {
                checkPageBreak(25);

                // Project title (role) - Bold
                company.projects.forEach((project) => {
                    checkPageBreak(20);

                    doc.setFontSize(11);
                    setFont("bold");
                    doc.setTextColor(...colors.black);
                    doc.text(project.title, margin, y);
                    y += sp.line;

                    // Company name
                    doc.setFontSize(10);
                    setFont("normal");
                    doc.setTextColor(...colors.dark);
                    doc.text(company.title, margin, y);
                    y += sp.line;

                    // Date
                    doc.setFontSize(9);
                    doc.setTextColor(...colors.lightGrey);
                    doc.text(company.years, margin, y);
                    y += sp.section;

                    // Achievements as bullet points
                    if (
                        project.achievements &&
                        project.achievements.length > 0
                    ) {
                        doc.setFontSize(10);
                        setFont("normal");
                        doc.setTextColor(...colors.dark);

                        project.achievements.forEach((achievement) => {
                            checkPageBreak(8);
                            doc.text("•", margin + 2, y);
                            const lines = wrapText(
                                achievement,
                                contentWidth - 10,
                                10
                            );
                            lines.forEach((line, i) => {
                                if (i > 0) checkPageBreak(5);
                                doc.text(line, margin + 8, y);
                                y += sp.line;
                            });
                            y += 1;
                        });
                    } else if (project.description) {
                        // If no achievements, show description
                        doc.setFontSize(10);
                        setFont("normal");
                        doc.setTextColor(...colors.dark);
                        const descLines = wrapText(
                            project.description,
                            contentWidth,
                            10
                        );
                        descLines.forEach((line) => {
                            checkPageBreak(5);
                            doc.text(line, margin, y);
                            y += sp.line;
                        });
                    }

                    y += sp.item;
                });

                y += sp.item;
            });

            y += sp.section;

            // ============ KEY SKILLS ============
            checkPageBreak(20);
            doc.setFontSize(10);
            setFont("normal");
            doc.setTextColor(...colors.lightGrey);
            doc.text("KEY SKILLS", margin, y);
            y += sp.section;

            // Skills as comma-separated list
            doc.setFontSize(10);
            setFont("normal");
            doc.setTextColor(...colors.dark);

            const allSkills = Object.values(cvData.skills).join(", ");
            const skillLines = wrapText(allSkills, contentWidth, 10);
            skillLines.forEach((line) => {
                checkPageBreak(5);
                doc.text(line, margin, y);
                y += sp.line;
            });

            doc.save("cv-kiril-abaskin.pdf");
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            button.disabled = false;
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    <span>Export to PDF</span>`;
        }
    });
}

// Export for use
if (typeof window !== "undefined") {
    window.initCvExport = initCvExport;
}
