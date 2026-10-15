---
name: novel-editor
description: "Add Novel, the open-source Notion-style rich text editor with AI autocomplete, to a React or Next.js app: setup, slash commands, bubble menu, image upload, AI writing actions (continue, improve, fix grammar, shorter, longer, custom command), saving as JSON, HTML or Markdown, and Tailwind styling. Includes the full official example app and library source. Use when building a SaaS, dashboard, CMS, content tool or admin panel that needs a Notion-like editor, when the user mentions Novel, novel.sh or a Tiptap editor, or wants AI writing help inside an editor."
license: Apache-2.0
---

# Novel Editor

Novel (novel.sh) is a Notion-style editor for React, built on Tiptap, with an AI menu for writing help. This skill helps add it to a project correctly.

## What is in this skill

| Path | What it is |
|---|---|
| `references/example-app/` | The full official Next.js demo. The main file is `components/tailwind/advanced-editor.tsx`. |
| `references/example-app/components/tailwind/extensions.ts` | Which editor features are turned on and how they are configured |
| `references/example-app/components/tailwind/slash-command.tsx` | The "/" menu items (Send Feedback, Text, To-do List, Heading 1 to 3, Bullet List, Numbered List, Quote, Code, Image, YouTube, Twitter) |
| `references/example-app/components/tailwind/selectors/` | Bubble menu parts: node type, link, colour, text buttons, maths |
| `references/example-app/components/tailwind/generative/` | The AI menu (Improve, Fix grammar, Make shorter, Make longer, Continue, custom command) |
| `references/example-app/app/api/generate/route.ts` | Server route that sends text to the AI model and streams the answer, with the exact prompts |
| `references/example-app/app/api/upload/route.ts` | Image upload route (Vercel Blob) |
| `references/example-app/components/tailwind/image-upload.ts` | Client side upload (images only, 20 MB max) |
| `references/example-app/styles/prosemirror.css` | Editor styling (placeholder, task lists, images, drag handle) |
| `references/example-app/.env.example` | Environment variables the demo expects |
| `references/library-source/` | Source of the `novel` npm package, to check what each export does |

Read the example files instead of guessing the API. Copy and adapt them.

## Requirements

- React 18 or newer. The example uses Next.js (App Router) with Tailwind CSS and shadcn/ui style components.
- npm package: `novel` (the library). It bundles Tiptap v2 extensions.
- For the AI menu: an AI provider key, set only on the server.
- For image upload: a storage service (the demo uses Vercel Blob).

Check the current `novel` version on npm before installing. The source here is a snapshot from January 2025.

## Setup steps

1. **Install:** `npm install novel` plus what the copied components import (see `references/example-app/package.json`, for example `cmdk`, `lucide-react`, `@radix-ui/*`, `tailwind-merge`, `use-debounce`, `highlight.js`, `sonner`).
2. **Copy the editor folder:** `components/tailwind/` from the example into the project. Keep the folder together; the files import each other.
3. **Add styles:** import `styles/prosemirror.css`, and add `@tailwindcss/typography` (the editor uses `prose` classes). Match the colour tokens in `styles/globals.css` and `tailwind.config.ts` to the project's own design.
4. **Render the editor** in a client component (`"use client"`). `EditorRoot` wraps everything; `EditorContent` takes `initialContent`, `extensions` and `onUpdate`.
5. **Saving:** in `onUpdate`, read `editor.getJSON()` (best for saving and reloading), `editor.getHTML()` (for publishing) or `editor.storage.markdown.getMarkdown()` (for Markdown). Debounce saves. The demo saves to `localStorage`; a real app should save to its own database through an API route.
6. **AI menu (optional):** copy `app/api/generate/route.ts`. It reads `{ prompt, option, command }` and returns a streamed answer. Options: `continue`, `improve`, `shorter`, `longer`, `fix`, `zap` (custom command).
7. **Image upload (optional):** copy `app/api/upload/route.ts` and `image-upload.ts`, or point `uploadFn` at the project's own storage. Keep the size and file-type checks.

## AI provider

The demo uses OpenAI through the Vercel AI SDK (`@ai-sdk/openai`, `streamText`). To use another provider, swap the provider package and model in `route.ts` (for example the AI SDK's Anthropic provider) and keep the same prompts and streaming response. Check the provider's current model names in its docs instead of copying old ones.

## Safety rules

- API keys and storage tokens go in server environment variables only. Never put them in client code or commit them.
- Keep rate limiting on the AI route for any public app. The demo limits each IP to 50 requests a day when Vercel KV variables are set; use the project's own store if it is not on Vercel.
- Validate uploads on the server too (type and size), not only in the browser.
- If saved HTML is shown to other users, sanitise it before rendering.

## Common changes

- **Add or remove slash menu items:** edit `suggestionItems` in `slash-command.tsx`. Remove "Send Feedback" unless the project has a `/feedback` page; it opens that route in a new tab.
- **Change the placeholder text:** `Placeholder` configuration in the library's `extensions/index.ts` (override it in the project's `extensions.ts`).
- **Turn features off** (YouTube, Twitter, maths, code highlighting): remove them from `defaultExtensions` and from the slash menu.
- **Read-only view:** render saved JSON with `EditorContent` and the prop `editable={false}` (EditorContent passes extra props to Tiptap's `EditorProvider`), or render saved HTML.

## Source

Novel by Steven Tey (github.com/steven-tey/novel), Apache 2.0 licence. Docs: novel.sh/docs.
