import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Trophy, Users } from "lucide-react";
import { leagueHistory, type HistoryDecade, type HistoryPhoto, type HistorySeason } from "@/data/leagueHistory";
import { buttonStyles } from "@/components/ui/Button";
import PhotoGallery from "../PhotoGallery";
import SeasonNav from "./SeasonNav";

const seasonId = (s: HistorySeason) => `season-${s.season.replace("/", "-")}`;

function DecadeSwitcher({ current }: { current: string }) {
  return (
    <nav aria-label="Decades" className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {leagueHistory.map((d) => (
        <Link
          key={d.slug}
          href={`/about/history/${d.slug}`}
          aria-current={d.slug === current ? "page" : undefined}
          className={buttonStyles({ variant: d.slug === current ? "inverse" : "glass", size: "sm" })}
        >
          {d.slug}
        </Link>
      ))}
    </nav>
  );
}

function InlinePhotos({ photos }: { photos: HistoryPhoto[] }) {
  if (photos.length === 0) return null;
  const single = photos.length === 1;
  return (
    <div className={`mt-6 grid gap-4 ${single ? "grid-cols-1" : photos.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
      {photos.map((photo) => (
        <figure key={photo.src} className="min-w-0">
          <div className={`relative overflow-hidden rounded-xl bg-[var(--md-surface-container)] shadow-sm ${single ? "aspect-video" : "aspect-[4/3]"}`}>
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover"
              sizes={single ? "(max-width: 1024px) 100vw, 768px" : "(max-width: 640px) 50vw, 256px"}
            />
          </div>
          <figcaption className="mt-2 text-xs sm:text-sm text-[var(--md-on-surface-variant)] leading-snug">{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function SeasonSection({ season }: { season: HistorySeason }) {
  return (
    <section id={seasonId(season)} className="scroll-mt-28">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-2xl font-bold text-[var(--md-on-surface)]">{season.season}</h3>
        <span className="text-sm font-medium text-[var(--md-primary)]">{season.league}</span>
      </div>

      <div className="mt-4 space-y-4 text-[var(--md-on-surface-variant)] leading-relaxed">
        {season.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <InlinePhotos photos={season.photos} />

      {(season.results.length > 0 || season.officers) && (
        <div className="mt-6 rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] overflow-hidden">
          {season.results.length > 0 && (
            <table className="w-full text-sm">
              <caption className="sr-only">{season.season} honours</caption>
              <thead className="bg-[var(--md-surface-container)] text-xs uppercase tracking-wider text-[var(--md-on-surface-variant)]">
                <tr>
                  <th scope="col" className="text-left font-semibold px-4 py-2.5">Competition</th>
                  <th scope="col" className="text-left font-semibold px-4 py-2.5">Winner</th>
                  <th scope="col" className="text-left font-semibold px-4 py-2.5 hidden sm:table-cell">Runner-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--md-outline-variant)]">
                {season.results.map((r) => (
                  <tr key={r.competition}>
                    <th scope="row" className="text-left font-medium px-4 py-3 text-[var(--md-on-surface-variant)]">
                      {r.competition}
                    </th>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--md-on-surface)]">
                        <Trophy className="w-4 h-4 text-amber-500 shrink-0" aria-hidden />
                        {r.winner}
                      </span>
                      {r.runnerUp && (
                        <span className="block sm:hidden text-xs text-[var(--md-on-surface-variant)] mt-0.5">
                          Runner-up: {r.runnerUp}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--md-on-surface-variant)] hidden sm:table-cell">{r.runnerUp || "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {season.officers && (
            <p className="flex gap-2 px-4 py-3 text-xs text-[var(--md-on-surface-variant)] bg-[var(--md-surface-container-low)] border-t border-[var(--md-outline-variant)]">
              <Users className="w-4 h-4 shrink-0" aria-hidden />
              {season.officers}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default function DecadeStory({ decade }: { decade: HistoryDecade }) {
  const index = leagueHistory.findIndex((d) => d.slug === decade.slug);
  const prev = leagueHistory[index - 1];
  const next = leagueHistory[index + 1];

  return (
    <article className="bg-[var(--md-surface)] min-h-screen">
      {/* Hero */}
      <header className="relative isolate overflow-hidden bg-[var(--md-primary)] text-[var(--md-on-primary)]">
        <Image src={decade.cover} alt="" fill priority className="object-cover -z-10 opacity-25" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--md-primary)] via-[var(--md-primary)]/90 to-[var(--md-primary)]/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <Link
            href="/about/history"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white hover:underline underline-offset-4"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            League history
          </Link>
          <p className="mt-6 inline-block rounded-full bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] text-xs font-bold px-3 py-1">
            {decade.years}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">{decade.title}</h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl">{decade.summary}</p>
          <div className="mt-8">
            <DecadeSwitcher current={decade.slug} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Season jump list */}
        <aside className="lg:col-span-3">
          <SeasonNav
            items={[
              ...decade.seasons.map((s) => ({ id: seasonId(s), label: s.season })),
              { id: "photos", label: "Photos" },
            ]}
          />
        </aside>

        <div className="lg:col-span-9 max-w-3xl space-y-14">
          {decade.intro.length > 0 && (
            <div className="space-y-4 text-lg text-[var(--md-on-surface)] leading-relaxed">
              {decade.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <InlinePhotos photos={decade.introPhotos} />
            </div>
          )}

          {decade.seasons.map((s) => (
            <SeasonSection key={s.season} season={s} />
          ))}

          <div id="photos" className="scroll-mt-28">
            <PhotoGallery title={`All photos from the ${decade.slug}`} images={decade.photos} />
          </div>

          {/* Previous / next decade */}
          <nav aria-label="More history" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--md-outline-variant)]">
            {prev ? (
              <Link
                href={`/about/history/${prev.slug}`}
                className="group rounded-2xl border border-[var(--md-outline-variant)] p-4 hover:border-[var(--md-primary)] hover:bg-[var(--md-surface-container-low)] transition-colors"
              >
                <span className="flex items-center gap-1 text-xs text-[var(--md-on-surface-variant)]">
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden /> Previous decade
                </span>
                <span className="mt-1 block font-bold text-[var(--md-on-surface)] group-hover:text-[var(--md-primary)]">
                  {prev.years}: {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/about/history/${next.slug}`}
                className="group rounded-2xl border border-[var(--md-outline-variant)] p-4 text-right hover:border-[var(--md-primary)] hover:bg-[var(--md-surface-container-low)] transition-colors"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-[var(--md-on-surface-variant)]">
                  Next decade <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                </span>
                <span className="mt-1 block font-bold text-[var(--md-on-surface)] group-hover:text-[var(--md-primary)]">
                  {next.years}: {next.title}
                </span>
              </Link>
            )}
          </nav>

          <p className="text-sm italic text-[var(--md-on-surface-variant)]">
            With thanks to <em>The Meath Chronicle</em>, and in particular Conall Collier, for their help with the history
            of the league.
          </p>
        </div>
      </div>
    </article>
  );
}
