---
layout: page
title: CV
permalink: /cv/
description: My experience
---

<strong><a href="/assets/docs/cv-fe-developer-kiril-abaskin.pdf">cv-fe-developer-kiril-abaskin.pdf</a></strong>

<br />

<div class="jobs">
    {% for company in site.data.cv.companies %}

        <div class="job">
                <div class="info">
                    <a href="{{company.url}}" rel="follow">{% asset {{company.logo}} width="100" alt={{company.title}} %}</a>
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
