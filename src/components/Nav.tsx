"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import UserProfile from "./Login/UserProfile"; // Disabled for development

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-28">
            {/* Logo and Navigation Links Group */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
                  <Image 
                    src="/images/nefl-logo.png" 
                    alt="NEFL Logo" 
                    width={100} 
                    height={100}
                    className="object-contain"
                  />
                </Link>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                <Link href="/about" className="hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] px-3 py-2 rounded-md text-base font-medium transition-colors uppercase">
                  About
                </Link>
                <Link href="/news" className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors uppercase">
                  News
                </Link>
                <Link href="/leagues" className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors uppercase">
                  Leagues
                </Link>
                {/* <Link href="/statistics" className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors uppercase">
                  Statistics
                </Link> */}
                <Link href="/fixtures" className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors uppercase">
                  Fixtures
                </Link>
                <Link href="/clubs" className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors uppercase">
                  Clubs
                </Link>
                <Link href="/store" className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors uppercase">
                  Store
                </Link>
                {/* <Link href="/management" className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors uppercase">
                  Management
                </Link> */}
                </div>
              </div>
            </div>

            {/* Desktop User Profile / Login */}
            {/* <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/login" 
                className="bg-[var(--md-primary-container)] hover:bg-[var(--md-primary-fixed-dim)] text-[var(--md-on-primary-container)] px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Login (Dev)
              </Link>
            </div> */}

            {/* Mobile Menu Button - Right side */}
            <div className="md:hidden flex items-center space-x-4 ml-auto">
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-container inline-flex items-center justify-center p-2 rounded-md text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--md-on-primary)] transition-colors"
                aria-expanded="false"
                aria-label="Toggle mobile menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-800/60" onClick={closeMobileMenu}></div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--md-primary)] transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center h-28 px-4">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-[var(--md-on-primary)]" onClick={closeMobileMenu}>
              <span>NEFL</span>
            </Link>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link 
              href="/about" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] transition-colors uppercase"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link 
              href="/news" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] transition-colors uppercase"
              onClick={closeMobileMenu}
            >
              News
            </Link>
            <Link 
              href="/leagues" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] transition-colors uppercase"
              onClick={closeMobileMenu}
            >
              Leagues
            </Link>
            {/* <Link 
              href="/statistics" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] transition-colors uppercase"
              onClick={closeMobileMenu}
            >
              Statistics
            </Link> */}
            <Link 
              href="/fixtures" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] transition-colors uppercase"
              onClick={closeMobileMenu}
            >
              Fixtures
            </Link>
            <Link 
              href="/clubs" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] transition-colors uppercase"
              onClick={closeMobileMenu}
            >
              Clubs
            </Link>
            <Link 
              href="/store" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] transition-colors uppercase"
              onClick={closeMobileMenu}
            >
              Store
            </Link>
            {/* <Link 
              href="/management" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] transition-colors uppercase"
              onClick={closeMobileMenu}
            >
              Management
            </Link> */}
          </nav>

          {/* Mobile Login Button */}
          {/* <div className="p-4 border-t border-[var(--md-outline-variant)]">
            <Link 
              href="/login" 
              className="block w-full bg-[var(--md-primary-container)] hover:bg-[var(--md-primary-fixed-dim)] text-[var(--md-on-primary-container)] px-4 py-3 rounded-lg transition-colors text-center font-medium"
              onClick={closeMobileMenu}
            >
              Login (Dev)
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}