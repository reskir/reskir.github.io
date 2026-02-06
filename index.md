---
layout: home
exclude: true
description: Hello, I am Kiril Abaskin, software developer from Lithuania, Vilnius
---

<h2>I am a software developer with experience in constructing fully typed frontend and backend applications. I have developed a range of applications for industries such as e-commerce, finance, and advertising.</h2>

<div class="about">
  <div class="image">
  {% asset me2.jpg width="300" alt="Kiril Abaskin - software engineer" %}
  </div>
</div>

<p class="text-secondary">

If you have any further questions or if there's anything else I can assist you with, feel free to let me know.
Contact me by <a href="mailto:kiril.abashkin@gmail.com">email</a> or find me on
<a href="https://www.linkedin.com/in/kirilab/"><span class="username">LinkedIn</span></a>

</p>

<p>
  <a href="/about">More information on my skills and experience</a>
</p>

{% assign github = site.data.github-status %}

<h4>Latest build of this webpage</h4>
<div>
  <div style="display: flex; flex-direction: row; align-items: center; gap: 12px;">
    <a href="{{github.pusher.html_url}}">
        <img
            style="border-radius: 50%;"
            src="{{github.pusher.avatar_url}}"
            width="50"
        />
    </a>
    <div style="display: flex; flex-direction: column; gap: 2px;">
    {% if github.status == "built" %}
        <div>
            Status: <strong>{{ github.status }}</strong> ✅ by <a href="{{ github.pusher.html_url }}">{{ github.pusher.login }}</a>
        </div>
    {% endif %}
    <div>
     Created at: <strong>{{ github.created_at | date: "%Y-%m-%d %H:%M:%S" }}</strong>
     </div>
    </div>
    </div>
</div>
