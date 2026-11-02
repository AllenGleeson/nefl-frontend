"use client"

import type { MouseEvent } from "react"
import { useRouter } from "next/navigation"

/**
 * Makes a whole table row open a page when clicked.
 * Keep a real <Link> inside the row too, so keyboard users, screen readers and
 * ctrl/middle-click still work; clicks on that link are left to the link itself.
 *
 *   const rowLink = useRowLink()
 *   <tr {...rowLink(href)} className={href ? "cursor-pointer hover:..." : "cursor-default"}>
 */
export function useRowLink() {
  const router = useRouter()

  return (href: string | null | undefined) =>
    href
      ? {
          onClick: (e: MouseEvent<HTMLTableRowElement>) => {
            if ((e.target as HTMLElement).closest("a")) return
            // Don't navigate when someone is just selecting text in the row
            if (window.getSelection()?.toString()) return
            router.push(href)
          },
        }
      : {}
}
