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
        <div className="bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] shadow-lg p-4 sm:p-6">
            {/* Nav Tabs */}
            <ul className="flex flex-wrap border-b border-[var(--md-outline-variant)] mb-3 sm:mb-4">
                {tabs.map((tab) => (
                    <li key={tab.id}>
                        <button
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                                activeTab === tab.id
                                    ? "border-b-2 border-[var(--md-primary)] text-[var(--md-primary)]"
                                    : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-primary)] border-b-2 border-transparent"
                            }`}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content p-3 sm:p-4 bg-[var(--md-surface-container-low)] text-sm sm:text-base text-[var(--md-on-surface)]">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    )
}