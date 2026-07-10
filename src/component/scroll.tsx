"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  MessageSquareText,
  Workflow,
} from "lucide-react";

import { AppMockup, ScreenKey } from "./appMockup";

type StoryItem = {
  screen: ScreenKey;
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const stories: StoryItem[] = [
  {
    screen: "notion",
    eyebrow: "Ask naturally",
    title: "Begin with a simple question.",
    description:
      "Tell the agent what you need in normal language and start working immediately.",
    icon: MessageSquareText,
  },
  {
    screen: "file-selection-option",
    eyebrow: "Local files",
    title: "Bring local files into context.",
    description:
      "Type @ and select, browse, or create files without leaving the conversation.",
    icon: FileText,
  },
  {
    screen: "tool",
    eyebrow: "Tool approval",
    title: "Stay in control of important actions.",
    description:
      "Sensitive tool calls pause until you allow or deny them from the phone.",
    icon: CheckCircle2,
  },
  {
    screen: "mcp-server",
    eyebrow: "MCP servers",
    title: "Connect any MCP server.",
    description:
      "Add remote tools such as Notion or Cloudflare and keep every action visible.",
    icon: Workflow,
  },
];

function PhoneFrame({ screen }: { screen: ScreenKey }) {
  return (
    <div
      className="
        relative
        w-[260px]
        sm:w-[250px]
        md:w-[min(80%,280px)]
      "
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[52px] bg-blue-500/15 blur-3xl md:-inset-8" />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative aspect-[10/15.8]
          rounded-[28px]
          border border-slate-300
          bg-[#e7ebf1]
          p-1.5
          shadow-[0_24px_70px_rgba(15,23,42,0.22)]
          md:rounded-[30px]
        "
      >
        <div className="absolute left-1/2 top-0 z-20 h-3 w-16 -translate-x-1/2 rounded-b-lg bg-black" />

        <div className="relative h-full overflow-hidden rounded-[24px] border border-white bg-white md:rounded-[26px]">
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: "131.58%",
              height: "131.58%",
              transform: "scale(0.76)",
            }}
          >
            <AppMockup activeScreen={screen} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ScrollProductExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const wheelAmountRef = useRef(0);
  const transitionLockRef = useRef(false);
  const engagedRef = useRef(false);
  const exitDirectionRef = useRef<"up" | "down" | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const active = stories[activeIndex];

  const updateActiveIndex = (nextIndex: number) => {
    const safeIndex = Math.max(0, Math.min(nextIndex, stories.length - 1));

    activeIndexRef.current = safeIndex;
    setActiveIndex(safeIndex);
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const handleWheel = (event: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

      const isProperlyCentered =
        distanceFromCenter <= 20 &&
        Math.abs(rect.top) <= 20 &&
        Math.abs(rect.bottom - viewportHeight) <= 20;

      /*
       * Once the section has been released, allow it to move
       * away before it can capture scrolling again.
       */
      if (exitDirectionRef.current === "down") {
        if (rect.top < -80) {
          exitDirectionRef.current = null;
        }

        return;
      }

      if (exitDirectionRef.current === "up") {
        if (rect.top > 80) {
          exitDirectionRef.current = null;
        }

        return;
      }

      /*
       * Do not start changing steps until this section is
       * completely centered in the viewport.
       */
      if (!engagedRef.current) {
        if (!isProperlyCentered) return;

        event.preventDefault();

        window.scrollTo({
          top: window.scrollY + rect.top,
          behavior: "auto",
        });

        engagedRef.current = true;
        wheelAmountRef.current = 0;

        return;
      }

      const currentIndex = activeIndexRef.current;
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      const canMoveForward = scrollingDown && currentIndex < stories.length - 1;

      const canMoveBackward = scrollingUp && currentIndex > 0;

      /*
       * Step 4 finished:
       * release scrolling to the next page section.
       */
      if (scrollingDown && !canMoveForward) {
        engagedRef.current = false;
        exitDirectionRef.current = "down";
        wheelAmountRef.current = 0;

        return;
      }

      /*
       * Step 1 and scrolling upward:
       * release scrolling to the previous page section.
       */
      if (scrollingUp && !canMoveBackward) {
        engagedRef.current = false;
        exitDirectionRef.current = "up";
        wheelAmountRef.current = 0;

        return;
      }

      event.preventDefault();

      if (transitionLockRef.current) return;

      /*
       * Reset accumulated wheel movement when direction changes.
       */
      if (
        wheelAmountRef.current !== 0 &&
        Math.sign(wheelAmountRef.current) !== Math.sign(event.deltaY)
      ) {
        wheelAmountRef.current = 0;
      }

      wheelAmountRef.current += event.deltaY;

      const scrollThreshold = 80;

      if (Math.abs(wheelAmountRef.current) < scrollThreshold) {
        return;
      }

      const nextIndex = scrollingDown ? currentIndex + 1 : currentIndex - 1;

      updateActiveIndex(nextIndex);

      wheelAmountRef.current = 0;
      transitionLockRef.current = true;

      window.setTimeout(() => {
        transitionLockRef.current = false;
      }, 500);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const startY = touchStartYRef.current;
    const endY = event.changedTouches[0]?.clientY;

    touchStartYRef.current = null;

    if (startY === null || endY === undefined) return;
    if (transitionLockRef.current) return;

    const rect = sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    const isCentered =
      Math.abs(rect.top) <= 40 &&
      Math.abs(rect.bottom - window.innerHeight) <= 40;

    if (!isCentered) return;

    const swipeDistance = startY - endY;
    const swipeThreshold = 45;

    if (Math.abs(swipeDistance) < swipeThreshold) {
      return;
    }

    const currentIndex = activeIndexRef.current;
    const swipingUp = swipeDistance > 0;
    const swipingDown = swipeDistance < 0;

    /*
     * Swipe upward: move to the next phone screen.
     */
    if (swipingUp && currentIndex < stories.length - 1) {
      updateActiveIndex(currentIndex + 1);
    } else if (swipingDown && currentIndex > 0) {
      /*
       * Swipe downward: move to the previous phone screen.
       */
      updateActiveIndex(currentIndex - 1);
    } else {
      /*
       * At first or final screen, normal page scrolling
       * is allowed.
       */
      return;
    }

    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    transitionLockRef.current = true;

    window.setTimeout(() => {
      transitionLockRef.current = false;
    }, 450);
  };

  return (
    <section
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[100svh] min-h-[500px] overflow-hidden"
    >
      <div className="flex h-full items-center px-3 py-3 sm:px-5 sm:py-5 lg:px-10">
        <div
          className="
            relative mx-auto
            h-[calc(100svh-90px)]
            w-full max-w-[1280px]
            overflow-hidden
            rounded-[26px]
            border border-slate-100
            bg-white
            shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
            sm:h-[calc(100svh-40px)]
            sm:rounded-[32px]
            md:h-[85vh]
            md:rounded-[36px]
          "
        >
          {/* Mobile layout: only phone and steps */}
          <div className="flex h-full flex-col md:hidden">
            <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-5">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Step {activeIndex + 1}
              </span>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">
                {activeIndex + 1} / {stories.length}
              </span>
            </div>

            {/* Phone only */}
            <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-2">
              <AnimatePresence mode="wait">
                <PhoneFrame key={active.screen} screen={active.screen} />
              </AnimatePresence>
            </div>

            {/* Mobile step controls */}
            <div className="shrink-0 px-5 pb-5 pt-2">
              <div className="relative flex items-start justify-between">
                {/* Connecting line */}
                <div className="absolute left-[12.5%] right-[12.5%] top-[19px] h-[2px] bg-slate-200" />

                <motion.div
                  className="absolute left-[12.5%] top-[19px] h-[2px] origin-left bg-blue-600"
                  animate={{
                    scaleX: activeIndex / (stories.length - 1),
                  }}
                  style={{
                    width: "75%",
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                />

                {stories.map((story, index) => {
                  const StoryIcon = story.icon;
                  const isActive = index === activeIndex;
                  const isCompleted = index < activeIndex;

                  return (
                    <button
                      key={story.screen}
                      type="button"
                      onClick={() => updateActiveIndex(index)}
                      aria-label={`Open step ${index + 1}`}
                      aria-current={isActive ? "step" : undefined}
                      className="relative z-10 flex w-1/4 flex-col items-center gap-2"
                    >
                      <motion.span
                        animate={{
                          scale: isActive ? 1.08 : 1,
                        }}
                        className={`
                          flex h-10 w-10 items-center justify-center
                          rounded-full border-2
                          transition-colors duration-300
                          ${
                            isActive
                              ? "border-blue-600 bg-blue-600 text-white shadow-[0_8px_20px_rgba(8,119,255,0.25)]"
                              : isCompleted
                                ? "border-blue-600 bg-white text-blue-600"
                                : "border-slate-200 bg-white text-slate-400"
                          }
                        `}
                      >
                        <StoryIcon className="h-4 w-4" />
                      </motion.span>

                      <span
                        className={`
                          text-[10px] font-bold
                          ${isActive ? "text-blue-600" : "text-slate-400"}
                        `}
                      >
                        0{index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-center text-[10px] font-medium text-slate-400">
                Click to change screen
              </p>
            </div>
          </div>

          {/* Laptop and desktop: previous layout unchanged */}
          <div className="hidden h-full grid-cols-2 items-center md:grid">
            <div className="flex h-full flex-col justify-center px-12 lg:px-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.screen}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    {active.eyebrow}
                  </span>

                  <h2 className="mt-4 text-4xl font-extrabold leading-tight text-slate-950 lg:text-5xl">
                    {active.title}
                  </h2>

                  <p className="mt-6 text-lg leading-relaxed text-slate-600">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 grid max-w-sm grid-cols-4 gap-3">
                {stories.map((story, index) => (
                  <button
                    key={story.screen}
                    type="button"
                    onClick={() => updateActiveIndex(index)}
                    aria-label={`Open step ${index + 1}`}
                    className="py-2"
                  >
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        className="h-full bg-blue-600"
                        animate={{
                          scaleX: index <= activeIndex ? 1 : 0,
                        }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex h-full items-center justify-center">
              <AnimatePresence mode="wait">
                <PhoneFrame key={active.screen} screen={active.screen} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
