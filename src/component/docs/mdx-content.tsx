"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "@/component/docs/mdx-components";

export function MDXContent({ code }: { code: string }) {
  // contentlayer2 compiles the MDX string into a component at runtime, which
  // cannot be hoisted — this is the documented useMDXComponent pattern.
  /* eslint-disable react-hooks/static-components */
  const MDXComponent = useMDXComponent(code);
  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-headings:text-slate-950 prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-base prose-p:leading-7 prose-a:text-blue-600 prose-a:font-semibold prose-a:underline-offset-4 prose-strong:text-slate-900 prose-li:leading-7 prose-th:text-left">
      <MDXComponent components={mdxComponents} />
    </div>
  );
  /* eslint-enable react-hooks/static-components */
}