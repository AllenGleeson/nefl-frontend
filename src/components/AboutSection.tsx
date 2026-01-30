"use client";

import { useState } from "react";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState<'about' | 'league' | 'contact'>('about');
  return (
    <section className="bg-[var(--md-surface-variant)] py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Mobile: Tab Navigation */}
        <div className="lg:hidden mb-6">
          <div className="flex border-b border-[var(--md-outline-variant)]">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === "about" ? "text-[var(--md-primary)] border-b-2 border-[var(--md-primary)]" : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"}`}
            >
              About Us
            </button>
            <button
              onClick={() => setActiveTab('league')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === "league" ? "text-[var(--md-primary)] border-b-2 border-[var(--md-primary)]" : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"}`}
            >
              Our League
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === "contact" ? "text-[var(--md-primary)] border-b-2 border-[var(--md-primary)]" : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"}`}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Mobile: Tab Content */}
        <div className="lg:hidden mb-4">
          {activeTab === 'about' && (
            <div className="text-center">
              <p className="text-[var(--md-on-surface-variant)] text-sm">
                North Eastern Football League, formally MDL, has been providing football to the North East of Ireland for over 40 years.
              </p>
            </div>
          )}

          {activeTab === 'league' && (
            <div className="text-center">
              <p className="text-[var(--md-on-surface-variant)] mb-3 text-sm">
                Serving the North East of Ireland for over four decades, we provide competitive football opportunities for clubs and players across the region.
              </p>
              <p className="text-[var(--md-on-surface-variant)]/80 text-xs">
                From grassroots to senior level, we&apos;re committed to developing football talent and fostering community spirit.
              </p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="text-center">
              <address className="not-italic text-[var(--md-on-surface-variant)] space-y-2 text-sm">
                <p className="font-medium">North Eastern Football League</p>
                <p>MDL Grounds, Trim Road</p>
                <p>Navan, Co. Meath, C15 AK5V</p>
                <p className="text-[var(--md-primary)] font-medium">087 285 6318</p>
                <p>
                  <span 
                    className="inline-block bg-[var(--md-primary)]/60 text-[var(--md-on-primary)] px-4 py-2 rounded-lg font-medium cursor-not-allowed opacity-60"
                    aria-disabled="true"
                  >
                    info@nefl.ie
                  </span>
                </p>
              </address>
            </div>
          )}
        </div>

        {/* Desktop: Three Column Layout */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-4 sm:mb-8">
          {/* About Us Column */}
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-[var(--md-on-surface)]">About Us</h3>
            <p className="text-[var(--md-on-surface-variant)] text-base">
              North Eastern Football League, formally MDL, has been providing football to the North East of Ireland for over 40 years.
            </p>
          </div>

          {/* Our League Column */}
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-[var(--md-on-surface)]">Our League</h3>
            <p className="text-[var(--md-on-surface-variant)] mb-4 text-base">
              Serving the North East of Ireland for over four decades, we provide competitive football opportunities for clubs and players across the region.
            </p>
            <p className="text-[var(--md-on-surface-variant)]/80 text-sm">
              From grassroots to senior level, we&apos;re committed to developing football talent and fostering community spirit.
            </p>
          </div>

          {/* Contact Column */}
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-[var(--md-on-surface)]">Contact</h3>
            <address className="not-italic text-[var(--md-on-surface-variant)] space-y-2 text-base">
              <p className="font-medium">North Eastern Football League</p>
              <p>MDL Grounds, Trim Road</p>
              <p>Navan, Co. Meath, C15 AK5V</p>
              <p className="text-[var(--md-primary)] font-medium">087 285 6318</p>
              <p>
                <span 
                  className="inline-block bg-[var(--md-primary)]/60 text-[var(--md-on-primary)] px-4 py-2 rounded-lg font-medium cursor-not-allowed opacity-60"
                  aria-disabled="true"
                >
                  info@nefl.ie
                </span>
              </p>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}