import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPrevNext, type Doc } from "@/lib/docs";

export function DocsPager({ current }: { current: Doc }) {
  const { prev, next } = getPrevNext(current);

  return (
    <nav className="mt-12 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.url}
          className="group flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-blue-600">
            <ArrowLeft size={13} /> Previous
          </span>
          <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={next.url}
          className="group flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-5 text-right transition-colors hover:border-blue-300 hover:bg-blue-50/50 sm:col-start-2"
        >
          <span className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-blue-600">
            Next <ArrowRight size={13} />
          </span>
          <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}