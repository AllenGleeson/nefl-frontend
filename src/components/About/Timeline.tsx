import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { leagueHistory } from "@/data/leagueHistory";
import { buttonStyles } from "@/components/ui/Button";

// Short story per decade; each links to its full page under /about/history.
export default function Timeline() {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--md-primary)]">Through the decades</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">Forty years in four chapters</h2>
        </div>
        <Link href="/about/history" className={buttonStyles({ variant: "outline", size: "sm" })}>
          Full league history
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>

      <ol className="relative space-y-8 sm:space-y-10 before:absolute before:left-4 sm:before:left-1/2 before:top-2 before:bottom-2 before:w-0.5 before:-translate-x-1/2 before:bg-[var(--md-outline-variant)]">
        {leagueHistory.map((d, i) => (
          <li key={d.slug} className="relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12 items-center">
            {/* Dot on the line */}
            <span
              aria-hidden
              className="absolute left-4 sm:left-1/2 top-2 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 h-4 w-4 rounded-full bg-[var(--md-primary)] ring-4 ring-[var(--md-surface)]"
            />

            <Link
              href={`/about/history/${d.slug}`}
              tabIndex={-1}
              aria-hidden
              className={`group relative block aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-4 sm:mb-0 ${i % 2 ? "sm:order-2" : ""}`}
            >
              <Image
                src={d.cover}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>

            <div className={i % 2 ? "sm:order-1 sm:text-right" : ""}>
              <span className="inline-block rounded-full bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] text-xs font-bold px-3 py-1">
                {d.years}
              </span>
              <h3 className="mt-3 text-xl font-bold text-[var(--md-on-surface)]">{d.title}</h3>
              <p className="mt-2 text-[var(--md-on-surface-variant)] leading-relaxed">{d.summary}</p>
              <Link
                href={`/about/history/${d.slug}`}
                className={buttonStyles({ variant: "ghost", size: "sm", className: "mt-3 -mx-4" })}
              >
                Read the full story
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
