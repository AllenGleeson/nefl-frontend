"use client"

import { useState } from "react"

export default function LeagueHistory() {
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    {
      id: 1,
      content: (
        <>
          <p>
            Following a rejected late entry to the Louth & District League and The
            Leinster Junior League from Kilmessan AFC, the then elected Chairman
            of the newly formed Club Vincent Brennan placed an ad in the Sports
            page of the <em>Meath Chronicle</em> in September 1980 which simply read:
            <q>
              It is proposed to start a Soccer League in the Mid Meath area, for
              further details contact Vincent Brennan Kilmessan
            </q>. Following a large interest, the Meath & District League was
            formed by members of Kilmessan AFC initially with a membership of
            seven Clubs representing eight teams — Kilmessan who had two teams,
            along with Moynalvey, Skryne, Cosmos, Dunshaughlin, Robinstown, and
            Turmec.
          </p>
          <p>
            For the second season, there was an increase to fifteen Clubs
            representing seventeen teams. For the first two seasons, the league
            was known as the Mid Meath League with all the Clubs centered around
            a fifteen to twenty miles radius.
          </p>
          <p>
            In 1982, through the great help and assistance of The Leinster
            Football Association Secretary Mr. George Briggs, the League was
            affiliated to the F.A.I. through the provincial association, and the
            name was changed to the Meath & District League.
          </p>
        </>
      )
    },
    {
      id: 2,
      content: (
        <>
          <p>
            The NEFL presently has a membership of fifty-one Clubs representing
            seventy-one adult teams, while the NECSL has a membership of
            forty-one Clubs representing one hundred and seventy-eight teams (U7
            to U17 Boys and Girls). Combining both Leagues, with an average of
            twenty participants per team, the full total equates to over 6,000
            playing members alone.
          </p>
          <p>
            The present Executive Committee includes John Gorman, Gerry Gorman,
            David Tully, Eugene Lynch, Derek Coogan, Brian McCreary, Tommy Melia,
            Damien Smith, Andrew Matthews, Declan Jordan, Damien Clarke, Steve
            Laverty, Mark McGuinness, Stephen McCabe, and Danny Doyle. Present
            Committee members Gerry Gorman, and first cousin John Gorman who
            represents the League on the FAI Key Junior Committee, along with
            Eugene Lynch who served as Chairman for eleven years, have been
            ever-present since the early days. As has well-known and popular
            groundsman at the MDL, Gerry Moore (Muller).
          </p>
          <blockquote className="border-l-4 border-[var(--md-primary)] pl-3 sm:pl-4 italic text-[var(--md-on-surface-variant)] text-sm sm:text-base">
            &quot;Thanks very much to <em>The Meath Chronicle</em> for their incredible
            assistance with the history of the league and in particular thank you to
            Conall Collier.&quot;
          </blockquote>
        </>
      )
    }
  ]

  return (
    <section className="max-w-6xl mx-auto mt-0 mb-6 sm:mt-0 sm:mb-8 lg:mt-0 lg:mb-12 px-2 sm:px-4 lg:px-8">
      {/* Mobile: Arrow navigation */}
      <div className="block sm:hidden relative">
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSection * 100}%)` }}
          >
            {sections.map((section) => (
              <div 
                key={section.id}
                className="w-full flex-shrink-0"
              >
                <div className="bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] shadow-lg p-4 space-y-3 text-[var(--md-on-surface)] leading-relaxed text-sm relative pb-12">
                  {section.content}
                  
                  {/* Navigation Button - Inside card, bottom right */}
                  <button
                    onClick={() => {
                      if (currentSection === 0) {
                        setCurrentSection(1)
                      } else {
                        setCurrentSection(0)
                      }
                    }}
                    className="absolute bottom-4 right-4 p-2 bg-[var(--md-primary)] text-[var(--md-on-primary)] rounded-lg shadow-lg hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200"
                    aria-label={currentSection === 0 ? "Next section" : "Previous section"}
                  >
                    {currentSection === 0 ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {sections.map((section) => (
          <div 
            key={section.id}
            className="bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] shadow-lg p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 text-[var(--md-on-surface)] leading-relaxed text-sm sm:text-base"
          >
            {section.content}
          </div>
        ))}
      </div>
    </section>
  )
}