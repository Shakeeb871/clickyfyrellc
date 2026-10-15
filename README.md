# Clicky Fyre website

Static website built on the **Agenci** creative agency HTML template (Bootstrap 5, GSAP, Swiper, AOS).
No build step: upload the files to any web host and open `index.html`.

## What was added to make the template work

| Feature | Files | Notes |
|---|---|---|
| Working forms (contact, blog comment, newsletter) | `assets/js/forms.js`, `contact.php` | Validation, spam honeypot, sending and success/error messages. The template only faked a "success" toast. |
| Site search | `search.html`, `assets/js/search.js`, `assets/js/search-index.js` | The header search now shows real results. |
| Social links | `assets/js/site.js` | Every social icon uses the URLs in `site-config.js`. |
| "Scroll down" link | `assets/js/site.js` | Scrolls to the next section. |
| Offline icons | `assets/vendor/phosphor/` | Phosphor icons are bundled instead of loaded from unpkg. |
| 404 page and server settings | `404.html`, `.htaccess` | For Apache/cPanel hosting. |

## Setup before going live

1. **`assets/js/site-config.js`**: set `contactEmail` and the `social` profile URLs.
2. **`contact.php`**: set `$TO_EMAIL`, the address that receives form messages.
3. **Hosting:**
   - **PHP host (cPanel, Hostinger, etc.):** works as is. `contact.php` sends the email.
   - **Static host (GitHub Pages, Netlify, Vercel):** PHP does not run there. Set `formEndpoint` in `site-config.js` to a form service such as Formspree (`https://formspree.io/f/<id>`).
   - **If the endpoint cannot be reached:** the form opens the visitor's email app with the message already filled in.
4. **Content:** replace the demo text, phone numbers, addresses, images and the "Agenci" logo in `assets/images/logo/`.

## Run locally

```bash
php -S localhost:8000          # forms work too
# or
python3 -m http.server 8000    # forms fall back to the email app
```

## After editing pages

Rebuild the search index so search reflects the new content:

```bash
python3 tools/build-search-index.py
```

## Structure

```
index*.html, about.html, ...   template pages (index.html = main home page; index-2..9, -dark, -white = alternative home layouts)
search.html, 404.html          added pages
contact.php                    form endpoint
assets/css, js, images, fonts  template assets (+ forms.js, site.js, search.js, site-config.js)
assets/sass                    SCSS sources of main.css
documentation/                 original template documentation
tools/                         helper scripts
.claude/skills/                Claude Code development skills
```
