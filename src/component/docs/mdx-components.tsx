"use client";

import { Check, Copy, FileCode2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useCallback, useState } from "react";

function toText(node: ReactNode): string {
  if (node == null || typeof node === "string" || typeof node === "number") {
    return node == null ? "" : String(node);
  }
  const element = node as { props?: { children?: ReactNode } };
  return toText(element.props?.children);
}

function extractLanguage(
  props: ComponentProps<"pre">,
  className?: string,
): string {
  const dataLanguage = (props as { "data-language"?: string })["data-language"];
  if (dataLanguage) return dataLanguage;
  const match = className?.match(/language-([\w-]+)/);
  return match?.[1] ?? "text";
}

function CodeBlockHead({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="docs-codeblock-head">
      <span className="inline-flex items-center gap-1.5">
        <FileCode2 size={12} />
        {language}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check size={12} className="text-emerald-400" /> Copied
          </>
        ) : (
          <>
            <Copy size={12} /> Copy
          </>
        )}
      </button>
    </div>
  );
}

function Pre({ children, ...props }: ComponentProps<"pre">) {
  const node = children as ReactNode;
  let codeText = "";

  if (node && typeof node === "object") {
    const element = node as { props?: { children?: ReactNode } };
    const inner = element.props?.children;
    if (Array.isArray(inner)) {
      codeText = inner.map((line) => toText(line)).join("");
    } else {
      codeText = toText(inner);
    }
  }

  return (
    <div className="docs-codeblock">
      <CodeBlockHead
        language={extractLanguage(props, (node as { props?: { className?: string } })?.props?.className)}
        code={codeText}
      />
      <pre {...props} style={{ margin: 0 }}>
        {children}
      </pre>
    </div>
  );
}

function Table({ children, ...props }: ComponentProps<"table">) {
  return (
    <div className="docs-table-wrap">
      <table {...props}>{children}</table>
    </div>
  );
}

function Link({ href, children, ...props }: ComponentProps<"a">) {
  const isExternal = href?.startsWith("http") || href?.startsWith("mailto");
  return (
    <a
      href={href}
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  pre: Pre,
  table: Table,
  a: Link,
};

export default mdxComponents;