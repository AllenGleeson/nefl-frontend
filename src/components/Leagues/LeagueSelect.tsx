"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { getLeagueLogo } from "@/utils/leagueLogos";
import { assetUrl } from "@/utils/assetUrl";

type Props = {
  leagues: string[];
  value: string;
  onChange: (league: string) => void;
};

function LeagueLogo({ league }: { league: string }) {
  return (
    <span className="w-8 h-8 shrink-0 bg-[var(--md-primary-container)] rounded-full flex items-center justify-center">
      <Image
        src={assetUrl(getLeagueLogo(league))}
        alt=""
        width={20}
        height={20}
        className="w-5 h-5 object-contain"
      />
    </span>
  );
}

export default function LeagueSelect({ leagues, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const openList = () => {
    setHighlighted(Math.max(0, leagues.indexOf(value)));
    setOpen(true);
  };

  const select = (league: string) => {
    onChange(league);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlighted((i) => Math.min(leagues.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlighted((i) => Math.max(0, i - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (leagues[highlighted]) select(leagues[highlighted]);
        break;
      case "Escape":
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative w-full sm:w-auto max-w-full" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`League: ${value}`}
        className="w-full h-11 sm:h-12 pl-2 pr-3 flex items-center gap-3 bg-[var(--md-primary)] text-[var(--md-on-primary)] rounded-full shadow-sm hover:bg-[var(--md-primary-hover)] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] focus-visible:ring-offset-2"
      >
        <LeagueLogo league={value} />
        {/* Hidden copies of every name stack in one grid cell, so the button is as wide as the longest league */}
        <span className="flex-1 grid grid-cols-[minmax(0,1fr)] text-left font-semibold text-sm sm:text-base">
          {leagues.map((league) => (
            <span key={league} aria-hidden className="col-start-1 row-start-1 invisible whitespace-nowrap">
              {league}
            </span>
          ))}
          <span className="col-start-1 row-start-1 truncate">{value}</span>
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Select league"
          className="absolute z-30 mt-2 w-full max-h-80 overflow-auto py-1 bg-[var(--md-surface-container-lowest)] border border-[var(--md-outline-variant)] rounded-2xl shadow-xl"
        >
          {leagues.map((league, i) => {
            const selected = league === value;
            return (
              <li
                key={league}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => select(league)}
                className={`mx-1 px-2 py-2 flex items-center gap-3 rounded-xl cursor-pointer text-sm sm:text-base ${
                  i === highlighted
                    ? "bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]"
                    : "text-[var(--md-on-surface)]"
                }`}
              >
                <LeagueLogo league={league} />
                <span className={`flex-1 sm:whitespace-nowrap ${selected ? "font-semibold" : "font-medium"}`}>{league}</span>
                {selected && <Check className="w-4 h-4 shrink-0 text-[var(--md-primary)]" aria-hidden />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
