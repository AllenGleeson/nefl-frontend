'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { assetUrl } from '@/utils/assetUrl';
import { buttonStyles } from '@/components/ui/Button';

const exploreLinks = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/leagues', label: 'Leagues' },
  { href: '/fixtures', label: 'Fixtures & Results' },
  { href: '/clubs', label: 'Clubs' },
  { href: '/about', label: 'About the League' },
  { href: '/contact', label: 'Contact Us' },
];

// Add the real profile URLs here; icons without a URL show as "coming soon".
const socials: { name: string; url?: string; Icon: typeof FaFacebookF }[] = [
  { name: 'Facebook', url: undefined, Icon: FaFacebookF },
  { name: 'X (Twitter)', url: undefined, Icon: FaXTwitter },
  { name: 'Instagram', url: undefined, Icon: FaInstagram },
  { name: 'YouTube', url: undefined, Icon: FaYoutube },
];

const partners = [
  { name: 'FAI', logo: '/images/logos/fai.webp', url: 'https://www.fai.ie' },
  { name: 'Leinster FA', logo: '/images/logos/lfa.webp', url: 'https://www.leinsterfa.ie' },
  { name: "O'Neills", logo: '/images/logos/oneills_logo.webp', url: 'https://www.oneills.com' },
  { name: 'UHY Farrelly Dawe White', logo: '/images/logos/UHY_Logo.webp', url: 'https://www.uhy.ie' },
  { name: 'PM Blinds', logo: '/images/logos/pm-blinds.webp' },
  { name: 'Superior Racking', logo: '/images/logos/superior.webp' },
  { name: 'Conrad', logo: '/images/logos/conrad.webp' },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--md-primary-container)] mb-4">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--md-primary)] text-[var(--md-on-primary)] border-t-4 border-[var(--md-primary-container)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={assetUrl('/images/nefl-logo.webp')}
                alt=""
                width={64}
                height={64}
                className="object-contain drop-shadow-md"
              />
              <span className="leading-tight">
                <span className="block text-lg font-bold">North East Football League</span>
                <span className="block text-xs text-[var(--md-primary-container)]">Incorporating MDL · Est. 1980</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-sm">
              Competitive football for clubs and players across the North East of Ireland for over four decades.
            </p>
            <ul className="mt-5 flex gap-2" aria-label="Social media">
              {socials.map(({ name, url, Icon }) => (
                <li key={name}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      title={name}
                      className={buttonStyles({ variant: 'glass', size: 'icon-sm' })}
                    >
                      <Icon className="w-4 h-4" aria-hidden />
                    </a>
                  ) : (
                    <span
                      title={`${name} (coming soon)`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/40"
                    >
                      <Icon className="w-4 h-4" aria-hidden />
                      <span className="sr-only">{name} (coming soon)</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <address className="not-italic space-y-3 text-sm text-white/75">
              <p className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[var(--md-primary-container)]" aria-hidden />
                <span>
                  MDL Grounds, Trim Road
                  <br />
                  Navan, Co. Meath, C15 AK5V
                </span>
              </p>
              <p>
                <a href="tel:+353872856318" className="flex gap-3 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[var(--md-primary-container)]" aria-hidden />
                  087 285 6318
                </a>
              </p>
              <p>
                <a href="mailto:info@nefl.ie" className="flex gap-3 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[var(--md-primary-container)]" aria-hidden />
                  info@nefl.ie
                </a>
              </p>
            </address>
          </div>

          {/* Partners */}
          <div className="sm:col-span-2 lg:col-span-3">
            <FooterHeading>Our Partners</FooterHeading>
            <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
              {partners.map((p) => {
                const tile = (
                  <span className="flex h-14 items-center justify-center rounded-lg bg-white p-2 transition-transform duration-200 hover:-translate-y-0.5">
                    <Image
                      src={assetUrl(p.logo)}
                      alt={p.name}
                      width={80}
                      height={40}
                      className="max-h-10 w-auto object-contain"
                    />
                  </span>
                );
                return (
                  <li key={p.name} title={p.name}>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                        {tile}
                      </a>
                    ) : (
                      tile
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center sm:text-left text-xs text-white/60">
          <p>© {new Date().getFullYear()} North East Football League. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
