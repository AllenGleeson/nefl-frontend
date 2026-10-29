"use client";
import { useState, useEffect, useRef, type KeyboardEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { newsPosts } from "@/data/newsPosts";
import { assetUrl } from "@/utils/assetUrl";
import { buttonStyles } from "@/components/ui/Button";

// Map slides to newsPosts - using first 10 posts
const slides = [
  {
    id: 0,
    roofline: "North East Football League",
    title: "Premier Football Experience",
    desc: "The premier football league in the North East. Follow your favorite teams, check fixtures, and stay updated with the latest results.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-9.webp"),
    slug: newsPosts[0]?.slug || "",
  },
  {
    id: 1,
    roofline: "Matchday Preview",
    title: "Upcoming Big Clash",
    desc: "Don't miss this weekend's big clash — get your tickets now and support your team!",
    cta1: "Read More",
    img: assetUrl("/images/news/news-2.webp"),
    slug: newsPosts[1]?.slug || "",
  },
  {
    id: 2,
    roofline: "League Highlights",
    title: "Weekly Action Recap",
    desc: "Catch up with last week's goals, saves, and key moments in our highlights reel.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-10.webp"),
    slug: newsPosts[2]?.slug || "",
  },
  {
    id: 3,
    roofline: "Player Spotlight",
    title: "Rising Star of the Month",
    desc: "Meet the young talent making waves in the league. Discover their journey from academy to first team.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-11.webp"),
    slug: newsPosts[3]?.slug || "",
  },
  {
    id: 4,
    roofline: "Transfer News",
    title: "January Window Updates",
    desc: "Stay informed about all the latest transfers, signings, and contract renewals across the league.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-5.webp"),
    slug: newsPosts[4]?.slug || "",
  },
  {
    id: 5,
    roofline: "Match Analysis",
    title: "Tactical Breakdown",
    desc: "Deep dive into the strategies, formations, and key moments that shaped this week's biggest matches.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-6.webp"),
    slug: newsPosts[5]?.slug || "",
  },
  {
    id: 6,
    roofline: "Fan Zone",
    title: "Community Stories",
    desc: "Celebrate the passionate fans, local heroes, and community initiatives that make our league special.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-9.webp"),
    slug: newsPosts[6]?.slug || "",
  },
  {
    id: 7,
    roofline: "Youth Development",
    title: "Academy Excellence",
    desc: "Discover how our youth academies are developing the next generation of football stars.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-2.webp"),
    slug: newsPosts[7]?.slug || "",
  },
  {
    id: 8,
    roofline: "Referee Corner",
    title: "Fair Play Focus",
    desc: "Learn about the latest rule changes, VAR updates, and how we're improving the game experience.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-10.webp"),
    slug: newsPosts[8]?.slug || "",
  },
  {
    id: 9,
    roofline: "Season Review",
    title: "Championship Race",
    desc: "Follow the thrilling title race as teams battle for glory in the most competitive season yet.",
    cta1: "Read More",
    img: assetUrl("/images/news/news-11.webp"),
    slug: newsPosts[9]?.slug || "",
  },
];


const SLIDE_DURATION = 8000; // ms, keep in sync with .animate-progress in globals.css
const VISIBLE_TABS = 4; // tabs shown at once on desktop

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [navStartIndex, setNavStartIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Autoplay timer: tracks time left on the current slide so pausing and resuming
  // carries on where it left off (matching the progress bar).
  const remainingRef = useRef(SLIDE_DURATION);
  const startedAtRef = useRef(0);

  const slide = slides[active];
  const nextIndex = (active + 1) % slides.length;
  const autoplay = !paused && !reducedMotion;

  const goTo = (index: number) => {
    remainingRef.current = SLIDE_DURATION;
    setActive((index + slides.length) % slides.length);
  };
  const goNext = () => goTo(active + 1);
  const goPrev = () => goTo(active - 1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    startedAtRef.current = Date.now();
    const timer = setTimeout(() => {
      remainingRef.current = SLIDE_DURATION;
      setActive((prev) => (prev + 1) % slides.length);
    }, remainingRef.current);
    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAtRef.current));
    };
  }, [active, autoplay]);

  // Keep the active tab in view on desktop
  useEffect(() => {
    if (active < navStartIndex) {
      setNavStartIndex(active);
    } else if (active >= navStartIndex + VISIBLE_TABS) {
      setNavStartIndex(active - VISIBLE_TABS + 1);
    }
  }, [active, navStartIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  const articleHref = slide.slug ? `/news/${slide.slug}` : null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured stories"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      className="relative w-full max-w-screen-2xl mx-auto md:mt-3 mb-3 sm:mt-6 sm:mb-6 px-0 sm:px-4 lg:px-8"
    >
      <div className="bg-[var(--md-primary)] shadow-xl sm:shadow-2xl overflow-hidden">
        <div
          className="flex flex-col md:flex-row-reverse md:h-[460px] lg:h-[500px] xl:h-[540px] bg-[var(--md-primary)] text-[var(--md-on-primary)] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* RIGHT - IMAGE (links to the article) */}
          <div className="w-full md:w-3/5 relative h-60 sm:h-80 md:h-full group overflow-hidden">
            {articleHref ? (
              <Link href={articleHref} aria-label={`Read: ${slide.title}`} className="absolute inset-0 block">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </Link>
            ) : (
              <Image src={slide.img} alt={slide.title} fill priority className="object-cover" />
            )}

            {/* Next slide preview */}
            <button
              type="button"
              onClick={goNext}
              aria-label={`Next story: ${slides[nextIndex].title}`}
              title={`Next: ${slides[nextIndex].title}`}
              className="hidden sm:block absolute bottom-4 right-4 w-32 h-20 rounded-lg overflow-hidden border-2 border-white shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <Image src={slides[nextIndex].img} alt="" fill className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-1 left-2 right-1 flex items-center justify-between text-xs font-semibold text-white">
                Next
                <ChevronRight className="w-4 h-4" aria-hidden />
              </span>
            </button>
          </div>

          {/* LEFT - TEXT */}
          <div className="w-full md:w-2/5 h-[230px] sm:h-[250px] md:h-full px-4 py-5 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-center overflow-hidden">
            <div className="text-sm sm:text-base lg:text-lg font-medium mb-2 text-[var(--md-primary-container)] text-center md:text-left truncate">
              {slide.roofline}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 text-center md:text-left line-clamp-2">
              {articleHref ? (
                <Link href={articleHref} className="hover:underline underline-offset-4 decoration-2">
                  {slide.title}
                </Link>
              ) : (
                slide.title
              )}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-[var(--md-on-primary)]/90 text-center md:text-left line-clamp-3">
              {slide.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              {articleHref && (
                <Link href={articleHref} className={buttonStyles({ variant: "inverse", className: "group/cta" })}>
                  {slide.cta1}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="bg-[var(--md-primary)] px-4 sm:px-6 md:px-8 py-2 sm:py-6 border-t border-[var(--md-outline-variant)]">
          {/* Mobile: bar indicators (tall tap area, thin bar) */}
          <div className="flex items-center justify-center gap-1 sm:hidden">
            {slides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(index)}
                className="flex-1 max-w-[60px] py-3"
                aria-label={`Go to slide ${index + 1}: ${s.title}`}
                aria-current={index === active ? "true" : undefined}
              >
                <span
                  className={`block w-full rounded-full transition-all duration-300 ${
                    index === active ? "h-1.5 bg-[var(--md-on-primary)]" : "h-1 bg-[var(--md-on-primary)]/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Desktop: previous / tabs / next */}
          <div className="hidden sm:flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous story"
              title="Previous story"
              className={buttonStyles({ variant: "glass", size: "icon" })}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden />
            </button>

            <div className="relative flex flex-row gap-1 overflow-hidden flex-1">
              {slides.slice(navStartIndex, navStartIndex + VISIBLE_TABS).map((s, i) => {
                const index = navStartIndex + i;
                const isActive = index === active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative flex-1 min-w-0 px-4 lg:px-6 py-3 text-left rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? "text-[var(--md-on-primary)]"
                        : "text-[var(--md-on-primary)]/70 hover:text-[var(--md-on-primary)] hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`text-sm font-medium mb-1 truncate ${
                        isActive ? "text-[var(--md-primary-container)]" : "text-[var(--md-on-primary)]/60"
                      }`}
                    >
                      {s.roofline}
                    </div>
                    <div className="font-semibold text-base leading-tight truncate">{s.title}</div>
                    <div className="mt-2 h-0.5 bg-[var(--md-outline-variant)]/30 rounded-full overflow-hidden">
                      {isActive ? (
                        <div
                          key={active}
                          className={`h-full bg-[var(--md-on-primary)] ${reducedMotion ? "w-full" : "animate-progress"}`}
                          style={{ animationPlayState: autoplay ? "running" : "paused" }}
                        />
                      ) : (
                        <div className="h-full bg-[var(--md-outline-variant)]/50" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next story"
              title="Next story"
              className={buttonStyles({ variant: "glass", size: "icon" })}
            >
              <ChevronRight className="w-5 h-5" aria-hidden />
            </button>
          </div>

          {/* Announces slide changes to screen readers */}
          <p className="sr-only" aria-live={autoplay ? "off" : "polite"}>
            Story {active + 1} of {slides.length}: {slide.title}
          </p>
        </div>
      </div>
    </section>
  );
}
