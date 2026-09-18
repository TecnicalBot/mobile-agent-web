<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Docs content (contentlayer2)

Site documentation lives in `content/docs/**/*.mdx` and is rendered by `contentlayer2`.

- Every MDX file requires `title`, `description`, and `group` frontmatter plus an `order` number. `group` must be one of `Getting Started`, `Guides`, `API Reference`, or `Contributing` (defined in `contentlayer.config.ts`).
- `predev` / `prebuild` run `contentlayer2 build` automatically, so generated types in `.contentlayer/generated` exist before `next dev` / `next build` (do NOT use `withContentlayer` — it does not fire under Turbopack).
- After editing an MDX file during `npm run dev`, restart the dev server (or run `npx contentlayer2 build`) to regenerate `.contentlayer`.
- `.contentlayer/` is gitignored and ignored by ESLint.
- The sidebar/TOC/pager/nav order are derived from `contentlayer/generated` in `src/lib/docs.ts`.