import { Pencil } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/component/docs/mdx-content";
import { DocsToc } from "@/component/docs/toc";
import { DocsPager } from "@/component/docs/pager";
import { getDocBySlug, getDocGroups } from "@/lib/docs";

const siteRepoPath = (slug: string) =>
  `https://github.com/tecnicalbot/mobile-agent-web/blob/main/content/docs/${slug}.mdx`;

export function generateStaticParams() {
  return getDocGroups().flatMap((group) =>
    group.items.map((doc) => ({ slug: doc.slug.split("/") })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: slugSegments } = await params;
  const doc = getDocBySlug(slugSegments.join("/"));
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: doc.url,
    },
    openGraph: {
      title: `${doc.title} | Mobile Agent`,
      description: doc.description,
      url: doc.url,
      type: "article",
      siteName: "Mobile Agent",
    },
    twitter: {
      card: "summary",
      title: `${doc.title} | Mobile Agent`,
      description: doc.description,
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugSegments } = await params;
  const doc = getDocBySlug(slugSegments.join("/"));

  if (!doc) notFound();

  return (
    <div className="flex min-h-[calc(100svh-70px)] items-start">
      <article className="min-w-0 flex-1 self-stretch border-r border-slate-200 bg-white px-6 pb-16 pt-12 sm:px-10 lg:px-12">
        <span className="inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">
          {doc.group}
        </span>
        <h1 className="mt-4 mb-3 text-4xl font-extrabold tracking-[-0.04em] text-slate-950">
          {doc.title}
        </h1>
        <p className="mb-8 text-base font-medium leading-7 text-slate-500">
          {doc.description}
        </p>

        <MDXContent code={doc.body.code} />

        <div className="mt-10 border-t border-slate-200 pt-6">
          <a
            href={siteRepoPath(doc.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
          >
            <Pencil size={14} />
            Edit this page on GitHub
          </a>
        </div>

        <DocsPager current={doc} />
      </article>

      <DocsToc key={doc.slug} headings={doc.headings} />
    </div>
  );
}