"use client"

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { Check, Search, X } from "lucide-react"
import ClubCrest from "@/components/Clubs/ClubCrest"
import type { ClubOption } from "@/hooks/useFixturesFilter"

type Props = {
  clubs: ClubOption[]
  value: string
  onChange: (club: string) => void
}

const MAX_RESULTS = 50

/** Best matches first: name starts with the query, then a word starts with it, then it appears anywhere */
function rankClubs(clubs: ClubOption[], query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return clubs
  const score = (name: string) => {
    const n = name.toLowerCase()
    if (n.startsWith(q)) return 0
    if (n.split(/\s+/).some((w) => w.startsWith(q))) return 1
    return n.includes(q) ? 2 : -1
  }
  return clubs
    .map((c) => ({ c, s: score(c.name) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => a.s - b.s || a.c.name.localeCompare(b.c.name))
    .map((x) => x.c)
}

/** Bold the part of the name that matches what was typed */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent font-bold text-inherit">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}

export default function ClubSearch({ clubs, value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = useId()

  // When a club is picked exactly, show the full list on reopen rather than just that club
  const isExact = clubs.some((c) => c.name === value)
  const query = isExact ? "" : value
  const results = useMemo(() => rankClubs(clubs, query).slice(0, MAX_RESULTS), [clubs, query])
  const active = Math.min(highlighted, results.length - 1)

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
    if (open) listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" })
  }, [open, active])

  const select = (club: string) => {
    onChange(club)
    setOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (!open) setOpen(true)
        else setHighlighted(Math.min(results.length - 1, active + 1))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlighted(Math.max(0, active - 1))
        break
      case "Enter":
        if (open && results[active]) {
          e.preventDefault()
          select(results[active].name)
        }
        break
      case "Escape":
        if (open) setOpen(false)
        else if (value) onChange("")
        break
      case "Tab":
        setOpen(false)
        break
    }
  }

  return (
    <div ref={rootRef} className="relative flex-1 min-w-[180px] sm:flex-none">
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search clubs
      </label>
      {isExact ? (
        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
          <ClubCrest name={value} size="sm" />
        </span>
      ) : (
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
      )}
      <input
        ref={inputRef}
        id={`${listId}-input`}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setHighlighted(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search for a club"
        className={`w-full sm:w-64 h-10 rounded-full border bg-[var(--md-surface-container-lowest)] ${isExact ? "pl-10 font-medium" : "pl-9"} pr-9 text-sm text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] ${
          value ? "border-[var(--md-primary)]" : "border-[var(--md-outline-variant)]"
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("")
            inputRef.current?.focus()
          }}
          aria-label="Clear club search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container)]"
        >
          <X className="w-4 h-4" aria-hidden />
        </button>
      )}

      {open && (
        <div className="absolute z-40 mt-2 w-full sm:w-80 sm:right-0 lg:right-auto overflow-hidden bg-[var(--md-surface-container-lowest)] border border-[var(--md-outline-variant)] rounded-2xl shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[var(--md-on-surface-variant)]">
              No clubs match &ldquo;{query.trim()}&rdquo;
              <span className="block mt-1 text-xs">Try a different spelling, or change the league or season.</span>
            </p>
          ) : (
            <>
              <p className="px-4 pt-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--md-on-surface-variant)]">
                {query.trim() ? `${results.length} club${results.length === 1 ? "" : "s"} found` : `${clubs.length} clubs`}
              </p>
              <ul ref={listRef} id={listId} role="listbox" aria-label="Clubs" className="max-h-80 overflow-auto pb-1">
                {results.map((club, i) => {
                  const selected = club.name === value
                  return (
                    <li
                      key={club.name}
                      id={`${listId}-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setHighlighted(i)}
                      // Keep focus in the input so the list doesn't close before the click lands
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => select(club.name)}
                      className={`mx-1 px-2 py-1.5 flex items-center gap-3 rounded-xl cursor-pointer text-sm ${
                        i === active
                          ? "bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]"
                          : "text-[var(--md-on-surface)]"
                      }`}
                    >
                      <ClubCrest name={club.name} />
                      <span className={`flex-1 min-w-0 truncate ${selected ? "font-semibold" : "font-medium"}`}>
                        <Highlight text={club.name} query={query} />
                      </span>
                      <span className="shrink-0 text-xs tabular-nums opacity-70">
                        {club.matches} match{club.matches === 1 ? "" : "es"}
                      </span>
                      {selected && <Check className="w-4 h-4 shrink-0 text-[var(--md-primary)]" aria-hidden />}
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}
