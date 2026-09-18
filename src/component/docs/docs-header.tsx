"use client";

import { GitHubIcon } from "@/component/icons";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const githubUrl = "https://github.com/TecnicalBot/mobile-agent";
const latestReleaseUrl = `${githubUrl}/releases/latest`;

const navigation: Array<[string, string]> = [
  ["Home", "/"],
  ["Docs", "/docs"],
  ["About", "/#about"],
  ["Capabilities", "/#features"],
  ["FAQ", "/#faq"],
];

const getLatestApkUrl = async () => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(
      "https://api.github.com/repos/TecnicalBot/mobile-agent/releases",
      { signal: controller.signal },
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}.`);
    }

    const releases = (await res.json()) as Array<{
      draft: boolean;
      prerelease: boolean;
      assets: Array<{ name: string; browser_download_url: string }>;
    }>;

    const release =
      releases.find((r) => !r.draft && !r.prerelease) ??
      releases.find((r) => !r.draft && r.prerelease);
    const apk = release?.assets.find((a) => a.name.endsWith(".apk"));

    return apk?.browser_download_url ?? latestReleaseUrl;
  } catch {
    return latestReleaseUrl;
  } finally {
    window.clearTimeout(timeout);
  }
};

const handleDownload = async () => {
  const url = await getLatestApkUrl();
  window.location.href = url;
};

export function DocsHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/docs") {
      return pathname === "/docs" || pathname.startsWith("/docs/");
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Mobile Agent home"
        >
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Mobile Agent logo"
            className="h-10 w-10 object-contain"
            priority
          />
          <div className="leading-none">
            <span className="block text-md pt-2 font-extrabold tracking-tight text-slate-950 sm:text-lg">
              Mobile Agent
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setNavOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
                  active ? "text-blue-600" : "text-slate-600"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <GitHubIcon className="size-6" />
            <span className="hidden md:inline">Star on GitHub</span>
          </a>
          <button
            onClick={handleDownload}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <Download size={16} />
            Download{" "}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setNavOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 sm:hidden"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
        >
          {navOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200 bg-white shadow-xl sm:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4">
              {navigation.map(([label, href]) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setNavOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-3 py-3 text-sm font-bold hover:bg-slate-50 ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 font-bold"
                >
                  <GitHubIcon className="size-6" />
                  Star on GitHub
                </a>
                <button
                  onClick={handleDownload}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 font-bold text-white"
                >
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
