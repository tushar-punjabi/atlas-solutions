<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.


# Project: Atlas
Stack: Next.js (app router), TypeScript, PostgreSQL, Prisma/Drizzle.

## Conventions
- Server components by default; client only when needed.
- All DB access through `src/db/*`.
- No `any`. No default exports except pages.
- Tests colocated as `*.test.ts`.

## Rules for AI agents
- Never touch `.env*`, `secrets/`, or migration history.
- Always add a test for new behavior.
- Keep diffs < 200 lines.
- Ask before adding dependencies.





<!-- END:nextjs-agent-rules -->
