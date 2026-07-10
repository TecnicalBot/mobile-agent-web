import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobile-agent.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mobile Agent - Open-Source AI Agent for Android",
    template: "%s | Mobile Agent",
  },
  description:
    "Mobile Agent is an open-source Android AI agent that runs entirely on your phone with MCP support, skills, persistent memory, multi-modal support, and permission-based file access.",
  applicationName: "Mobile Agent",
  keywords: [
    "Mobile Agent",
    "Android AI agent",
    "on-device AI agent",
    "open-source Android app",
    "MCP Android",
    "AI agent APK",
    "mobile AI assistant",
    "local AI agent",
    "Android automation",
    "AI agent with memory",
    "personal ai assistant",
    "ai",
    "ai agent",
    "mcp",
  ],
  authors: [{ name: "TecnicalBot", url: "https://github.com/TecnicalBot" }],
  creator: "TecnicalBot",
  publisher: "TecnicalBot",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mobile Agent",
    title: "Mobile Agent - Open-Source AI Agent for Android",
    description:
      "Run an open-source AI agent entirely on your Android phone with MCP, skills, memory, multi-modal support, and permission-based file access.",
  },
  twitter: {
    card: "summary",
    title: "Mobile Agent - Open-Source AI Agent for Android",
    description:
      "An open-source Android AI agent that runs entirely on your phone.",
    creator: "@tecnicalbot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Analytics />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
