---
layout: post
title: 'How I use Jekyll'
description: My experience with jekyll blogging platform and github pages
date: 2018-12-29 09:15:15 +0300
updated: 2023-02-02 09:15:15 +0300
categories: blog
---

{% asset jekyll-logo.png width="150" %}

#### Perks of using Jekyll for your projects:

-   **No backend/databases** (yes, I consider this as a huge benefit, especially if you are just blogging)
-   **Static files**, all you need is html + css and sometimes some simple javascript logic (for slider f.ex.);
-   **Markdown** - it is easy to document and write posts
-   **Plugins** - jekyll has some awesome plugins for SEO, asset management and etc.
-   **Hosting** - it is easy to host, even github pages can host jekyll website

#### What packages and tools I am using

For my blogs I usually reuse the same plugins, the most useful I found are these:

```json
"jekyll-assets"
"jekyll-seo-tag"
"image_optim"
"image_optim_pack"
"mini_magick"
```

#### CI/CD

Since github is capable of serving jekyll websites it is quite easy to setup whole pipeline for testing, building and deploying your jekyll websites.

