---
name: html5-boilerplate
description: "HTML5 Boilerplate starter template: a clean, production-ready base for a plain HTML website or landing page with index.html, 404.html, CSS, JS, favicon and icons, web manifest, robots.txt, editorconfig and optional webpack build, plus documentation on every part. Use when starting a new static HTML site or landing page from scratch, when a client page needs a solid HTML head and base setup, or when asked what a correct HTML document setup looks like."
license: MIT
---

# HTML5 Boilerplate

A ready starter project lives in `assets/template/`. Documentation for every part lives in `references/`.

## Template files (`assets/template/`)

| File | Purpose |
|---|---|
| `index.html` | Base page: doctype, `lang`, charset, viewport, title, description, Open Graph, favicons, manifest, theme colour |
| `404.html` | Simple not-found page |
| `css/style.css` | Base styles and helper classes (visually hidden, print styles) |
| `js/app.js` | Empty app script |
| `favicon.ico`, `icon.svg`, `icon.png` | Default icons to replace with the client's own |
| `site.webmanifest` | Web app manifest |
| `robots.txt` | Default robots file |
| `.editorconfig`, `.gitignore`, `.gitattributes` | Editor and git settings |
| `package.json`, `webpack.*.js` | Optional build setup (dev server and production build) |

## Workflow

1. Copy the whole `assets/template/` folder into the new project folder.
2. Fill in `index.html` for the client: `lang`, title, meta description, Open Graph tags (title, description, image, url), theme colour, and real favicon and icon files.
3. Update `site.webmanifest` (name, short name, colours, icons) and `robots.txt` (add the sitemap URL; never leave a staging `Disallow: /` on a live site).
4. Build the page content inside `<body>` and styles in `css/style.css`.
5. Use the webpack setup only if the project needs a build step. A plain landing page can skip `package.json` and the webpack files.
6. Before launch, run the `front-end-checklist` skill's launch checklist on the result.

## Docs (`references/`)

`usage.md` (getting started), `html.md` (every head tag explained), `css.md`, `js.md`, `extend.md` (extra tags and features you can add), `misc.md`, `faq.md`, `TOC.md`.

## Source

HTML5 Boilerplate (github.com/h5bp/html5-boilerplate), MIT licence. Snapshot September 2026.
