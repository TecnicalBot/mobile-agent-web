"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Brain,
  Check,
  ChevronRight,
  File,
  FileText,
  FolderPlus,
  // Github,
  Info,
  Link2,
  Plus,
  Settings,
} from "lucide-react";

export type ScreenKey =
  | "notion"
  | "file-selection-option"
  | "tool"
  | "mcp-server"
  | "slash-commands"
  | "built-in-tools"
  | "model-select"
  | "db-settings"
  | "settings-main"
  | "sidebar";

type AppMockupProps = {
  activeScreen: ScreenKey;
  onNavigate?: (screen: ScreenKey) => void;
};
export const AppMockup = ({
  activeScreen,
  onNavigate = () => undefined,
}: AppMockupProps) => {
  return (
    <div className="w-full h-full flex flex-col bg-white text-[#111827] font-sans relative select-none">
      {/* Phone status bar simulation */}
      <div className="h-8 px-6 pt-2.5 flex justify-between items-center text-[11px] font-semibold text-gray-500 bg-white select-none">
        <div>10:22</div>
        <div className="flex items-center gap-1.5">
          <Activity size={10} className="text-[#0077FF] animate-pulse" />
          <span>91%</span>
        </div>
      </div>

      {/* Screen Container with Scrollable Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-white">
        <AnimatePresence initial={false} mode="wait">
          {/* SCREEN: CHAT-BASIC — the first step in the scroll walkthrough */}
          {activeScreen === "notion" && (
            <motion.div
              key="chat-thinking"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 pb-4 relative h-full justify-between bg-white text-[#111827]"
            >
              {/* Header matching image 1 */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => onNavigate("sidebar")}
                    className="p-1 bg-gray-50 rounded-lg text-gray-700"
                  >
                    <div className="w-5 h-5 border-2 border-gray-900 rounded-[5px] flex overflow-hidden">
                      <div className="w-[7px] h-full border-r border-gray-900 bg-gray-900/10" />
                    </div>
                  </button>
                  <button className="p-1 bg-gray-50 rounded-lg text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-square-pen"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.375 2.625a1 1 0 0 1 3.75 3.75l-9.0 9.0H9.375v-3.75z" />
                    </svg>
                  </button>
                </div>
                <button className="p-1 bg-gray-50 rounded-lg text-gray-700">
                  <Info size={18} />
                </button>
              </div>

              {/* Chat Area matching Screenshot 1 */}
              <div className="flex-1 overflow-y-auto pt-4 space-y-4 pr-0.5">
                {/* User message */}
                <div className="flex justify-end">
                  <span className="bg-black text-white text-[13px] px-[1.125rem] py-2.5 rounded-[22px] font-semibold max-w-[85%] text-left">
                    List everything I have in notion
                  </span>
                </div>

                {/* Assistant text response */}
                <div className="space-y-1 mt-3 text-left">
                  <p className="text-[13.5px] leading-relaxed text-gray-900 font-medium">
                    There are 10 articles currently in your notion
                    workspace.{" "}
                  </p>
                  {/* Action Row */}
                  <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold pt-1.5 pb-2">
                    <button className="flex items-center gap-1 text-gray-900 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-copy"
                      >
                        <rect
                          width="14"
                          height="14"
                          x="8"
                          y="8"
                          rx="2"
                          ry="2"
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      <span>Copy</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#0077FF] text-blue-600 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>4 steps</span>
                      <ChevronRight
                        size={12}
                        className="rotate-90 text-[#0077FF]"
                      />
                    </button>
                  </div>
                </div>

                {/* Detailed Thinking trace card */}
                <div className="bg-[#FAFBFC] border border-gray-200/80 rounded-[20px] p-4 text-[11px] text-gray-800 space-y-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] text-left">
                  {/* Line 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Thinking</span>
                      <span className="text-[10px] text-gray-400">
                        10:32 pm
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 flex justify-between pt-0.5">
                      <span>Info</span>
                      <span>Google Gemini · Gemini 2.5 Flash Lite</span>
                    </div>
                  </div>

                  {/* Line 2 */}
                  <div className="space-y-1 pt-1.5 border-t border-gray-200/40">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">
                        Waiting for approval:
                      </span>
                      <span className="text-[10px] text-gray-400">
                        10:32 pm
                      </span>
                    </div>
                    <div className="font-bold text-gray-900 text-[11px] break-all">
                      mcp_notion_56bca384_notion_search
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium pt-0.5">
                      Waiting
                    </div>
                    <div className="bg-gray-100/70 p-2.5 rounded-xl font-mono text-[10px] text-gray-600 mt-1.5 whitespace-pre-wrap leading-relaxed border border-gray-200/20">
                      {'Notion / notion-search: {\n  "query": "everything"\n}'}
                    </div>
                  </div>

                  {/* Line 3 */}
                  <div className="space-y-1 pt-1.5 border-t border-gray-200/40">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">
                        Calling Notion / notion-search
                      </span>
                      <span className="text-[10px] text-gray-400">
                        10:32 pm
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium pt-0.5">
                      Completed
                    </div>
                    <div className="bg-gray-100/70 p-2.5 rounded-xl font-mono text-[10px] text-gray-600 mt-1.5 break-all border border-gray-200/20">
                      {'{"results":[],"type":"workspace_search"}'}
                    </div>
                  </div>

                  {/* Line 4 */}
                  <div className="space-y-0.5 pt-1.5 border-t border-gray-200/40">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Finished</span>
                      <span className="text-[10px] text-gray-400">
                        10:32 pm
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium pt-0.5">
                      Completed
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Box - WITHOUT virtual keyboard */}
              <div className="space-y-3 pt-3">
                <div className="bg-white border border-gray-200/80 rounded-[28px] p-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  <div className="text-[13px] text-gray-400 px-1 py-1 text-left">
                    Type a message...
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-1.5">
                      <button className="px-3 py-1 bg-[#F2F2F7] bg-[#E5E5EA] rounded-full text-[11px] text-gray-700 font-semibold flex items-center gap-1 transition-colors">
                        <span>Ask</span>
                        <ChevronRight size={10} className="rotate-90" />
                      </button>
                      <button className="px-3 py-1 bg-[#F2F2F7] bg-[#E5E5EA] rounded-full text-[11px] text-gray-700 font-semibold flex items-center gap-1 transition-colors">
                        <Brain size={11} className="text-gray-500" />
                        <span>Skills</span>
                      </button>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shrink-0 bg-gray-900 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-send-horizontal"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-center text-[10px] text-gray-400">
                  Use @ for files and folders, / for commands.
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: CHAT-RESPONSE (Screenshot_20260708_222116_mobile-agent.jpg) */}
          {activeScreen === "tool" && (
            <motion.div
              key="chat-response"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 pb-4 justify-between h-full bg-white text-[#111827]"
            >
              <div className="flex-1 flex flex-col justify-between">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => onNavigate("sidebar")}
                      className="p-1 bg-gray-50 rounded-lg text-gray-700 animate-fade-in"
                    >
                      <div className="w-5 h-5 border-2 border-gray-900 rounded-[5px] flex overflow-hidden">
                        <div className="w-[7px] h-full border-r border-gray-900 bg-gray-900/10" />
                      </div>
                    </button>
                    <button className="p-1 bg-gray-50 rounded-lg text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-square-pen"
                      >
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.375 2.625a1 1 0 0 1 3.75 3.75l-9.0 9.0H9.375v-3.75z" />
                      </svg>
                    </button>
                  </div>
                  <button className="p-1 bg-gray-50 rounded-lg text-gray-700">
                    <Info size={18} />
                  </button>
                </div>

                {/* Content Area matching Screenshot 2 */}
                <div className="flex-1 overflow-y-auto pt-6 space-y-4 text-left">
                  <h2 className="text-[20px] font-extrabold text-gray-950 tracking-tight leading-tight">
                    Tool approval
                  </h2>
                  <p className="text-[13.5px] leading-relaxed text-gray-600 font-medium">
                    Paused in List what articles I have in my notion until you
                    decide.
                  </p>

                  {/* Tool block card */}
                  <div className="bg-[#F2F2F7]/50 border border-gray-200/60 rounded-[20px] p-[1.125rem] space-y-3 mt-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <div className="font-bold text-gray-950 text-xs">
                      Mcp Notion 56bca384 Notion Search
                    </div>
                    <div className="bg-white/80 border border-gray-200/50 p-3 rounded-xl font-mono text-[11px] text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {'Notion / notion-search: {\n  "query": "article"\n}'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Action Buttons at Bottom */}
              <div className="space-y-4 pt-4 border-t border-gray-100 mt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigate("built-in-tools")}
                    className="flex-1 py-3 bg-white bg-gray-50 text-gray-950 font-bold text-[13px] rounded-full border border-gray-300 transition-colors cursor-pointer"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => onNavigate("built-in-tools")}
                    className="flex-1 py-3 bg-black bg-gray-900 text-white font-bold text-[13px] rounded-full transition-colors cursor-pointer"
                  >
                    Allow once
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: SLASH-COMMANDS (Screenshot_20260708_222124_mobile-agent.jpg / image_73c77a.png) */}
          {activeScreen === "slash-commands" && (
            <motion.div
              key="slash-commands"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 pb-4 justify-between h-full relative"
            >
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => onNavigate("sidebar")}
                      className="p-1 text-gray-700"
                    >
                      <div className="w-5 h-4 flex flex-col justify-between">
                        <span className="h-0.5 bg-gray-900 rounded w-5" />
                        <span className="h-0.5 bg-gray-900 rounded w-3" />
                        <span className="h-0.5 bg-gray-900 rounded w-5" />
                      </div>
                    </button>
                    <button className="p-1 text-gray-700">
                      <FileText size={18} />
                    </button>
                  </div>
                  <button className="p-1 text-gray-700">
                    <Info size={18} />
                  </button>
                </div>
                <div className="flex justify-end mb-4">
                  <span className="bg-black text-white text-[13px] px-4 py-2 rounded-[22px] font-semibold">
                    Hi
                  </span>
                </div>
                <div className="space-y-3 ml-1">
                  <p className="text-[14px] leading-relaxed text-gray-900 font-medium">
                    Hello! How can I help you today?
                  </p>
                </div>
              </div>

              {/* Overlapping command list based on image_73c77a.png */}
              <div className="absolute inset-x-4 bottom-[108px] bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-20 text-[13px]">
                <div className="divide-y divide-gray-100">
                  <div className="p-3.5 bg-gray-50 flex items-center gap-3.5 cursor-pointer">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                      <Brain size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-950 text-xs">
                        Select skills
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Choose chat skills
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => onNavigate("model-select")}
                    className="p-3.5 bg-gray-50 flex items-center gap-3.5 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-[#0077FF]">
                      <Check size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-950 text-xs">
                        Select model
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Google Gemini · Gemini 2.5 Flash Lite
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-gray-50 flex items-center gap-3.5 cursor-pointer">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                      <FileText size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-950 text-xs">
                        New chat
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Start a fresh conversation
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => onNavigate("settings-main")}
                    className="p-3.5 bg-gray-50 flex items-center gap-3.5 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                      <Settings size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-950 text-xs">
                        Open settings
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Providers, models, and storage
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input card with active '/' command character */}
              <div className="space-y-3 z-10">
                <div className="bg-white border border-gray-200 rounded-[28px] p-3 shadow-sm">
                  <div className="text-[13px] text-gray-900 px-1 py-1 font-semibold">
                    /
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-1.5">
                      <button className="px-3 py-1 bg-gray-100 rounded-full text-[11px] text-gray-700 font-semibold flex items-center gap-1">
                        <span>Ask</span>{" "}
                        <ChevronRight size={10} className="rotate-90" />
                      </button>
                      <button className="px-3 py-1 bg-gray-100 rounded-full text-[11px] text-gray-700 font-semibold flex items-center gap-1">
                        <Brain size={11} /> <span>Skills</span>
                      </button>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-center text-[10px] text-gray-400">
                  Use @ for files and folders, / for commands.
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: AT-COMMANDS (Screenshot_20260708_222143_mobile-agent.jpg) */}
          {activeScreen === "file-selection-option" && (
            <motion.div
              key="file-selection-option"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 pb-4 justify-between h-full relative"
            >
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => onNavigate("sidebar")}
                      className="p-1 text-gray-700"
                    >
                      <div className="w-5 h-4 flex flex-col justify-between">
                        <span className="h-0.5 bg-gray-900 rounded w-5" />
                        <span className="h-0.5 bg-gray-900 rounded w-3" />
                        <span className="h-0.5 bg-gray-900 rounded w-5" />
                      </div>
                    </button>
                    <button className="p-1 text-gray-700">
                      <FileText size={18} />
                    </button>
                  </div>
                  <button className="p-1 text-gray-700">
                    <Info size={18} />
                  </button>
                </div>
                <div className="flex justify-end mb-4">
                  <span className="bg-black text-white text-[13px] px-4 py-2 rounded-[22px] font-semibold">
                    Hi
                  </span>
                </div>
                <div className="space-y-3 ml-1">
                  <p className="text-[14px] leading-relaxed text-gray-900 font-medium">
                    Hello! How can I help you today?
                  </p>
                </div>
              </div>

              {/* Overlapping At list */}
              <div className="absolute inset-x-4 bottom-[108px] bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-20 text-[13px]">
                <div className="divide-y divide-gray-100">
                  <div className="p-3.5 bg-gray-50 flex items-center gap-3.5 cursor-pointer">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                      <Link2 size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-950 text-xs">
                        Select file
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Import and attach a file
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-gray-50 flex items-center gap-3.5 cursor-pointer">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                      <FolderPlus size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-950 text-xs">
                        List files
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Browse workspace files
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-gray-50 flex items-center gap-3.5 cursor-pointer">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                      <File size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-950 text-xs">
                        New file
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Create a workspace file
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input section with active '@' character */}
              <div className="space-y-3 z-10">
                <div className="bg-white border border-gray-200 rounded-[28px] p-3 shadow-sm">
                  <div className="text-[13px] text-gray-900 px-1 py-1 font-semibold">
                    @
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-1.5">
                      <button className="px-3 py-1 bg-gray-100 rounded-full text-[11px] text-gray-700 font-semibold flex items-center gap-1">
                        <span>Ask</span>{" "}
                        <ChevronRight size={10} className="rotate-90" />
                      </button>
                      <button className="px-3 py-1 bg-gray-100 rounded-full text-[11px] text-gray-700 font-semibold flex items-center gap-1">
                        <Brain size={11} /> <span>Skills</span>
                      </button>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-center text-[10px] text-gray-400">
                  Use @ for files and folders, / for commands.
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: MCP-SERVERS (Screenshot_20260708_222205_mobile-agent.jpg) */}
          {activeScreen === "mcp-server" && (
            <motion.div
              key="mcp-server"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 bg-white h-full"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate("settings-main")}
                    className="p-1 bg-gray-100 rounded-lg text-gray-700"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h2 className="text-md font-bold text-gray-900">
                    MCP servers
                  </h2>
                </div>
                <button className="px-3 py-1 bg-black text-white rounded-full text-[11px] font-bold flex items-center gap-1">
                  <Plus size={12} /> Add
                </button>
              </div>

              <div className="space-y-4 overflow-y-auto flex-1 pr-1">
                {/* Cloudflare Server Card */}
                <div className="p-4 bg-gray-50 rounded-[24px] border border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-900 text-sm">
                      Cloudflare
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full font-semibold">
                        3 tools
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-black focus:ring-black h-4 w-4"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 break-all mb-4">
                    HTTP · oauth · https://mcp.cloudflare.com/...
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold mb-3">
                    <button className="py-1.5 bg-white rounded-full text-gray-800 border border-gray-200">
                      Disable
                    </button>
                    <button className="py-1.5 bg-white rounded-full text-gray-800 border border-gray-200 flex items-center justify-center gap-0.5">
                      Test
                    </button>
                    <button className="py-1.5 bg-white rounded-full text-gray-800 border border-gray-200 flex items-center justify-center gap-0.5">
                      OAuth
                    </button>
                  </div>
                </div>

                {/* Notion Server Card */}
                <div className="p-4 bg-gray-50 rounded-[24px] border border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-900 text-sm">
                      Notion
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full font-semibold">
                        20 tools
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-black focus:ring-black h-4 w-4"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 break-all mb-4">
                    HTTP · oauth · https://mcp.notion.com/mcp
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold mb-3">
                    <button className="py-1.5 bg-white rounded-full text-gray-800 border border-gray-200">
                      Disable
                    </button>
                    <button className="py-1.5 bg-white rounded-full text-gray-800 border border-gray-200 flex items-center justify-center gap-0.5">
                      Test
                    </button>
                    <button className="py-1.5 bg-white rounded-full text-gray-800 border border-gray-200 flex items-center justify-center gap-0.5">
                      OAuth
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: BUILT-IN-TOOLS (Screenshot_20260708_222210_mobile-agent.jpg) */}
          {activeScreen === "built-in-tools" && (
            <motion.div
              key="built-in-tools"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 bg-white h-full"
            >
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={() => onNavigate("settings-main")}
                  className="p-1 bg-gray-100 rounded-lg text-gray-700"
                >
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-md font-bold text-gray-900">
                  Built-in tools
                </h2>
              </div>

              {/* Tool approval */}
              <div className="p-4 bg-gray-50 rounded-[24px] mb-4 border border-gray-100">
                <span className="text-[11px] text-gray-400 font-bold block mb-2">
                  Tool approval
                </span>
                <div className="grid grid-cols-2 gap-1 bg-gray-200/40 p-1 rounded-xl">
                  <button className="py-1.5 bg-white text-black rounded-lg text-xs font-semibold shadow-sm">
                    Always ask
                  </button>
                  <button className="py-1.5 text-gray-500 rounded-lg text-xs font-semibold bg-white/40">
                    Always allow
                  </button>
                </div>
              </div>

              {/* Tools list */}
              <div className="bg-gray-50 rounded-[24px] border border-gray-100 divide-y divide-gray-200/40 overflow-y-auto flex-1 pr-1">
                {[
                  "List files",
                  "Read file",
                  "Write file",
                  "Create file",
                  "Create folder",
                  "Rename",
                  "Move",
                  "Delete",
                ].map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3.5 text-[13px] font-semibold text-gray-800"
                  >
                    <span>{tool}</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-black focus:ring-black h-[1.125rem] w-[1.125rem]"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCREEN: MODEL-SELECT (Screenshot_20260708_222221_mobile-agent.jpg) */}
          {activeScreen === "model-select" && (
            <motion.div
              key="model-select"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 bg-white h-full justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={() => onNavigate("settings-main")}
                    className="p-1 bg-gray-100 rounded-lg text-gray-700"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h2 className="text-md font-bold text-gray-900">Settings</h2>
                </div>

                <div className="text-center mb-2">
                  <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
                  <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      Current model
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                  {[
                    {
                      name: "Gemini 3.1 Flash Image",
                      provider: "Google Gemini",
                    },
                    { name: "Gemini 3 Pro Image", provider: "Google Gemini" },
                    {
                      name: "Gemini 3.1 Flash Lite Image",
                      provider: "Google Gemini",
                    },
                    {
                      name: "Gemini 2.5 Flash Image",
                      provider: "Google Gemini",
                    },
                    {
                      name: "Gemini 2.5 Flash",
                      provider: "Google Gemini",
                      active: true,
                    },
                    { name: "Gemini 2.5 Pro", provider: "Google Gemini" },
                  ].map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-[18px] border text-left cursor-pointer transition-colors ${m.active
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200/80 bg-gray-50"
                        }`}
                      onClick={() => onNavigate("settings-main")}
                    >
                      <div className="font-bold text-xs text-gray-900">
                        {m.name}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {m.provider}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-white bg-gray-50 text-gray-800 font-bold text-xs rounded-full border border-gray-200 mt-3">
                Manage providers
              </button>
            </motion.div>
          )}

          {/* SCREEN: DB-SETTINGS (Screenshot_20260708_222226_mobile-agent.jpg) */}
          {activeScreen === "db-settings" && (
            <motion.div
              key="db-settings"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 bg-white h-full justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={() => onNavigate("settings-main")}
                    className="p-1 bg-gray-100 rounded-lg text-gray-700"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h2 className="text-md font-bold text-gray-900">Settings</h2>
                </div>

                <div className="text-center mb-3">
                  <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
                  <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-gray-900">DB</h3>
                  </div>
                </div>

                {/* Local vs Remote */}
                <div className="p-1 bg-gray-100 rounded-xl grid grid-cols-2 gap-1 mb-5">
                  <button className="py-2 bg-black text-white font-bold rounded-lg text-xs shadow-sm">
                    Local
                  </button>
                  <button className="py-2 text-gray-500 font-bold rounded-lg text-xs bg-gray-200/40">
                    Remote
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 px-1">
                    Database URL
                  </label>
                  <input
                    type="text"
                    defaultValue="https://example-db.internal"
                    className="w-full p-3 bg-white border border-gray-200 rounded-[18px] text-xs font-semibold focus:outline-none"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <button className="py-3 bg-gray-100 text-gray-400 font-bold text-xs rounded-full cursor-not-allowed">
                  Save
                </button>
                <button className="py-3 border border-gray-200 text-gray-800 font-bold text-xs rounded-full bg-gray-50">
                  Clear
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN: SETTINGS-MAIN (Screenshot_20260708_222233_mobile-agent.jpg) */}
          {activeScreen === "settings-main" && (
            <motion.div
              key="settings-main"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 bg-white h-full justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={() => onNavigate("tool")}
                    className="p-1 bg-gray-100 rounded-lg text-gray-700"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h2 className="text-md font-bold text-gray-900">Settings</h2>
                </div>

                {/* Settings list */}
                <div className="bg-gray-50 border border-gray-100 rounded-[24px] overflow-hidden divide-y divide-gray-200/40 mb-4">
                  <div className="flex justify-between items-center p-3.5 bg-gray-100/30 cursor-pointer">
                    <span className="font-semibold text-gray-800 text-xs">
                      Providers
                    </span>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <span>6</span> <ChevronRight size={14} />
                    </div>
                  </div>
                  <div
                    onClick={() => onNavigate("built-in-tools")}
                    className="flex justify-between items-center p-3.5 bg-gray-100/30 cursor-pointer"
                  >
                    <span className="font-semibold text-gray-800 text-xs">
                      Built-in tools
                    </span>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <span>8 active</span> <ChevronRight size={14} />
                    </div>
                  </div>
                  <div
                    onClick={() => onNavigate("mcp-server")}
                    className="flex justify-between items-center p-3.5 bg-gray-100/30 cursor-pointer"
                  >
                    <span className="font-semibold text-gray-800 text-xs">
                      MCP servers
                    </span>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <span>2 active</span> <ChevronRight size={14} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3.5 opacity-60">
                    <span className="font-semibold text-gray-800 text-xs">
                      Skills
                    </span>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <span>0 active</span> <ChevronRight size={14} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3.5 opacity-60">
                    <span className="font-semibold text-gray-800 text-xs">
                      Memory
                    </span>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <span>0 saved</span> <ChevronRight size={14} />
                    </div>
                  </div>
                  <div
                    onClick={() => onNavigate("model-select")}
                    className="flex justify-between items-center p-3.5 bg-gray-100/30 cursor-pointer"
                  >
                    <span className="font-semibold text-gray-800 text-xs">
                      Current model
                    </span>
                    <div className="flex items-center text-gray-400 text-xs gap-1 max-w-[50%] truncate">
                      <span className="truncate">Gemini 2.5 Flash Lite</span>{" "}
                      <ChevronRight size={14} />
                    </div>
                  </div>
                  <div
                    onClick={() => onNavigate("db-settings")}
                    className="flex justify-between items-center p-3.5 bg-gray-100/30 cursor-pointer"
                  >
                    <span className="font-semibold text-gray-800 text-xs">
                      DB
                    </span>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <span>Local</span> <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-3.5 bg-gray-50 bg-gray-100 text-gray-800 font-bold text-xs rounded-full border border-gray-200">
                Refresh config
              </button>
            </motion.div>
          )}

          {/* SCREEN: SIDEBAR (Screenshot_20260708_222237_mobile-agent.jpg) */}
          {activeScreen === "sidebar" && (
            <motion.div
              key="sidebar"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex bg-gray-900/10 relative h-full"
            >
              <div className="w-[82%] bg-white h-full flex flex-col p-4 pb-4 justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-sm text-gray-950">
                      Mobile Agent
                    </span>
                  </div>

                  <span className="text-[10px] tracking-wider font-bold text-gray-400 block mb-2">
                    CHATS
                  </span>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center bg-black text-white p-3.5 rounded-[18px] cursor-pointer">
                      <span className="text-xs font-semibold">Hi</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3.5 rounded-[18px] cursor-pointer">
                      <span className="text-xs font-semibold text-gray-800">
                        Hi
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate("settings-main")}
                  className="flex items-center gap-3.5 p-3.5 bg-gray-50 rounded-[18px] cursor-pointer border-t border-gray-100 text-gray-800 font-bold text-xs"
                >
                  <Settings size={16} className="text-gray-500" />
                  <span>Settings</span>
                </div>
              </div>
              <div
                onClick={() => onNavigate("notion")}
                className="flex-1 h-full cursor-pointer"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modern Horizontal Gestural Swipe Indicator Pill (Replaced obsolete retro 3-buttons) */}
      <div className="h-10 flex items-center justify-center bg-white border-t border-gray-50 select-none pb-1.5">
        <div className="w-24 h-1.5 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};
