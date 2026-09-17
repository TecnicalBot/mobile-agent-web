import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site-url";

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
    "offline AI model",
    "on-device AI model",
    "AI agent offline",
    "scheduled AI agent",
    "AI automation Android",
    "AI agent schedules",
    "custom AI agents",
    "Termux AI agent",
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
      "Run an open-source AI agent entirely on your Android phone with on-device models, MCP, skills, memory, schedules, and permission-based file access.",
    images: [
      {
        url: "/agent.png",
        width: 1024,
        height: 1024,
        alt: "Mobile Agent mascot holding a power plug",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Agent - Open-Source AI Agent for Android",
    description:
      "An open-source Android AI agent that runs entirely on your phone.",
    creator: "@tecnicalbot",
    images: ["/agent.png"],
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
