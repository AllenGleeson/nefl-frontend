// Our story: how the league started and where it is today.
export default function LeagueHistory() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <div className="lg:col-span-4">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--md-primary)]">Our story</p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)] leading-tight">
          It started with an ad in the Meath Chronicle
        </h2>
        <blockquote className="mt-6 rounded-2xl bg-[var(--md-primary)] text-[var(--md-on-primary)] p-6 shadow-lg">
          <p className="text-lg italic leading-relaxed">
            &ldquo;It is proposed to start a Soccer League in the Mid Meath area, for further details contact Vincent
            Brennan, Kilmessan.&rdquo;
          </p>
          <footer className="mt-3 text-sm text-[var(--md-primary-container)]">
            Meath Chronicle, September 1980
          </footer>
        </blockquote>
      </div>

      <div className="lg:col-span-8 space-y-8 text-[var(--md-on-surface-variant)] leading-relaxed">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--md-on-surface)]">How it began</h3>
          <p>
            After a late entry to the Louth &amp; District League and the Leinster Junior League was rejected, the
            newly elected Chairman of Kilmessan AFC, Vincent Brennan, placed that ad in the sports pages of the{" "}
            <em>Meath Chronicle</em>. Interest was strong, and the league was formed by members of Kilmessan AFC with
            seven clubs and eight teams: Kilmessan (two teams), Moynalvey, Skryne, Cosmos, Dunshaughlin, Robinstown
            and Turmec.
          </p>
          <p>
            By the second season there were fifteen clubs and seventeen teams. For those first two seasons it was
            known as the Mid Meath League, with every club within fifteen to twenty miles.
          </p>
          <p>
            In 1982, with the help of Leinster Football Association Secretary George Briggs, the league affiliated to
            the FAI through the provincial association and became the Meath &amp; District League (MDL).
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--md-on-surface)]">The league today</h3>
          <p>
            The NEFL now has fifty-one clubs with seventy-one adult teams, while the NECSL has forty-one clubs with
            one hundred and seventy-eight teams from U7 to U17, boys and girls. Together that is over 6,000 playing
            members.
          </p>
          <p>
            The Executive Committee includes John Gorman, Gerry Gorman, David Tully, Eugene Lynch, Derek Coogan, Brian
            McCreary, Tommy Melia, Damien Smith, Andrew Matthews, Declan Jordan, Damien Clarke, Steve Laverty, Mark
            McGuinness, Stephen McCabe and Danny Doyle. Gerry Gorman, his first cousin John Gorman (who represents the
            league on the FAI Key Junior Committee) and Eugene Lynch (Chairman for eleven years) have been there since
            the early days, as has popular MDL groundsman Gerry Moore (Muller).
          </p>
        </div>

        <p className="text-sm italic border-l-4 border-[var(--md-primary-container)] pl-4">
          Thanks to <em>The Meath Chronicle</em>, and in particular Conall Collier, for their help with the history of
          the league.
        </p>
      </div>
    </section>
  );
}
