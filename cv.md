---
layout: page
title: CV
permalink: /cv/
description: My experience
---

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

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
const element = document.getElementById('cv');
const button = document.getElementById('export-cv-btn');
const opt = {
    margin: 12,
    filename: "cv-kiril-abaskin.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
    },
};
button.addEventListener('click', () => {
    const details = element.querySelectorAll("details");
    details.forEach((d) => d.setAttribute("open", ""));
    html2pdf().set(opt).from(element).save();
});
</script>
