"use client";

// src/components/Management/NewsManagement/NewsList.tsx
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Archive, ChevronDown, ExternalLink, FilePen, Plus, Search, SearchX, Send, Trash2, X } from "lucide-react";
import { newsPosts } from "@/data/newsPosts";
import { adminUsers, canDelete, currentUser } from '@/data/adminUsers';
import { assetUrl } from "@/utils/assetUrl";
import { buttonStyles } from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { ConfirmDialog, Notice, RowCheckbox, SelectionBar, selectableRow, selectOnRowClick, useNotice, useSelection, type PendingConfirm } from "../Selection";

type Status = "published" | "draft" | "archived";

type Article = {
  id: string;
  title: string;
  slug: string;
  image: string;
  date: string;
  tags: string[];
  author: string;
  status: Status;
};

const statusLabel: Record<Status, string> = { published: "Published", draft: "Draft", archived: "Archived" };
const statusBadge: Record<Status, string> = {
  published: "bg-emerald-100 text-emerald-800",
  draft: "bg-amber-100 text-amber-800",
  archived: "bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)]",
};

// Site articles with a mock status and author (until there's a CMS)
const editors = adminUsers.filter((u) => u.role !== "admin" && u.status === "active").map((u) => u.name);
const initialArticles: Article[] = newsPosts.map((p, i) => ({
  id: String(p.id),
  title: p.title,
  slug: p.slug,
  image: p.image,
  date: p.date,
  tags: p.tags,
  author: editors[i % editors.length],
  status: i % 9 === 4 ? "draft" : i === newsPosts.length - 1 ? "archived" : "published",
}));

const PAGE_SIZE = 8;

type Props = {
  onAddNews?: () => void;
};

export default function NewsList({ onAddNews }: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [pending, setPending] = useState<PendingConfirm | null>(null);
  const [notice, setNotice] = useNotice();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => status === "all" || a.status === status)
      .filter((a) => !q || `${a.title} ${a.tags.join(" ")} ${a.author}`.toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [articles, query, status]);

  const selection = useSelection(matches.map((a) => a.id));
  const mayDelete = canDelete(currentUser.role);
  const chosen = articles.filter((a) => selection.isSelected(a.id));

  // Pagination, back to page 1 when filters change
  const filterKey = JSON.stringify([query, status]);
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 });
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const page = pageState.key === filterKey ? Math.min(pageState.page, totalPages) : 1;
  const pageItems = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setStatusFor = (items: Article[], next: Status) => {
    const ids = new Set(items.map((a) => a.id));
    setArticles((list) => list.map((a) => (ids.has(a.id) ? { ...a, status: next } : a)));
    const what = items.length === 1 ? `"${items[0].title}"` : `${items.length} articles`;
    setNotice(next === "published" ? `${what} published.` : next === "draft" ? `${what} moved to drafts.` : `${what} archived.`);
  };

  const askDelete = (items: Article[]) =>
    setPending({
      title: items.length === 1 ? "Delete article?" : `Delete ${items.length} articles?`,
      message: "They'll be removed from the website straight away. This can't be undone.",
      names: items.map((a) => a.title),
      confirmLabel: "Delete",
      danger: true,
      onConfirm: () => {
        const ids = items.map((a) => a.id);
        setArticles((list) => list.filter((a) => !ids.includes(a.id)));
        selection.remove(ids);
        setNotice(items.length === 1 ? "Article deleted." : `${items.length} articles deleted.`);
      },
    });

  const notIn = (s: Status) => chosen.filter((a) => a.status !== s);

  const hasFilters = query.trim() !== "" || status !== "all";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="relative flex-1 min-w-[220px]">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tag or author"
            className="w-full h-10 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] pl-9 pr-4 text-sm text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]"
          />
        </label>
        <label className="relative w-full sm:w-44">
          <span className="sr-only">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status | "all")}
            className={`h-10 w-full appearance-none rounded-full border pl-4 pr-9 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] ${
              status !== "all"
                ? "border-[var(--md-primary)] bg-[var(--md-primary-container)]/40 text-[var(--md-on-primary-container)]"
                : "border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] text-[var(--md-on-surface)]"
            }`}
          >
            <option value="all">Any status</option>
            {(Object.keys(statusLabel) as Status[]).map((s) => (
              <option key={s} value={s}>
                {statusLabel[s]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden />
        </label>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatus("all");
            }}
            className={buttonStyles({ variant: "outline", size: "sm", className: "h-10" })}
          >
            <X className="w-4 h-4" aria-hidden />
            Reset Filters
          </button>
        )}
        {onAddNews && (
          <button type="button" onClick={onAddNews} className={buttonStyles({ size: "sm", className: "h-10 sm:ml-auto" })}>
            <Plus className="w-4 h-4" aria-hidden />
            New article
          </button>
        )}
      </div>

      <Notice text={notice} />

      {matches.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--md-outline-variant)]">
          <SearchX className="mx-auto w-12 h-12 text-[var(--md-on-surface-variant)]/60" aria-hidden />
          <h3 className="mt-4 text-lg font-semibold text-[var(--md-on-surface)]">No articles found</h3>
        </div>
      ) : (
        <>
          <SelectionBar
            total={matches.length}
            noun="articles"
            selection={selection}
            items={[
              { label: "Publish", icon: <Send className="w-4 h-4" aria-hidden />, count: notIn("published").length, onSelect: () => setStatusFor(notIn("published"), "published") },
              { label: "Move to drafts", icon: <FilePen className="w-4 h-4" aria-hidden />, count: notIn("draft").length, onSelect: () => setStatusFor(notIn("draft"), "draft") },
              { label: "Archive", icon: <Archive className="w-4 h-4" aria-hidden />, count: notIn("archived").length, onSelect: () => setStatusFor(notIn("archived"), "archived") },
              ...(mayDelete ? [{ label: "Delete", icon: <Trash2 className="w-4 h-4" aria-hidden />, count: chosen.length, danger: true, divider: true, onSelect: () => askDelete(chosen) }] : []),
            ]}
          />

          <ul className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm divide-y divide-[var(--md-outline-variant)]">
            {pageItems.map((a) => {
              const isSel = selection.isSelected(a.id);
              return (
                <li
                  key={a.id}
                  onClick={selectOnRowClick(() => selection.toggle(a.id))}
                  className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 first:rounded-t-2xl last:rounded-b-2xl ${selectableRow(isSel)}`}
                >
                  <RowCheckbox checked={isSel} onChange={() => selection.toggle(a.id)} label={a.title} />
                  <span className="relative hidden sm:block h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--md-surface-container)]">
                    <Image src={assetUrl(a.image)} alt="" fill className="object-cover" sizes="80px" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[var(--md-on-surface)] line-clamp-1">{a.title}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--md-on-surface-variant)]">
                      <span className={`rounded-full px-2 py-0.5 font-semibold ${statusBadge[a.status]}`}>{statusLabel[a.status]}</span>
                      <span>{new Date(`${a.date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>· {a.author}</span>
                      <span className="hidden md:inline">· {a.tags.join(", ")}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Link href={`/news/${a.slug}`} target="_blank" className={buttonStyles({ variant: "ghost", size: "icon-sm" })} aria-label={`View "${a.title}" on the site`} title="View on site">
                      <ExternalLink className="w-4 h-4" aria-hidden />
                    </Link>
                    {mayDelete && (
                      <button type="button" onClick={() => askDelete([a])} className={buttonStyles({ variant: "danger-ghost", size: "icon-sm" })} aria-label={`Delete "${a.title}"`} title="Delete">
                        <Trash2 className="w-4 h-4" aria-hidden />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4">
            <Pagination page={page} totalPages={totalPages} onPageChange={(p) => setPageState({ key: filterKey, page: p })} label="Article pages" />
          </div>
        </>
      )}

      <ConfirmDialog pending={pending} onClose={() => setPending(null)} />
    </div>
  );
}
