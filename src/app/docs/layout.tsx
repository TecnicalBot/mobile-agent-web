import type { Metadata } from "next";
import Link from "next/link";
import { DocsHeader } from "@/component/docs/docs-header";
import { DocsMobileNav, DocsSidebar } from "@/component/docs/sidebar";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to install, configure, and extend Mobile Agent — the open-source AI agent that runs on your Android phone.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-[#f7f9fc] font-sans text-slate-950 antialiased selection:bg-blue-600 selection:text-white">
      <DocsHeader />
      <DocsMobileNav />
      <div className="mx-auto flex max-w-[1440px]">
        <DocsSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <footer className="mx-auto max-w-[1440px] border-t border-slate-200 bg-white px-5 py-8 sm:px-6 lg:px-8">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/tecnicalbot"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Technical Bot
          </a>
          {" · "}
          <Link href="/" className="underline">
            Back to home
          </Link>
          {" · "}
          <a
            href="https://github.com/TecnicalBot/mobile-agent"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Source code
          </a>
        </p>
      </footer>
    </div>
  );
}