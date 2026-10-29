// Development of the MDL grounds: key dates (with planning details) and background.
const milestones = [
  { year: "1988", title: "22-acre site purchased", text: "Bought for £40,000 two miles from Navan on the Trim Road; half raised by the league, half borrowed from the TSB over four years." },
  { year: "1992", title: "Driveway and car park", text: "Driveway, car park and preparation for future buildings, keeping the temporary dressing rooms bought in 1990.", planning: "Planning ref 90/1064, granted on appeal to An Bord Pleanála" },
  { year: "1995", title: "First clubhouse", text: "Four dressing rooms, showers and toilets, a meeting room and a kitchen." },
  { year: "2000", title: "Six all-weather pitches", text: "Six floodlit 40×30 yd synthetic pitches, only the second facility of its kind in the country." },
  { year: "2006", title: "Clubhouse extension", text: "A large hall, two more dressing rooms, plus upstairs storage and meeting rooms.", planning: "Planning refs NA/30124 & NA/50183, granted (applied June 2004)" },
  { year: "2007", title: "Pitch floodlights", text: "Floodlights installed for year-round evening matches." },
  { year: "2009", title: "Half-size astro", text: "A 60×30 yd synthetic pitch added." },
  { year: "2011", title: "Training floodlights", text: "Floodlights on the pitch surround for training and FAI coaching programmes." },
  { year: "2014", title: "FIFA One Star pitch", text: "A full-size 104×61.5 m FIFA One Star synthetic pitch with fencing and a path surround. The league became the North East Football League that November, keeping the MDL name for the grounds.", planning: "Applied October 2013" },
  { year: "2015", title: "Astro upgrade", text: "New carpets, boards and lighting on the six small synthetic pitches." },
];

export default function KeyDates() {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--md-primary)]">Building the MDL</p>
      <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">Key dates</h2>
      <p className="mt-3 max-w-3xl text-[var(--md-on-surface-variant)] leading-relaxed">
        Recognising how stable the league had become, the committee decided in November 1988 to buy a home of its own.
        Demand for the facilities has grown ever since, and today the grounds have two sand-based pitches, two more
        full-size grass pitches and a range of floodlit synthetic pitches.
      </p>

      <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {milestones.map((m) => (
          <li
            key={m.year}
            className="flex gap-4 rounded-2xl bg-[var(--md-surface-container-lowest)] border border-[var(--md-outline-variant)] p-4 sm:p-5 shadow-sm"
          >
            <span className="shrink-0 h-12 w-16 rounded-xl bg-[var(--md-primary)] text-[var(--md-on-primary)] flex items-center justify-center font-bold">
              {m.year}
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-[var(--md-on-surface)]">{m.title}</h3>
              <p className="mt-1 text-sm text-[var(--md-on-surface-variant)] leading-relaxed">{m.text}</p>
              {m.planning && (
                <p className="mt-2 text-xs text-[var(--md-on-surface-variant)]/80">
                  <span className="font-semibold">Planning:</span> {m.planning}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
