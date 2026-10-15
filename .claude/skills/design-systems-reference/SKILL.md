---
name: design-systems-reference
description: "Catalog of 151 public design systems, UI libraries and pattern libraries (Material, Carbon, Polaris, GOV.UK, NHS, Atlassian, Ant Design, Spectrum, Mailchimp voice guide and more), with links, what each one offers and where its source code lives. Use when picking a reference or inspiration for a website, landing page, app screen or component, when looking up how a well-known design system handles buttons, forms, booking flows, colors, spacing or writing tone, when comparing design systems, or when the user asks which design system or UI library to follow."
license: Unlicense
---

# Design Systems Reference

A lookup skill. It points to how established teams already solved a design problem, so new work can borrow proven patterns instead of guessing.

The full list lives in `references/catalog.md`: 151 entries with website, and whether each one has coded components, voice and tone guidance, a design kit (Figma/Sketch) and public source code. Read it when you need to choose or cite a system. Do not load it for unrelated tasks.

## When to use

- The user wants a design, page, section or component and a proven reference would make it better.
- The user asks "how does X design system do Y", "which design system should I follow", or wants inspiration for buttons, forms, cards, navigation, booking flows, pricing tables, error messages, colors, spacing or typography.
- The user wants writing guidance for interface text (button labels, error messages, empty states). Use the systems marked Voice & Tone = Yes.
- The user is choosing a UI library for a coded project. Use the systems marked Components = Yes and Source code present.

## Workflow

1. **Understand the job.** What is being built (service page, booking form, dashboard, app screen), for which industry and audience, and on which stack if it is code.
2. **Shortlist 2 to 4 systems** from `references/catalog.md` that match the job. Use the starting points below, then scan the catalog for closer matches (same industry, same kind of product).
3. **Read the real guidance.** Fetch the relevant page of each shortlisted system's website (for example its "Button", "Forms" or "Content" page). The catalog only says what exists; the advice lives on the sites. If a link is dead or redirects, search for the system's current site.
4. **Apply, do not copy.** Take the pattern and the reasoning (hierarchy, spacing rhythm, states, accessibility rules, wording rules) and fit it to the client's own brand colors, fonts and voice. Never reuse another company's logo, brand colors, illustrations, icons or name.
5. **Cite briefly.** When a recommendation comes from a system, name it and give its link so the user can check it.

## Starting points by need

These are common, well-documented picks. All are in the catalog.

| Need | Look at first |
|---|---|
| Forms, booking and checkout flows that people must finish | GOV.UK Design System, U.S. Web Design Standards, Shopify Polaris |
| Healthcare and patient-facing services | NHS.UK Service Manual, GOV.UK Design System |
| Travel and booking products | Backpack (Skyscanner) |
| Clean, general-purpose web and app UI | Google Material Design, IBM Carbon, Adobe Spectrum |
| Dashboards, admin panels, data-heavy screens | IBM Carbon, AWS Cloudscape, Atlassian Design System, Alibaba Ant Design, Elastic UI Framework |
| E-commerce and merchant tools | Shopify Polaris |
| Interface writing: tone, labels, error messages | Mailchimp Content Styleguide, Shopify Polaris, GOV.UK Design System, Atlassian Design System |
| Accessibility done properly | GOV.UK Design System, U.S. Web Design Standards, Adobe Spectrum |
| React component libraries for coded projects | Radix, Chakra UI, Uber's Base Web, Fluent UI, Alibaba Ant Design |
| Tailwind-based projects | daisyUI |

## Rules

- A system having public source code does not mean the code is free to reuse. Check its license before copying any code.
- Prefer the pattern that fits the client's audience over the most famous system. A local service business needs clarity and trust signals more than an enterprise dashboard look.
- When two systems disagree, explain the trade-off in one line and pick the one that suits this audience.
- Keep the final design original to the client. The reference shapes the decisions; it should not be recognisable in the result.

## Source

Catalog based on github.com/alexpate/awesome-design-systems (public domain). Snapshot taken October 2026; some entries may have moved or closed since.
