"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getDocGroups } from "@/lib/docs";

export function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const groups = getDocGroups();

  const nav = (
    <nav className="docs-scroll flex-1 overflow-y-auto px-4 pb-8 pt-6">
      {groups.map((group) => (
        <div key={group.title} className="mb-7">
          <p className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((doc) => {
              const active = pathname === doc.url;
              return (
                <li key={doc.slug}>
                  <Link
                    href={doc.url}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg border-l-2 px-3 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-blue-600 bg-blue-50 font-semibold text-blue-700"
                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-[70px] hidden h-[calc(100svh-70px)] w-72 shrink-0 border-r border-slate-200 bg-white/95 lg:flex lg:flex-col">
        {nav}
      </aside>

      {/* Mobile drawer trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-blue-600 text-white shadow-lg lg:hidden"
        aria-label="Open docs navigation"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <span className="text-sm font-extrabold text-slate-950">
                Documentation
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close docs navigation"
              >
                <X size={18} />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}
    </>
  );
}