import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import ContactForm, { CONTACT_EMAIL } from "@/components/Contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | NEFL",
  description: "Get in touch with the North East Football League: address, phone, email and directions to the MDL grounds in Navan.",
};

const ADDRESS_LINES = ["MDL Grounds, Trim Road", "Navan, Co. Meath", "C15 AK5V"];
const PHONE_DISPLAY = "087 285 6318";
const PHONE_LINK = "tel:+353872856318";
const MAP_QUERY = encodeURIComponent("MDL Grounds, Trim Road, Navan, Co. Meath, C15 AK5V");
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

const cards = [
  {
    icon: MapPin,
    title: "Visit",
    lines: ADDRESS_LINES,
    action: { label: "Get directions", href: DIRECTIONS, external: true },
  },
  {
    icon: Phone,
    title: "Call",
    lines: [PHONE_DISPLAY],
    action: { label: "Call now", href: PHONE_LINK, external: false },
  },
  {
    icon: Mail,
    title: "Email",
    lines: [CONTACT_EMAIL],
    action: { label: "Send an email", href: `mailto:${CONTACT_EMAIL}`, external: false },
  },
];

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-28 sm:pt-14 sm:pb-36">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--md-primary-container)]">Get in touch</p>
          <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold">Contact us</h1>
          <p className="mt-2 text-white/80 max-w-xl">
            Questions about fixtures, joining the league, pitch bookings or sponsorship? We&apos;d love to hear from you.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
        {/* Contact cards */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 -mt-20 sm:-mt-24 relative">
          {cards.map(({ icon: Icon, title, lines, action }) => (
            <li
              key={title}
              className="flex flex-col rounded-2xl bg-[var(--md-surface-container-lowest)] border border-[var(--md-outline-variant)] p-6 shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--md-primary)] text-[var(--md-on-primary)]">
                <Icon className="w-6 h-6" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-bold text-[var(--md-on-surface)]">{title}</h2>
              <p className="mt-1 text-[var(--md-on-surface-variant)] leading-relaxed">
                {lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <a
                href={action.href}
                {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={buttonStyles({ variant: "tonal", size: "sm", className: "mt-5 self-start" })}
              >
                {action.label}
              </a>
            </li>
          ))}
        </ul>

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
