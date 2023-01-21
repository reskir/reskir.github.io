---
layout: page
title: CV
permalink: /cv/
description: My experience
---

<div class="jobs">
    {% for company in site.data.cv.companies %}

        <div class="job">
                <div class="info">
                    {% asset {{company.logo}} width="100" alt={{company.title}} %}
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
                                        <span class="text-secondary">client</span> <b><a href="{{project.client.url}}">{{project.client.title}}</a></b>
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
