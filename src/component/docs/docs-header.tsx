import { Download, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const githubUrl = "https://github.com/TecnicalBot/mobile-agent";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Mobile Agent home">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Mobile Agent logo"
            className="h-10 w-10 object-contain"
            priority
          />
          <div className="leading-none">
            <span className="block pt-2 text-lg font-extrabold tracking-tight text-slate-950">
              Mobile Agent
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/docs/getting-started/introduction"
            className="text-sm font-semibold text-blue-600"
            aria-current="page"
          >
            Docs
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
          >
            GitHub
          </a>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href="https://github.com/TecnicalBot/mobile-agent/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <FileText size={16} />
            <span className="hidden md:inline">Releases</span>
          </a>
          <Link
            href="https://github.com/TecnicalBot/mobile-agent/releases/latest"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <Download size={16} />
            Download
          </Link>
        </div>
      </div>
    </header>
  );
}