// CV PDF Export functionality
// Requires jsPDF to be loaded first

function initCvExport(cvData) {
    const button = document.getElementById('export-cv-btn');
    if (!button) return;

    button.addEventListener('click', async () => {
        button.disabled = true;
        button.textContent = 'Generating...';

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            });

            // Load Source Sans 3 TTF fonts
            let hasCustomFont = false;
            const loadedFonts = new Set();
            const ttfFonts = {
                'SourceSans3-Regular': '/assets/fonts/ttf/SourceSans3-Regular.ttf',
                'SourceSans3-Bold': '/assets/fonts/ttf/SourceSans3-Bold.ttf',
                'SourceSans3-SemiBold': '/assets/fonts/ttf/SourceSans3-SemiBold.ttf',
                'SourceSans3-Light': '/assets/fonts/ttf/SourceSans3-Light.ttf'
            };

            for (const [fontName, url] of Object.entries(ttfFonts)) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
                    const arrayBuffer = await response.arrayBuffer();
                    const bytes = new Uint8Array(arrayBuffer);
                    let binary = '';
                    for (let i = 0; i < bytes.length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    const base64 = btoa(binary);
                    doc.addFileToVFS(`${fontName}.ttf`, base64);
                    doc.addFont(`${fontName}.ttf`, fontName, 'normal');
                    loadedFonts.add(fontName);
                } catch (e) {
                    console.warn(`Font ${fontName} not available:`, e.message);
                }
            }

            hasCustomFont = loadedFonts.has('SourceSans3-Regular');

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Generous margins for more "air"
            const margin = 20;
            const contentWidth = pageWidth - margin * 2;
            let y = margin;

            // Site colors: brand #62a388, text #343434, secondary #828282
            const colors = {
                primary: [52, 52, 52],      // #343434 - main text
                secondary: [130, 130, 130], // #828282 - grey
                brand: [98, 163, 136]       // #62a388 - green accent
            };

            // Spacing constants for consistent "air"
            const spacing = {
                sectionGap: 10,
                itemGap: 6,
                lineHeight: 5,
                paragraphGap: 3
            };

            function setFont(weight) {
                if (hasCustomFont) {
                    const fontMap = {
                        'bold': 'SourceSans3-Bold',
                        'semibold': 'SourceSans3-SemiBold',
                        'light': 'SourceSans3-Light',
                        'normal': 'SourceSans3-Regular',
                        'medium': 'SourceSans3-SemiBold'
                    };
                    let fontName = fontMap[weight] || 'SourceSans3-Regular';
                    if (!loadedFonts.has(fontName)) {
                        fontName = 'SourceSans3-Regular';
                    }
                    if (loadedFonts.has(fontName)) {
                        try {
                            doc.setFont(fontName, 'normal');
                            return;
                        } catch (e) {
                            console.warn(`Failed to set font ${fontName}:`, e);
                        }
                    }
                }
                doc.setFont('helvetica', weight === 'bold' ? 'bold' : 'normal');
            }

            function checkPageBreak(requiredSpace) {
                if (y + requiredSpace > pageHeight - margin) {
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

            // ============ HEADER ============
            doc.setFontSize(28);
            setFont('bold');
            doc.setTextColor(...colors.primary);
            doc.text('Kiril Abaskin', margin, y);
            y += 10;

            doc.setFontSize(14);
            setFont('normal');
            doc.setTextColor(...colors.brand);
            doc.text('Senior Frontend Developer', margin, y);
            y += 8;

            // Contact info
            doc.setFontSize(10);
            setFont('normal');
            doc.setTextColor(...colors.secondary);
            const contact = `${cvData.contact.email}  •  ${cvData.contact.linkedin}  •  ${cvData.contact.github}`;
            doc.text(contact, margin, y);
            y += spacing.sectionGap + 4;

            // Accent line
            doc.setDrawColor(...colors.brand);
            doc.setLineWidth(0.8);
            doc.line(margin, y, margin + 40, y);
            y += spacing.sectionGap;

            // ============ PROFESSIONAL SUMMARY ============
            doc.setFontSize(12);
            setFont('semibold');
            doc.setTextColor(...colors.primary);
            doc.text('PROFESSIONAL SUMMARY', margin, y);
            y += spacing.itemGap;

            doc.setFontSize(10);
            setFont('normal');
            doc.setTextColor(...colors.secondary);
            const summaryLines = wrapText(cvData.summary, contentWidth, 10);
            summaryLines.forEach(line => {
                doc.text(line, margin, y);
                y += spacing.lineHeight;
            });
            y += spacing.sectionGap;

            // ============ TECHNICAL SKILLS ============
            doc.setFontSize(12);
            setFont('semibold');
            doc.setTextColor(...colors.primary);
            doc.text('TECHNICAL SKILLS', margin, y);
            y += spacing.itemGap;

            doc.setFontSize(10);
            Object.entries(cvData.skills).forEach(([category, skills]) => {
                checkPageBreak(8);
                setFont('semibold');
                doc.setTextColor(...colors.primary);
                doc.text(`${category}:`, margin, y);

                setFont('normal');
                doc.setTextColor(...colors.secondary);
                const categoryWidth = doc.getTextWidth(`${category}: `);
                doc.text(skills, margin + categoryWidth + 1, y);
                y += spacing.lineHeight + 1;
            });
            y += spacing.sectionGap;

            // ============ WORK EXPERIENCE ============
            doc.setFontSize(12);
            setFont('semibold');
            doc.setTextColor(...colors.primary);
            doc.text('WORK EXPERIENCE', margin, y);
            y += spacing.sectionGap;

            // Companies
            cvData.companies.forEach((company, companyIndex) => {
                checkPageBreak(35);

                // Company name with brand color accent
                doc.setFontSize(14);
                setFont('bold');
                doc.setTextColor(...colors.brand);
                doc.text(company.title, margin, y);

                // Years aligned right
                doc.setFontSize(10);
                setFont('normal');
                doc.setTextColor(...colors.secondary);
                const yearsWidth = doc.getTextWidth(company.years);
                doc.text(company.years, pageWidth - margin - yearsWidth, y);
                y += spacing.itemGap + 2;

                // Projects
                company.projects.forEach((project) => {
                    checkPageBreak(30);

                    // Project title
                    doc.setFontSize(11);
                    setFont('semibold');
                    doc.setTextColor(...colors.primary);
                    doc.text(project.title, margin, y);
                    y += spacing.lineHeight + 1;

                    // Description
                    doc.setFontSize(10);
                    setFont('normal');
                    doc.setTextColor(...colors.secondary);
                    const descLines = wrapText(project.description, contentWidth, 10);
                    descLines.forEach(line => {
                        checkPageBreak(6);
                        doc.text(line, margin, y);
                        y += spacing.lineHeight;
                    });
                    y += spacing.paragraphGap;

                    // Achievements
                    if (project.achievements && project.achievements.length > 0) {
                        project.achievements.forEach(achievement => {
                            checkPageBreak(8);
                            doc.setTextColor(...colors.secondary);

                            // Green bullet point
                            doc.setFillColor(...colors.brand);
                            doc.circle(margin + 2, y - 1.2, 0.8, 'F');

                            const achieveLines = wrapText(achievement, contentWidth - 10, 10);
                            achieveLines.forEach((line, i) => {
                                if (i > 0) checkPageBreak(6);
                                doc.text(line, margin + 6, y);
                                y += spacing.lineHeight;
                            });
                        });
                        y += spacing.paragraphGap;
                    }

                    // Tools - styled as a tag-like element
                    checkPageBreak(10);
                    doc.setFontSize(9);
                    setFont('normal');
                    doc.setTextColor(...colors.brand);
                    const toolsLines = wrapText(project.tools, contentWidth, 9);
                    toolsLines.forEach(line => {
                        checkPageBreak(5);
                        doc.text(line, margin, y);
                        y += spacing.lineHeight - 1;
                    });
                    y += spacing.paragraphGap;
                });

                // Divider between companies
                if (companyIndex < cvData.companies.length - 1) {
                    y += spacing.paragraphGap;
                    doc.setDrawColor(220, 220, 220);
                    doc.setLineWidth(0.2);
                    doc.line(margin, y, pageWidth - margin, y);
                    y += spacing.itemGap;
                }
            });

            doc.save('cv-kiril-abaskin.pdf');
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            button.disabled = false;
            button.textContent = 'Export to PDF';
        }
    });
}

// Export for use
if (typeof window !== 'undefined') {
    window.initCvExport = initCvExport;
}
