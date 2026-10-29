import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { leagueHistory } from "@/data/leagueHistory";

export const metadata: Metadata = {
  title: "League History | NEFL",
  description: "The full story of the North East Football League, season by season since 1980.",
};

export default function HistoryIndexPage() {
  return (
    <div className="bg-[var(--md-surface)] min-h-screen">
      <header className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white hover:underline underline-offset-4"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            About the league
          </Link>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold">League history, in depth</h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl">
            Every season since the first kick-off on 23rd November 1980: the stories, the champions and the people who
            built the league.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leagueHistory.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/about/history/${d.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-[var(--md-surface-container-lowest)] border border-[var(--md-outline-variant)] shadow-sm hover:shadow-lg hover:border-[var(--md-primary)] transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={d.cover}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[var(--md-primary)] text-[var(--md-on-primary)] text-xs font-bold px-3 py-1 shadow">
                    {d.years}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <h2 className="text-xl font-bold text-[var(--md-on-surface)] group-hover:text-[var(--md-primary)]">
                    {d.title}
                  </h2>
                  <p className="mt-2 text-[var(--md-on-surface-variant)] leading-relaxed flex-1">{d.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--md-primary)]">
                    Read the {d.seasons.length} seasons
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
