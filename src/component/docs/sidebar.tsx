"use client";

import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDocGroups } from "@/lib/docs";

function DocsNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const groups = getDocGroups();

  return (
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
                    onClick={onNavigate}
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
}

export function DocsSidebar() {
  return (
    <aside className="sticky top-[70px] hidden h-[calc(100svh-70px)] w-72 shrink-0 border-r border-slate-200 bg-white/95 lg:flex lg:flex-col">
      <DocsNavLinks />
    </aside>
  );
}

export function DocsMobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open ]);

  return (
    <>
      {/* Mobile secondary nav — Next.js docs style, top-left under header */}
      <div className="sticky top-[70px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center px-2 sm:px-4">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="docs-mobile-nav"
            aria-label={open ? "Close docs menu" : "Open docs menu"}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            <span>Menu</span>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer from the left */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            id="docs-mobile-nav"
            className="absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl"
          >
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
            <DocsNavLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}