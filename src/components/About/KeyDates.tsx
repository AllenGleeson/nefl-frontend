"use client"

import KeyDatesTabs from "./KeyDatesTabs"

export default function KeyDates() {
    return (
        <div className="max-w-none p-4 sm:p-6 bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--md-on-surface)]">Key Dates</h2>

            {/* Grid layout: bullet list left, tabs right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Left – bullet list */}
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-[var(--md-on-surface)]">
                    <li>1992 — Construct Driveway and Building</li>
                    <li>2000 — Develop area and install six 40x30 yd fully floodlit All-Weather pitches</li>
                    <li>2004 — Extend Building to cater for larger demand for facilities and meeting rooms</li>
                    <li>2007 — Install Floodlights on Pitch for year-round evening matches</li>
                    <li>2011 — Install Floodlights on Pitch surround for training & FAI Coaching programmes</li>
                </ul>

                {/* Right – Tabs */}
                <KeyDatesTabs />
            </div>

            {/* Long-form history text */}
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[var(--md-on-surface)] leading-relaxed">
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
    )
}