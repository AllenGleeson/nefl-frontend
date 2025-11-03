"use client"

import { useState } from "react"

export default function KeyDatesTabs() {
    const [activeTab, setActiveTab] = useState("1992")

    const tabs = [
        {
            id: "1992",
            label: "April 1992",
            content: (
                <div>
                    Construct drive way, car park, preparation of area for future buildings <br />
                    & Retention of temporary dressing rooms purchased in Mar 90. <br />
                    Planning Ref No: 90/1064 – *Successful Appeal to An Bord Pleanála (Granted)
                </div>
            ),
        },
        {
            id: "2004",
            label: "June 2004",
            content: (
                <div>
                    Extend Building to cater for larger demand for facilities and meeting rooms. <br />
                    <br />
                    * Completed in May 2006 <br />
                    Planning Ref No’s: NA/30124 &amp; NA/50183 (Granted)
                </div>
            ),
        },
        {
            id: "2013",
            label: "October 2013",
            content: (
                <div>
                    Install 104M × 61.5M ‘FIFA one Star’ synthetic pitch, secured weld mesh fencing, and
                    tarmacadam pathway surround. Floodlights already in place on area since 2008.
                </div>
            ),
        },
    ]

    return (
        <div className="h-full">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--md-on-surface)] mb-4">
                Planning Details
            </h3>
            <div className="bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] shadow-lg overflow-hidden">
                {/* Nav Tabs */}
                <div className="flex flex-wrap border-b-2 border-[var(--md-outline-variant)]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                activeTab === tab.id
                                    ? "border-b-2 border-[var(--md-primary)] text-[var(--md-primary)] bg-[var(--md-primary-container)]/10"
                                    : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-primary)] hover:bg-[var(--md-surface-container-low)] border-b-2 border-transparent"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-4 sm:p-5 lg:p-6 bg-[var(--md-surface-container-low)] text-sm sm:text-base text-[var(--md-on-surface-variant)] leading-relaxed min-h-[120px] sm:min-h-[140px]">
                    {tabs.find((tab) => tab.id === activeTab)?.content}
                </div>
            </div>
        </div>
    )
}