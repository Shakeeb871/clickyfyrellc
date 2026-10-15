---
name: front-end-performance-checklist
description: "40-point front-end performance checklist with priorities (high, medium, low) across HTML, CSS, fonts, images, JavaScript, server, frameworks (React, Angular, Vue) and WordPress, plus a list of speed testing tools. Use when a site or landing page is slow, when improving PageSpeed or Core Web Vitals, when optimising images, fonts, CSS or JavaScript, when tuning a WordPress site for speed, or when doing a performance review before launch."
license: MIT
---

# Front-End Performance Checklist

The full checklist is in `references/checklist.md`. Each item is a checkbox with a bold title, a priority (high, medium or low) and a short explanation, often with how-to links and tools.

Sections: How to use and testing tools, HTML, CSS, Fonts, Images, JavaScript, Server, Frameworks (Angular, React, Vue), CMS (WordPress).

## Workflow

1. **Measure first.** Get real numbers before suggesting changes: run or ask for a PageSpeed Insights / Lighthouse / WebPageTest result for the page (mobile first). Note LCP, INP, CLS, page weight and number of requests.
2. **Read the relevant sections** of `references/checklist.md` for what the measurements point to (for example big images point to the Images section, render-blocking resources point to CSS and JavaScript).
3. **Go through the items in priority order:** high first, then medium, then low. Mark each as pass, fail or not checkable from what you can see.
4. **Report** failed items with: the item title, the evidence (file, URL, size, metric), the fix, and the expected gain. Put the biggest wins first.
5. **Do not change the site yourself** unless the user asks for the fix.

## Notes

- For WordPress sites, also check the CMS section: caching, image compression and plugin bloat often matter more than code-level tweaks.
- Some links in the list are old (last updated March 2025). Recommend tools by their current official website and check they still exist.
- The `front-end-checklist` skill has 43 deeper performance rules if a single item needs more detail.

## Source

Front-End Performance Checklist by David Dias (github.com/thedaviddias/Front-End-Performance-Checklist), MIT licence.
