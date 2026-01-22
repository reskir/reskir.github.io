---
layout: page
title: CV
permalink: /cv/
description: My experience
---
<script defer src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
<button id="export-cv-btn">Export to PDF</button>

<div class="jobs" id="cv">
    {% for company in site.data.cv.companies %}

        <div class="job">
                <div class="info">
                    <a href="{{company.url}}" rel="follow">{% asset {{company.logo}} width="120" alt={{company.title}} class="company-logo" %}</a>
                    <div class="text-secondary fontSize-small">{{company.years}}</div>
                </div>

                    {% for project in company.projects %}
                        <details class="project" open>
                            <summary class="summary">
                                <span class="title">{{project.title}}</span>
                            </summary>
                            <div class="details">
                                {% if project.client %}
                                    <div class="client">
                                        <span class="text-secondary">client <a rel="nofollow" href="{{project.client.url}}">{{project.client.title}}</a></span>
                                    </div>
                                {% endif %}
                                <p>{{project.description}}</p>
                                {% if project.achievements %}
                                    <ul>
                                        {% for achievement in project.achievements %}
                                            <li>{{achievement}}</li>
                                        {% endfor %}
                                    </ul>
                                {% endif %}
                                <p>Technologies and tools: <strong>{{project.tools}}</strong></p>
                            </div>
                        </details>
                    {% endfor %}
            </div>

    {% endfor %}

</div>



<script>
const cvData = {{ site.data.cv | jsonify }};

// Load TTF font as base64 for jsPDF
async function loadFontAsBase64(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

const button = document.getElementById('export-cv-btn');
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

        // Load Brandon Text TTF fonts if available
        let hasCustomFont = false;
        const ttfFonts = {
            'BrandonText-Regular': '/assets/fonts/ttf/BrandonText-Regular.ttf',
            // 'BrandonText-Bold': '/assets/fonts/ttf/BrandonText-Bold.ttf',
            // 'BrandonText-Medium': '/assets/fonts/ttf/BrandonText-Medium.ttf',
            // 'BrandonText-Light': '/assets/fonts/ttf/BrandonText-Light.ttf'
        };

        for (const [fontName, url] of Object.entries(ttfFonts)) {
            try {
                const base64 = await loadFontAsBase64(url);
                doc.addFileToVFS(`${fontName}.ttf`, base64);
                doc.addFont(`${fontName}.ttf`, fontName, 'normal');
                hasCustomFont = true;
            } catch (e) {
                // Font not available, will use fallback
            }
        }

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        const contentWidth = pageWidth - margin * 2;
        let y = margin;

        const colors = {
            primary: [51, 51, 51],
            secondary: [102, 102, 102],
            accent: [0, 102, 204]
        };

        function setFont(weight) {
            if (hasCustomFont) {
                const fontName = 'BrandonText-Regular';
                try {
                    doc.setFont(fontName, 'normal');
                    return;
                } catch (e) {
                    // Fallback to helvetica
                }
            }
            // Fallback: use helvetica
            const style = 'normal';
            doc.setFont('helvetica', style);
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
            const lines = doc.splitTextToSize(text, maxWidth);
            return lines;
        }

        // Header
        doc.setFontSize(24);
        setFont('bold');
        doc.setTextColor(...colors.primary);
        doc.text('Kiril Abaskin', margin, y);
        y += 8;

        doc.setFontSize(12);
        setFont('normal');
        doc.setTextColor(...colors.secondary);
        doc.text('Frontend Developer', margin, y);
        y += 12;

        // Divider
        doc.setDrawColor(...colors.accent);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;

        // Companies
        cvData.companies.forEach((company, companyIndex) => {
            checkPageBreak(30);

            // Company header
            doc.setFontSize(16);
            setFont('bold');
            doc.setTextColor(...colors.primary);
            doc.text(company.title, margin, y);

            doc.setFontSize(10);
            setFont('normal');
            doc.setTextColor(...colors.secondary);
            const yearsWidth = doc.getTextWidth(company.years);
            doc.text(company.years, pageWidth - margin - yearsWidth, y);
            y += 8;

            // Projects
            company.projects.forEach((project, projectIndex) => {
                checkPageBreak(25);

                // Project title
                doc.setFontSize(12);
                setFont('medium');
                doc.setTextColor(...colors.primary);
                doc.text(project.title, margin + 4, y);

                // Client (if exists)
                if (project.client) {
                    setFont('normal');
                    doc.setTextColor(...colors.accent);
                    const clientText = ` — ${project.client.title}`;
                    const titleWidth = doc.getTextWidth(project.title);
                    doc.text(clientText, margin + 4 + titleWidth, y);
                }
                y += 6;

                // Description
                doc.setFontSize(10);
                setFont('normal');
                doc.setTextColor(...colors.secondary);
                const descLines = wrapText(project.description, contentWidth - 8, 10);
                descLines.forEach(line => {
                    checkPageBreak(5);
                    doc.text(line, margin + 4, y);
                    y += 4.5;
                });
                y += 2;

                // Achievements
                if (project.achievements && project.achievements.length > 0) {
                    project.achievements.forEach(achievement => {
                        checkPageBreak(6);
                        doc.setTextColor(...colors.secondary);
                        doc.text('•', margin + 4, y);
                        const achieveLines = wrapText(achievement, contentWidth - 14, 10);
                        achieveLines.forEach((line, i) => {
                            if (i > 0) checkPageBreak(5);
                            doc.text(line, margin + 10, y);
                            y += 4.5;
                        });
                    });
                    y += 2;
                }

                // Tools
                checkPageBreak(8);
                doc.setFontSize(9);
                setFont('light');
                doc.setTextColor(...colors.accent);
                const toolsLines = wrapText(`Tools: ${project.tools}`, contentWidth - 8, 9);
                toolsLines.forEach(line => {
                    checkPageBreak(4);
                    doc.text(line, margin + 4, y);
                    y += 4;
                });
                y += 6;
            });

            // Space between companies
            if (companyIndex < cvData.companies.length - 1) {
                y += 4;
                doc.setDrawColor(220, 220, 220);
                doc.setLineWidth(0.2);
                doc.line(margin, y, pageWidth - margin, y);
                y += 8;
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
</script>
