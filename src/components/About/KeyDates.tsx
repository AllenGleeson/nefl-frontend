"use client"

import KeyDatesTabs from "./KeyDatesTabs"

export default function KeyDates() {
    return (
        <div className="max-w-none p-4 sm:p-6 lg:p-8 bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] shadow-lg">
            {/* Header */}
            <div className="mb-6 sm:mb-8 pb-4 border-b border-[var(--md-outline-variant)]">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--md-on-surface)]">
                    Key Dates
                </h2>
                <div className="mt-2 w-12 sm:w-16 h-1 bg-[var(--md-primary)]"></div>
            </div>

            {/* Grid layout: bullet list left, tabs right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                {/* Left – bullet list */}
                <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--md-on-surface)] mb-3">
                        Development Timeline
                    </h3>
                    <ul className="space-y-3 sm:space-y-4">
                        {[
                            { year: "1992", text: "Construct Driveway and Building" },
                            { year: "2000", text: "Develop area and install six 40x30 yd fully floodlit All-Weather pitches" },
                            { year: "2004", text: "Extend Building to cater for larger demand for facilities and meeting rooms" },
                            { year: "2007", text: "Install Floodlights on Pitch for year-round evening matches" },
                            { year: "2011", text: "Install Floodlights on Pitch surround for training & FAI Coaching programmes" },
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3 sm:gap-4">
                                <div className="flex-shrink-0 mt-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[var(--md-primary)]"></div>
                                </div>
                                <div className="flex-1">
                                    <span className="font-semibold text-[var(--md-primary)] text-sm sm:text-base mr-2">
                                        {item.year}
                                    </span>
                                    <span className="text-sm sm:text-base text-[var(--md-on-surface-variant)] leading-relaxed">
                                        — {item.text}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right – Tabs */}
                <div className="lg:pl-4 border-l-0 lg:border-l border-[var(--md-outline-variant)] lg:pl-6">
                    <KeyDatesTabs />
                </div>
            </div>

            {/* Long-form history text */}
            <div className="space-y-4 sm:space-y-5 pt-4 sm:pt-6 border-t border-[var(--md-outline-variant)]">
                <h3 className="text-base sm:text-lg font-semibold text-[var(--md-on-surface)]">
                    Historical Overview
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-[var(--md-on-surface-variant)] leading-relaxed">
                    <p>
                        Recognising the stability of the League all round, a decision was taken in November 1988 to
                        purchase a twenty-two-acre site two miles from Navan on the main Trim Road. The purchase price
                        was £40,000.00. The MDL had raised half the amount and the rest was borrowed from the T.S.B.
                        Navan over a four year period. Having completed the repayments in 1992...
                    </p>

                    <p>
                        The first stage of development was embarked upon which included a driveway, car park, and
                        preliminary work for buildings. In 1995 a building which included four dressing rooms, shower
                        and toilets, a meeting room and kitchen was completed, and an extension to include a large hall,
                        two more dressing rooms, and upstairs storage and meeting rooms were added in 2006. Two
                        top-class sand-based pitches are also in use for the past number of years along with two other
                        serviceable full-size grass Pitches.
                    </p>

                    <p>
                        In September 2000, six 40x30 yd synthetic All Weather floodlit pitches were developed (only the
                        second of its type in the country). A further half-size 60x30 yd was added in 2009, with a full-sized
                        FIFA one star completed in June 2014. To give due recognition to the full area covered, the League
                        (MDL) changed its name in November 2014 to The North East but retained the landmark location
                        reference, still known as the MDL grounds. In June 2015 the Carpets, Boards and Lighting were
                        replaced on the six synthetic pitches. Demand for all facilities has been phenomenal in the last
                        ten years.
                    </p>
                </div>
            </div>
        </div>
    )
}