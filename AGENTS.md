# AGENTS.md

## Project overview

This repository is a small personal finance dashboard built with plain HTML, CSS, and JavaScript. The app is designed to run as a static site and can operate in a demo mode without any backend setup, while also supporting optional Supabase integration.

Primary documentation:
- [README.md](README.md)
- [index.html](index.html)
- [script.js](script.js)
- [styles.css](styles.css)
- [supabase/schema.sql](supabase/schema.sql)

## How to work in this repo

- There is no bundler, framework, or test runner. Treat this as a static front-end project.
- Use a local static server for browser validation:

  ```bash
  python -m http.server 8000
  ```

- Open the app in the browser at http://localhost:8000.
- Prefer small, direct edits in the existing HTML/CSS/JS files rather than introducing new frameworks or build tooling.

## Architecture and conventions

### Front-end structure

- [index.html](index.html) contains the dashboard layout, auth UI, transaction form, and report panels.
- [styles.css](styles.css) holds the visual design and dashboard styling.
- [script.js](script.js) contains the app state, rendering logic, Supabase integration, demo data, and DOM event handlers.

### Data model and Supabase

- The app uses a default wallet ID and demo transactions in [script.js](script.js).
- The expected database schema is documented in [supabase/schema.sql](supabase/schema.sql).
- Core tables include `profiles`, `wallets`, and `transactions`.
- Supabase configuration is centralized in the `appConfig` object at the top of [script.js](script.js).
- Keep the demo mode working even when Supabase credentials are not configured.

### Safe editing patterns

- Do not remove the demo fallback behavior unless the task explicitly requires a production backend.
- Preserve the `isSupabaseConfigured()` guard and the `window.__fintrackDebug` debug data when editing integration code.
- Keep DOM IDs and data attributes aligned with the existing markup in [index.html](index.html).
- Prefer adding small helper functions over refactoring the current state model unless necessary.

## Validation guidance

- Verify changes by running a local static server and checking the page in the browser.
- If modifying transaction logic, confirm the dashboard totals still update correctly in both demo and Supabase-enabled modes.
- If changing database-related code, cross-check it against [supabase/schema.sql](supabase/schema.sql) so the schema and app logic remain consistent.

## When making changes

- Keep the project simple and static: no package installs or frontend framework migrations without a clear requirement.
- Update the README only when the user-facing workflow or setup steps actually change.
- Prefer minimal, focused edits that preserve the current app structure and behavior.
