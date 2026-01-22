---
layout: page
title: CV
permalink: /cv/
description: My experience
---
<script defer src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
<button id="export-cv-btn" class="export-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    <span>Export to PDF</span>
</button>

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



{% asset cv-export.js %}
<script>
    const cvData = {{ site.data.cv | jsonify }};
    document.addEventListener('DOMContentLoaded', () => initCvExport(cvData));
</script>
