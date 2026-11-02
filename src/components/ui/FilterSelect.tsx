"use client"

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import { Check, ChevronDown } from "lucide-react"

export type FilterOption = {
  value: string
  label: string
  /** Smaller second line, e.g. a sponsor name */
  description?: string
  /** Shown at the start of the option and in the button when selected */
  icon?: ReactNode
  /** Shown at the end of the option, e.g. a match count */
  meta?: ReactNode
}

type Props = {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  /** Screen-reader name, e.g. "League" */
  label: string
  /** Tailwind width classes for the button, e.g. "sm:w-56" */
  className?: string
  /** Which edge the menu lines up with */
  align?: "left" | "right"
}

/** Pill-shaped dropdown for filter bars, with icons and counts. Looks like the club search */
export default function FilterSelect({ options, value, onChange, label, className = "", align = "left" }: Props) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = useId()

  const current = options.find((o) => o.value === value) ?? options[0]

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  // Keep the highlighted option in view while using the arrow keys
  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${highlighted}"]`)?.scrollIntoView({ block: "nearest" })
  }, [open, highlighted])

  const openList = () => {
    setHighlighted(Math.max(0, options.findIndex((o) => o.value === value)))
    setOpen(true)
  }

  const select = (v: string) => {
    onChange(v)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlighted((i) => Math.min(options.length - 1, i + 1))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlighted((i) => Math.max(0, i - 1))
        break
      case "Home":
        e.preventDefault()
        setHighlighted(0)
        break
      case "End":
        e.preventDefault()
        setHighlighted(options.length - 1)
        break
      case "Enter":
      case " ":
        e.preventDefault()
        if (options[highlighted]) select(options[highlighted].value)
        break
      case "Escape":
        e.preventDefault()
        setOpen(false)
        buttonRef.current?.focus()
        break
      case "Tab":
        setOpen(false)
        break
    }
  }

  return (
    <div ref={rootRef} className="relative flex-1 min-w-[140px] sm:flex-none" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${current?.label}`}
        className={`w-full ${className} h-10 flex items-center gap-2 rounded-full border bg-[var(--md-surface-container-lowest)] pl-2 pr-3 text-sm font-medium text-[var(--md-on-surface)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] transition-colors ${
          open ? "border-[var(--md-primary)]" : "border-[var(--md-outline-variant)]"
        }`}
      >
        {current?.icon}
        <span className="flex-1 min-w-0 truncate text-left">{current?.label}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-[var(--md-on-surface-variant)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          className={`absolute z-40 mt-2 w-full min-w-[16rem] max-h-80 overflow-auto py-1 bg-[var(--md-surface-container-lowest)] border border-[var(--md-outline-variant)] rounded-2xl shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((o, i) => {
            const selected = o.value === value
            return (
              <li
                key={o.value}
                data-index={i}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => select(o.value)}
                className={`mx-1 px-2 py-1.5 flex items-center gap-3 rounded-xl cursor-pointer text-sm ${
                  i === highlighted
                    ? "bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]"
                    : "text-[var(--md-on-surface)]"
                }`}
              >
                {o.icon}
                <span className="flex-1 min-w-0">
                  <span className={`block truncate ${selected ? "font-semibold" : "font-medium"}`}>{o.label}</span>
                  {o.description && <span className="block truncate text-xs opacity-70">{o.description}</span>}
                </span>
                {o.meta !== undefined && <span className="shrink-0 text-xs tabular-nums opacity-70">{o.meta}</span>}
                <Check className={`w-4 h-4 shrink-0 text-[var(--md-primary)] ${selected ? "" : "invisible"}`} aria-hidden />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
