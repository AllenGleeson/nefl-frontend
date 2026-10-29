// src/components/About/GroundsTab.tsx
import { MapPin, Navigation } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import KeyDates from "./KeyDates";
import PhotoGallery from "./PhotoGallery";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=MDL+Grounds+Trim+Road+Navan+C15+AK5V";

const aerialPhotos = [
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2021/02/MDL-Aerial-Shots-05..jpg", caption: "Astro pitches 2, 3, 4, 6 and 7" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2021/02/MDL-Aerial-Shots-04..jpg", caption: "Pitches 2, 3 and 4" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2021/02/MDL-Aerial-Shots-03..jpg", caption: "Dressing rooms and clubhouse" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2021/02/MDL-Aerial-Shots-02..jpg", caption: "Pitch 1 (grass) and pitch 2 (FIFA One Star astro)" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2021/02/MDL-Aerial-Shots-01..jpg", caption: "Small astros 1, 2, 4 and 5" },
];

const groundsPhotos = [
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/12/muller-on-tractor-1170x650.jpg", caption: "Groundsman Gerry 'Muller' Moore at work" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/12/Fifaone-day-one-1024x650.jpg", caption: "Day one on the FIFA One Star pitch" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/12/mdl-FOF-1170x650.jpg", caption: "The MDL grounds" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/12/martino-neil-visit-1170x650.jpg", caption: "Martin O'Neill's visit" },
];

export default function GroundsTab() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-2">
          <PhotoGallery images={aerialPhotos} />
        </div>
        <aside className="rounded-2xl bg-[var(--md-primary)] text-[var(--md-on-primary)] p-6 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--md-primary-container)]">Visit</p>
          <h2 className="mt-2 text-2xl font-bold">The MDL Grounds</h2>
          <p className="mt-3 text-white/80 leading-relaxed">
            The league&apos;s home since 1988: grass and synthetic pitches, floodlights, dressing rooms and a clubhouse,
            two miles from Navan.
          </p>
          <p className="mt-5 flex gap-3 text-sm">
            <MapPin className="w-5 h-5 shrink-0 text-[var(--md-primary-container)]" aria-hidden />
            <span>
              Trim Road, Navan
              <br />
              Co. Meath, C15 AK5V
            </span>
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "inverse", fullWidth: true, className: "mt-6" })}
          >
            <Navigation className="w-4 h-4" aria-hidden />
            Get directions
          </a>
        </aside>
      </section>

      <KeyDates />

      <PhotoGallery title="Around the grounds" images={groundsPhotos} />
    </div>
  );
}
