import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type RawHeading = {
  id: string;
  level: number;
  text: string;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

function extractHeadings(raw: string): RawHeading[] {
  const headings: RawHeading[] = [];
  let inFence = false;

  for (const line of raw.split("\n")) {
    if (line.startsWith("```") || line.startsWith("~~~")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,4})\s+(.+)\s*$/);
    if (!match) continue;

    const text = match[2].replace(/[`*_~\[\]()!]/g, "").trim();
    if (!text) continue;

    headings.push({
      id: slugify(text),
      level: match[1].length,
      text,
    });
  }

  return headings;
}

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    group: { type: "string", required: true },
    order: { type: "number", required: false, default: 0 },
    icon: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.flattenedPath.replace(/^docs\//, ""),
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/docs/${doc._raw.flattenedPath.replace(/^docs\//, "")}`,
    },
    headings: {
      type: "json",
      resolve: (doc) => extractHeadings(doc.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Doc],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: "docs-anchor",
            ariaLabel: "Link to this section",
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false,
          defaultLang: "text",
        },
      ],
    ],
  },
});