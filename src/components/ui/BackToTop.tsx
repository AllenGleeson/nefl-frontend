"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { buttonStyles } from "./Button";

const SHOW_AFTER = 600; // px scrolled before the button appears

// Floating "back to top" button, bottom-right, shown once the page is scrolled down.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={buttonStyles({
        size: "icon",
        className: `fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 shadow-lg ring-2 ring-white/70 transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`,
      })}
    >
      <ArrowUp className="w-5 h-5" aria-hidden />
    </button>
  );
}
