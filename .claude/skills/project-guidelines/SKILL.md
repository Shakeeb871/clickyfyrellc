---
name: project-guidelines
description: "Practical guidelines for running a JavaScript or web development project well: git rules and workflow, commit messages, documentation and README, environments and .env handling, dependencies, testing, folder structure and naming, code style and linting, logging, REST API design, API security, API documentation, accessibility and licensing. Use when setting up a new code project, writing a project README, reviewing how a codebase or team works, designing or reviewing an API, or writing team rules for developers."
license: MIT
---

# Project Guidelines

The full guide is in `references/guidelines.md`. A README template is in `references/readme-template.md`. Two config examples are in `references/config.sample.js` (load settings from environment variables) and `references/configWithTest.sample.js` (validate them with joi before the app starts).

## Sections in the guide

1. Git: rules, workflow (feature branches, pull requests, rebasing), good commit messages
2. Documentation: README and docs that stay current
3. Environments: consistent dev environments, `.env` files, never committing secrets
4. Dependencies: tracking, updating and auditing packages
5. Testing: test environments, what and how to test
6. Structure and naming: folder layout by feature, file naming
7. Code style: style rules and enforcing them with linters and formatters
8. Logging: what to log and how
9. API: design (resources, verbs, status codes, versioning, pagination), security, documentation
10. Accessibility: basic rules to put in place
11. Licensing

## Workflow

- **New project:** use the guide to set up git rules, `.env` handling, linting, folder structure and a README (start from `readme-template.md`).
- **Reviewing a project or team setup:** check the codebase against the relevant sections and list what is missing, most important first (secrets in git and missing tests are more urgent than naming style).
- **API work:** read section 9 before designing endpoints or reviewing an existing API.
- Adapt the advice to the project's real stack. The guide is written with JavaScript and Node in mind; for PHP or WordPress projects, apply the principles, not the exact tools.
- Recommend changes; do not apply them to the user's code unless asked.

## Source

Project Guidelines by Elsewhen (github.com/elsewhencode/project-guidelines), MIT licence. Last updated December 2024.
