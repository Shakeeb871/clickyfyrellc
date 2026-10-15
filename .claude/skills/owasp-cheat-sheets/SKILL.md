---
name: owasp-cheat-sheets
description: "All 137 OWASP Cheat Sheets: concise, expert security guidance for web apps, APIs, WordPress-style plugins and AI features, covering authentication, passwords, sessions, input validation, XSS, SQL injection, CSRF, file upload, access control, cookies, security headers, CSP, secrets, logging, payments, REST and GraphQL, Node.js, PHP, Docker and AI agents. Use when building or reviewing a login, form, booking system, plugin, API or any code that handles user data, when checking a site for security problems, or when asked how to do something securely."
license: CC BY-SA 4.0
---

# OWASP Cheat Sheets

`references/index.md` lists all 137 cheat sheets with a one-line summary. The sheets themselves are in `references/cheatsheets/`. Open only the ones you need.

`references/maps/` maps the sheets to OWASP standards: `IndexTopTen.md` (OWASP Top 10 risks), `IndexASVS.md` and `IndexASVS4.md` (Application Security Verification Standard 5 and 4), `IndexProactiveControls.md` (Proactive Controls), `IndexMASVS.md` (mobile apps), and `Index.md` (the official alphabetical index). Use them when a client or audit asks about a specific standard, for example "is this site covered for the OWASP Top 10".

The original diagrams and images from the sheets are not included (about 21 MB). The text explains every point; if a sheet refers to a figure, link the user to the sheet on cheatsheetseries.owasp.org.

## Most used sheets

| Topic | File |
|---|---|
| Login and authentication | `Authentication_Cheat_Sheet.md`, `Password_Storage_Cheat_Sheet.md`, `Multifactor_Authentication_Cheat_Sheet.md` |
| Sessions and cookies | `Session_Management_Cheat_Sheet.md` |
| Forms and user input | `Input_Validation_Cheat_Sheet.md` |
| XSS | `Cross_Site_Scripting_Prevention_Cheat_Sheet.md`, `DOM_based_XSS_Prevention_Cheat_Sheet.md` |
| SQL injection | `SQL_Injection_Prevention_Cheat_Sheet.md`, `Query_Parameterization_Cheat_Sheet.md` |
| CSRF | `Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.md` |
| File uploads | `File_Upload_Cheat_Sheet.md` |
| Who can do what | `Authorization_Cheat_Sheet.md`, `Access_Control_Cheat_Sheet.md` |
| Security headers | `HTTP_Headers_Cheat_Sheet.md`, `Content_Security_Policy_Cheat_Sheet.md` |
| Secrets and API keys | `Secrets_Management_Cheat_Sheet.md` |
| APIs | `REST_Security_Cheat_Sheet.md`, `GraphQL_Cheat_Sheet.md` |
| Logging | `Logging_Cheat_Sheet.md` |
| PHP | `PHP_Configuration_Cheat_Sheet.md` |
| AI features and agents | `AI_Agent_Security_Cheat_Sheet.md`, `LLM_Prompt_Injection_Prevention_Cheat_Sheet.md` |

If a file named above is not present, search `references/index.md` for the topic; sheet names change between versions.

## Workflow

1. Identify what the code or feature does (login, booking form, file upload, payment, API, admin panel).
2. Open the matching sheets from the table or the index.
3. **Review:** compare the code against the sheet. Report each real problem with the location, the risk in plain words, how it could be abused, and the fix from the sheet. Most serious first. Do not report theoretical issues the code does not show.
4. **Build:** follow the sheet's recommended approach from the start and say which sheet the design follows.
5. Do not change the user's code or live site unless asked, and never test attacks against a site the user does not own.

## Licence

OWASP Cheat Sheet Series (github.com/OWASP/CheatSheetSeries), Creative Commons Attribution-ShareAlike 4.0. When quoting or adapting a sheet in material you share, credit OWASP and keep the same licence.
