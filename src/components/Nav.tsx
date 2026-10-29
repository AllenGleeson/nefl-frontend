"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import { assetUrl } from "@/utils/assetUrl";
import { buttonStyles } from "@/components/ui/Button";

const links = [
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/leagues", label: "Leagues" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/clubs", label: "Clubs" },
  { href: "/contact", label: "Contact" },
];

function Logo({ size }: { size: number }) {
  return (
    <Image
      src={assetUrl("/images/nefl-logo.webp")}
      alt=""
      width={size}
      height={size}
      className="object-contain drop-shadow-md"
      priority
    />
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Slightly stronger shadow once the page scrolls under the sticky nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isMobileMenuOpen]);

  // Close the mobile menu after navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        aria-label="Main"
        className={`bg-[var(--md-primary)] text-[var(--md-on-primary)] border-b border-white/10 transition-shadow duration-300 ${
          scrolled ? "shadow-xl" : "shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 gap-6">
            {/* Logo + name */}
            <Link href="/" className="flex items-center gap-3 shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <Logo size={60} />
              <span className="hidden lg:flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-tight">North East Football League</span>
                <span className="text-xs font-medium text-[var(--md-primary-container)] tracking-wide">
                  Incorporating MDL · Est. 1980
                </span>
              </span>
              <span className="sr-only lg:hidden">NEFL home</span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1 ml-auto">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block px-3 lg:px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        active
                          ? "text-white"
                          : "text-white/75 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 rounded-full bg-[var(--md-primary-container)] transition-all duration-300 ${
                          active ? "w-6 opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Admin link (development convenience) */}
            <div className="hidden md:block pl-2 border-l border-white/15">
              <Link
                href="/management"
                className={buttonStyles({ variant: "glass", size: "sm", className: "ml-3" })}
                title="League management"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden />
                Admin
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className={buttonStyles({ variant: "glass", size: "icon", className: "md:hidden ml-auto" })}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" aria-hidden />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      <div
        aria-hidden
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile menu drawer (slides in from the right, next to the button) */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!isMobileMenuOpen}
        className={`fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-2xl md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <Logo size={48} />
              <span className="font-bold leading-tight">North East<br />Football League</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className={buttonStyles({ variant: "glass", size: "icon" })}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" aria-hidden />
            </button>
          </div>

          <ul className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold uppercase tracking-wider transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-5 w-1 rounded-full ${active ? "bg-[var(--md-primary-container)]" : "bg-transparent"}`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Admin link (development convenience) */}
          <div className="p-4 border-t border-white/10">
            <Link href="/management" className={buttonStyles({ variant: "glass", fullWidth: true })}>
              <ShieldCheck className="w-5 h-5" aria-hidden />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
