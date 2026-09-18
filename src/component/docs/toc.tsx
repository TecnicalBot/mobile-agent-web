"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  level: number;
  text: string;
};

export function DocsToc({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const visible = headings.filter((h) => h.level === 2 || h.level === 3);

  useEffect(() => {
    if (visible.length === 0) return;

    const elements = visible
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the topmost visible heading.
          const top = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visible]);

  if (visible.length === 0) return null;

  return (
    <aside className="sticky top-[110px] hidden max-h-[calc(100svh-130px)] w-56 shrink-0 overflow-y-auto xl:block">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        On this page
      </p>
      <ul className="mt-3 space-y-0.5 border-l border-slate-200">
        {visible.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-1 pl-3 text-[13px] leading-5 transition-colors ${
                activeId === item.id
                  ? "-ml-px border-blue-600 font-semibold text-blue-700"
                  : item.level === 3
                    ? "border-transparent pl-6 text-slate-500 hover:text-slate-800"
                    : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}