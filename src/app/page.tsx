"use client";

import { DiscordIcon, GitHubIcon, XIcon, YouTubeIcon } from "@/component/icons";
import { ScrollProductExperienceSection } from "@/component/scroll";
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  ChevronRight,
  Code2,
  Download,
  FileText,
  Layers3,
  Menu,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ScreenKey =
  | "chat-thinking"
  | "chat-response"
  | "slash-commands"
  | "at-commands"
  | "mcp-servers"
  | "built-in-tools"
  | "model-select"
  | "db-settings"
  | "settings-main"
  | "sidebar";

type GitHubAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  draft: boolean;
  prerelease: boolean;
  assets: GitHubAsset[];
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobile-agent.app";
const githubUrl = "https://github.com/TecnicalBot/mobile-agent";
const releasesUrl = `${githubUrl}/releases`;

const getLatestApkUrl = async () => {
  const res = await fetch(
    "https://api.github.com/repos/TecnicalBot/mobile-agent/releases",
  );

  const releases = await res.json();

  const release =
    releases.find((r: any) => !r.draft && !r.prerelease) ??
    releases.find((r: any) => !r.draft && r.prerelease);
  const apk = release.assets.find((a: any) => a.name.endsWith(".apk"));

  return apk.browser_download_url;
};

const handleDownload = async () => {
  const url = await getLatestApkUrl();
  window.location.href = url;
};

const featureCards = [
  {
    title: "Runs on your phone",
    description:
      "The agent runtime, memory, skills, and local workspace live inside the Android app instead of a separate companion server.",
    icon: MonitorSmartphone,
    accent: "from-blue-500/15 to-cyan-400/5",
  },
  {
    title: "Connect any MCP server",
    description:
      "Add remote tools such as Notion or Cloudflare and keep every action visible behind explicit approvals.",
    icon: Workflow,
    accent: "from-violet-500/15 to-blue-400/5",
  },
  {
    title: "Permission-first tools",
    description:
      "Android permissions and per-tool approval settings keep file and device access understandable and controlled.",
    icon: ShieldCheck,
    accent: "from-emerald-500/15 to-cyan-400/5",
  },
  {
    title: "Reusable skills",
    description:
      "Package repeatable instructions and workflows into skills that can be enabled whenever a task needs them.",
    icon: Layers3,
    accent: "from-amber-500/15 to-orange-400/5",
  },
  {
    title: "Persistent memory",
    description:
      "Keep useful context available between conversations with local storage and optional remote database support.",
    icon: Brain,
    accent: "from-fuchsia-500/15 to-violet-400/5",
  },
  {
    title: "Local file workspace",
    description:
      "List, read, create, rename, move, and delete files through a phone-native workspace with approval controls.",
    icon: FileText,
    accent: "from-sky-500/15 to-blue-400/5",
  },
  {
    title: "Multiple model providers",
    description:
      "Switch models without changing your workflow and keep provider configuration inside one mobile-first settings experience.",
    icon: Sparkles,
    accent: "from-rose-500/15 to-orange-400/5",
  },
  {
    title: "Open-source by default",
    description:
      "Inspect the code, build it yourself, submit improvements, and install releases directly from GitHub.",
    icon: Code2,
    accent: "from-slate-500/15 to-zinc-400/5",
  },
];

const faqs = [
  {
    question: "What is Mobile Agent?",
    answer:
      "Mobile Agent is an open-source Android AI agent built for phone-native workflows. It combines models, MCP tools, skills, memory, and file access in one app.",
  },
  {
    question: "Does it require an external server?",
    answer:
      "No separate Mobile Agent server is required. The app runtime works on-device. Connected model providers, MCP services, or an optional remote database can still use the internet when you configure them.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "The default workspace and memory can remain on your device. You can optionally configure a remote database when you need cross-device or hosted storage.",
  },
  {
    question: "How do I install it?",
    answer:
      "Download the APK from GitHub Releases, allow installation from your selected source, install the app, and grant only the Android permissions needed for the features you use.",
  },
  {
    question: "What can the agent do?",
    answer:
      "It can chat with multiple models, use MCP servers, run reusable skills, maintain memory, work with local files, and expose a visible approval flow for tool calls.",
  },
  {
    question: "Is Mobile Agent open source?",
    answer:
      "Yes. The source code and Android release builds are published on GitHub under the repository license.",
  },
];

const demoTabs: Array<{
  screen: ScreenKey;
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    screen: "chat-thinking",
    label: "Trace",
    title: "See how every task runs",
    description:
      "Follow model reasoning, tool calls, approvals, and results in one transparent timeline.",
    icon: Activity,
  },
  {
    screen: "chat-response",
    label: "Approve",
    title: "Stay in control of tools",
    description:
      "Pause sensitive operations and choose whether to deny or allow each action.",
    icon: ShieldCheck,
  },
  {
    screen: "slash-commands",
    label: "Command",
    title: "Move quickly with commands",
    description:
      "Switch models, choose skills, start chats, and open settings without leaving the composer.",
    icon: Terminal,
  },
  {
    screen: "at-commands",
    label: "Files",
    title: "Bring local files into context",
    description:
      "Attach, browse, and create workspace files using a phone-native interaction.",
    icon: FileText,
  },
];

type ButtonVariant = "primary" | "secondary" | "dark" | "inverse" | "ghost";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

const buttonStyles: Record<
  ButtonVariant,
  {
    base: string;
    overlay: string;
    content: string;
    hoverContent: string;
  }
> = {
  primary: {
    base: "border border-[#0877ff] bg-[#0877ff] shadow-[0_14px_35px_rgba(8,119,255,0.25)] focus-visible:ring-[#0877ff]/40",
    overlay: "bg-white",
    content: "text-white",
    hoverContent: "group-hover:text-[#0877ff]",
  },

  // White background → blue on hover
  secondary: {
    base: "border border-slate-300 bg-white shadow-sm focus-visible:ring-slate-300/50",
    overlay: "bg-[#0877ff]",
    content: "text-slate-950",
    hoverContent: "group-hover:text-white",
  },

  // Black background → white on hover
  dark: {
    base: "border border-slate-950 bg-slate-950 shadow-[0_14px_35px_rgba(15,23,42,0.2)] focus-visible:ring-slate-400/40",
    overlay: "bg-white",
    content: "text-white",
    hoverContent: "group-hover:text-slate-950",
  },

  // White background → blue on hover
  inverse: {
    base: "border border-white bg-white shadow-[0_14px_35px_rgba(1,44,112,0.18)] focus-visible:ring-white/60",
    overlay: "bg-[#0877ff]",
    content: "text-[#0877ff]",
    hoverContent: "group-hover:text-white",
  },

  ghost: {
    base: "border border-transparent bg-transparent focus-visible:ring-slate-300/50",
    overlay: "bg-[#0877ff]",
    content: "text-slate-600",
    hoverContent: "group-hover:text-white",
  },
};

export const Button = ({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const styles = buttonStyles[variant];

  return (
    <motion.button
      initial="rest"
      animate="rest"
      whileHover={disabled ? "rest" : "hover"}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      disabled={disabled}
      className={`
        group relative isolate inline-flex min-h-12
        items-center justify-center gap-2 overflow-hidden
        rounded-full px-6 py-3 text-sm font-bold
        focus:outline-none focus-visible:ring-4
        disabled:pointer-events-none disabled:opacity-50
        ${styles.base}
        ${className}
      `}
      {...props}
    >
      {/* Sliding hover background */}
      <motion.span
        aria-hidden="true"
        variants={{
          rest: {
            y: "105%",
          },
          hover: {
            y: "0%",
          },
        }}
        transition={{
          duration: 0.38,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          pointer-events-none absolute inset-0
          z-0 rounded-[inherit]
          ${styles.overlay}
        `}
      />

      {/* Slight shine during hover */}
      <motion.span
        aria-hidden="true"
        variants={{
          rest: {
            opacity: 0,
            x: "-140%",
          },
          hover: {
            opacity: 0.14,
            x: "140%",
          },
        }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
        className="
          pointer-events-none absolute inset-y-0
          z-[1] w-16 -skew-x-12 bg-white
        "
      />

      {/* Button content */}
      <motion.span
        variants={{
          rest: {
            y: 0,
          },
          hover: {
            y: -1,
          },
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className={`
          relative z-10 inline-flex items-center
          justify-center gap-2 transition-colors
          duration-300
          ${styles.content}
          ${styles.hoverContent}
        `}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default function App() {
  const [heroScreen, setHeroScreen] = useState<ScreenKey>("chat-thinking");
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const screens: ScreenKey[] = [
      "chat-thinking",
      "chat-response",
      "slash-commands",
      "at-commands",
    ];
    let index = 0;

    const interval = window.setInterval(() => {
      index = (index + 1) % screens.length;
      setHeroScreen(screens[index]);
    }, 5600);

    return () => window.clearInterval(interval);
  }, []);

  const activeDemo =
    demoTabs.find((item) => item.screen === heroScreen) ?? demoTabs[0];

  const cardEntrances = [
    { x: -180, y: -100, rotate: -7 },
    { x: -70, y: -150, rotate: -3 },
    { x: 70, y: -150, rotate: 3 },
    { x: 180, y: -100, rotate: 7 },
    { x: -180, y: 100, rotate: 7 },
    { x: -70, y: 150, rotate: 3 },
    { x: 70, y: 150, rotate: -3 },
    { x: 180, y: 100, rotate: -7 },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Mobile Agent",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Android",
        description:
          "Open-source AI agent for Android with on-device execution, MCP support, skills, memory, model providers, and permission-based file access.",
        url: siteUrl,
        codeRepository: githubUrl,
        downloadUrl: releasesUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: featureCards.map((feature) => feature.title),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const navigation = [
    ["Home", "#"],
    ["About", "#about"],
    ["Capabilities", "#features"],
    ["FAQ", "#faq"],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fc] font-sans text-slate-950 antialiased selection:bg-blue-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
            html { scroll-behavior: smooth; }
            body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
            .mono { font-family: 'JetBrains Mono', monospace; }
            .hero-grid {
              background-image:
                linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
              background-size: 46px 46px;
              mask-image: linear-gradient(to bottom, black, transparent 92%);
            }
          `,
        }}
      />

      <nav className=" inset-x-0 top-0 z-[100] border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <a
            href="#top"
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
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navigation.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Image
                src="/github.png"
                width={20}
                height={20}
                alt="Mobile Agent logo"
                priority
              />
              <span className="hidden md:inline">GitHub</span>
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
                {navigation.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setNavOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 font-bold"
                  >
                    <Image
                      src="/github.png"
                      width={20}
                      height={20}
                      alt="Mobile Agent logo"
                      priority
                    />{" "}
                    GitHub
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
      </nav>

      <main id="top">
        <header className="relative isolate overflow-hidden border-b border-slate-200 bg-white pt-[72px]">
          <div className="hero-grid pointer-events-none absolute inset-0 -z-20" />
          <div className="pointer-events-none absolute left-1/2 top-8 -z-10 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-blue-400/12 blur-[130px]" />
          <div className="pointer-events-none absolute -left-32 top-56 -z-10 h-72 w-72 rounded-full bg-cyan-300/15 blur-[100px]" />
          <div className="pointer-events-none absolute -right-32 top-36 -z-10 h-80 w-80 rounded-full bg-violet-300/10 blur-[110px]" />

          <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:mb-15 lg:py-0">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-2 text-xs font-extrabold text-blue-700 shadow-sm backdrop-blur"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>
                Open-source. Android-native. Local-first.
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.62,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto mt-6 max-w-4xl text-balance text-[2.4rem] font-extrabold leading-[1.06]  tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[4.1rem]"
              >
                Your capable AI agent,
                <span className="block bg-gradient-to-r from-[#0877ff] via-[#0867e8] to-[#08a4d8] bg-clip-text text-transparent">
                  centered around your phone.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.62,
                  delay: 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8"
              >
                Multiple models, MCP tools, skills, memory, and local file
                workflows from one Android interface and doesn't require any
                external server.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.62,
                  delay: 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
              >
                <Button onClick={handleDownload} className="px-7">
                  <Download size={17} /> Download APK
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    window.open(githubUrl, "_blank", "noopener,noreferrer")
                  }
                  className="px-7"
                >
                  <Image
                    src="/github.png"
                    width={20}
                    height={20}
                    alt="Mobile Agent logo"
                    priority
                  />
                  View on GitHub
                </Button>
              </motion.div>
            </div>
          </div>
        </header>

        <ScrollProductExperienceSection />
        <section
          id="features"
          className="relative overflow-hidden bg-[#f5f8fd] py-20 sm:py-24 lg:py-28"
        >
          <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-300/15 blur-[110px]" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.15em] text-blue-600 shadow-sm">
                <Zap size={14} /> Core capabilities
              </span>
              <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Everything your agent needs, collected into one phone.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600">
                Scroll into the section and the capabilities assemble into
                place—just like the app brings models, tools, memory, and files
                into one focused experience.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
              {featureCards.map((feature, index) => {
                const Icon = feature.icon;
                const entrance = cardEntrances[index] ?? {
                  x: 0,
                  y: 80,
                  rotate: 0,
                };

                return (
                  <motion.article
                    key={feature.title}
                    initial={{
                      opacity: 0.42,
                      x: entrance.x,
                      y: entrance.y,
                      scale: 0.82,
                      rotate: entrance.rotate,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                    }}
                    viewport={{ once: true, amount: 0.24 }}
                    transition={{
                      duration: 0.82,
                      delay: index * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -7, scale: 1.015 }}
                    className="group relative min-h-[235px] overflow-hidden rounded-[26px] border border-slate-200/90 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.055)] transition-shadow hover:shadow-[0_22px_55px_rgba(15,23,42,0.11)]"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                          <Icon size={21} />
                        </span>
                        <span className="mono text-[10px] font-bold text-slate-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-7 text-lg font-extrabold tracking-[-0.02em] text-slate-950">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="relative overflow-hidden border-t border-slate-200 bg-[#f5f8fd] py-20 sm:py-24 lg:py-28"
        >
          <div className="pointer-events-none absolute left-1/2 top-12 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-300/15 blur-[115px]" />

          <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mt-6 block text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">
                Frequently asked
              </span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Everything to know before installing.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600">
                Straight answers about local execution, connected services,
                privacy, installation, and open-source access.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 overflow-hidden rounded-[30px] border border-slate-200 bg-white p-2 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-3"
            >
              <div className="divide-y divide-slate-200/80">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  const answerId = `faq-answer-${index}`;

                  return (
                    <motion.div
                      layout="position"
                      key={faq.question}
                      transition={{
                        layout: {
                          duration: 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                      className={`rounded-[22px] transition-colors duration-300 ${
                        isOpen ? "my-2 bg-blue-50/75" : "bg-transparent"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        className="flex w-full items-center gap-4 px-4 py-5 text-left sm:gap-5 sm:px-6 sm:py-6"
                      >
                        <span
                          className={`mono flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-300 ${
                            isOpen
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="flex-1 text-sm font-extrabold leading-6 text-slate-950 sm:text-base">
                          {faq.question}
                        </span>

                        <motion.span
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                            isOpen
                              ? "bg-white text-blue-600 shadow-sm"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <ChevronRight size={17} />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false} mode="wait">
                        {isOpen && (
                          <motion.div
                            id={answerId}
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: {
                                duration: 0.36,
                                ease: [0.22, 1, 0.36, 1],
                              },
                              opacity: {
                                duration: 0.22,
                                ease: "easeOut",
                              },
                            }}
                            className="overflow-hidden"
                          >
                            <motion.p
                              initial={{ y: -5 }}
                              animate={{ y: 0 }}
                              exit={{ y: -3 }}
                              transition={{
                                duration: 0.28,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className=" max-w-3xl px-4 pb-6 text-sm font-medium leading-7 text-slate-600  sm:px-5 sm:pb-7"
                            >
                              {faq.answer}
                            </motion.p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="bg-white px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28"
          id="about"
        >
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0877ff] via-[#086eea] to-[#0755c9] shadow-[0_32px_90px_rgba(8,119,255,0.28)]">
            <div className="absolute -left-28 -top-32 h-80 w-80 rounded-full border-[60px] border-white/10" />
            <div className="absolute -bottom-44 right-10 h-96 w-96 rounded-full border-[70px] border-cyan-200/12" />

            <div className="grid min-h-[410px] items-center gap-8 px-7 py-12 sm:px-10 lg:grid-cols-[1.1fr_.9fr] lg:px-14 lg:py-10">
              <div className="relative z-10 max-w-2xl text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-extrabold text-white backdrop-blur">
                  <Smartphone size={14} /> Built for your pocket
                </span>
                <h2 className="mt-6 text-balance text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl">
                  Give your Android phone a capable new teammate.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-7 text-blue-100 sm:text-base lg:mx-0">
                  Download the APK, inspect the open-source code, and shape
                  Mobile Agent around the workflows you actually use.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <Button
                    variant="inverse"
                    onClick={handleDownload}
                    className="px-7"
                  >
                    <Download size={17} /> Download APK
                  </Button>
                  <Button
                    variant="dark"
                    onClick={() =>
                      window.open(githubUrl, "_blank", "noopener,noreferrer")
                    }
                    className=" px-7"
                  >
                    Explore GitHub <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 mx-auto -mb-12 w-[245px] sm:w-[310px] lg:-mb-16 lg:w-[345px]"
              >
                <Image
                  src="/agent.png"
                  width={1024}
                  height={1024}
                  alt="Mobile Agent mascot holding a power plug"
                  className="h-auto w-full object-contain drop-shadow-[0_28px_36px_rgba(0,35,95,0.32)]"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="Mobile Agent logo"
                className="h-10 w-10 object-contain"
              />

              <p className="pt-2 text-md font-extrabold text-slate-950">
                Mobile Agent
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub"
                className="
            flex h-11 w-11 items-center justify-center
            rounded-full border border-blue-600
            bg-blue-600 text-white
            shadow-md transition-all duration-300
            hover:-translate-y-1 hover:border-blue-600
            hover:bg-blue-600 hover:text-white hover:shadow-lg
            md:border-slate-200 md:bg-white md:text-slate-700 md:shadow-none
          "
              >
                <GitHubIcon className="h-5 w-5" />
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/7QjtDC8u"
                target="_blank"
                rel="noreferrer"
                aria-label="Join Discord"
                className="
            flex h-11 w-11 items-center justify-center
            rounded-full border border-blue-600
            bg-blue-600 text-white
            shadow-md transition-all duration-300
            hover:-translate-y-1 hover:border-blue-600
            hover:bg-blue-600 hover:text-white hover:shadow-lg
            md:border-slate-200 md:bg-white md:text-slate-700 md:shadow-none
          "
              >
                <DiscordIcon className="h-5 w-5" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@TechnicalBot"
                target="_blank"
                rel="noreferrer"
                aria-label="Open YouTube"
                className="
            flex h-11 w-11 items-center justify-center
            rounded-full border border-blue-600
            bg-blue-600 text-white
            shadow-md transition-all duration-300
            hover:-translate-y-1 hover:border-blue-600
            hover:bg-blue-600 hover:text-white hover:shadow-lg
            md:border-slate-200 md:bg-white md:text-slate-700 md:shadow-none
          "
              >
                <YouTubeIcon className="h-5 w-5" />
              </a>

              {/* X */}
              <a
                href="https://x.com/tecnicalbot"
                target="_blank"
                rel="noreferrer"
                aria-label="Open X"
                className="
            flex h-11 w-11 items-center justify-center
            rounded-full border border-blue-600
            bg-blue-600 text-white
            shadow-md transition-all duration-300
            hover:-translate-y-1 hover:border-blue-600
            hover:bg-blue-600 hover:text-white hover:shadow-lg
            md:border-slate-200 md:bg-white md:text-slate-700 md:shadow-none
          "
              >
                <XIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <p className="text-xs text-center mt-4 md:mt-0 md:text-left">
            © {new Date().getFullYear()}{" "}
            <span>
              <a
                href="https://github.com/tecnicalbot"
                target="_blank"
                className="underline"
              >
                Technical Bot
              </a>
            </span>
            . All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
