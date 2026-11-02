import type { Metadata } from "next";
import Image from "next/image";
import { Navigation } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import ContactForm from "@/components/Contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | NEFL",
  description: "Get in touch with the North East Football League: address, phone, email and directions to the MDL grounds in Navan.",
};

const MAP_QUERY = encodeURIComponent("MDL Grounds, Trim Road, Navan, Co. Meath, C15 AK5V");
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export default function ContactPage() {
  return (
    <div className="bg-[var(--md-surface)] min-h-screen">
      {/* Header */}
      <header className="relative isolate overflow-hidden bg-[var(--md-primary)] text-[var(--md-on-primary)]">
        <Image
          src="https://i0.wp.com/nefl.ie/wp-content/uploads/2021/02/MDL-Aerial-Shots-03..jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10 opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--md-primary)] via-[var(--md-primary)]/85 to-[var(--md-primary)]/50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--md-primary-container)]">Get in touch</p>
          <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold">Contact us</h1>
          <p className="mt-2 text-white/80 max-w-xl">
            Questions about fixtures, joining the league, pitch bookings or sponsorship? We&apos;d love to hear from you.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Map + message form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <section className="lg:col-span-2" aria-labelledby="map-title">
            <h2 id="map-title" className="text-2xl font-bold text-[var(--md-on-surface)]">Find us</h2>
            <p className="mt-1 text-[var(--md-on-surface-variant)]">
              The league&apos;s home at the MDL grounds, two miles from Navan on the Trim Road.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--md-outline-variant)] shadow-lg bg-[var(--md-surface-container)]">
              <iframe
                title="Map showing the MDL Grounds, Trim Road, Navan"
                src={MAP_EMBED}
                className="block w-full h-80 lg:h-[26rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ fullWidth: true, className: "mt-4" })}
            >
              <Navigation className="w-4 h-4" aria-hidden />
              Get directions in Google Maps
            </a>
          </section>

          <section
            className="lg:col-span-3 rounded-2xl bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)] p-6 sm:p-8"
            aria-labelledby="message-title"
          >
            <h2 id="message-title" className="text-2xl font-bold text-[var(--md-on-surface)]">Send us a message</h2>
            <p className="mt-1 mb-6 text-[var(--md-on-surface-variant)]">Pick a topic so your message reaches the right person.</p>
            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}
