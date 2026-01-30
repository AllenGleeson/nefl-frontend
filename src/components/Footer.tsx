'use client';

import React from 'react';
import Image from 'next/image';
import { assetUrl } from '@/utils/assetUrl';

const sponsors = [
  { name: 'Conrad Hotel', logo: assetUrl('/images/logos/conrad.webp'), url: 'https://www.conradhotels.com' },
  { name: 'FAI', logo: assetUrl('/images/logos/fai.webp'), url: 'https://www.fai.ie' },
  { name: 'LFA', logo: assetUrl('/images/logos/lfa.webp'), url: 'https://www.lfa.ie' },
  { name: 'O\'Neills', logo: assetUrl('/images/logos/oneills_logo.webp'), url: 'https://www.oneills.com' },
  { name: 'PM Blinds', logo: assetUrl('/images/logos/pm-blinds.webp'), url: 'https://www.pmblinds.ie' },
  { name: 'Superior', logo: assetUrl('/images/logos/superior.webp'), url: 'https://www.superior.ie' },
  { name: 'UHY', logo: assetUrl('/images/logos/UHY_Logo.webp'), url: 'https://www.uhy.ie' }
];

export default function Footer() {
  return (
    <footer className="bg-[var(--md-inverse-surface)] border-t border-[var(--md-outline)]">
      {/* Social Media Section */}
      <div className="py-2 border-b border-[var(--md-outline)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-[var(--md-inverse-on-surface)]">NEFL</h3>
            </div>
            <div className="flex space-x-6">
              <div 
                className="text-[var(--md-inverse-on-surface)]/80 transition-colors duration-200 cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div 
                className="text-blue-100 transition-colors duration-200 cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div 
                className="text-blue-100 transition-colors duration-200 cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div 
                className="text-blue-100 transition-colors duration-200 cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sponsors Section */}
      <div className="py-2 border-b border-[var(--md-outline)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h4 className="text-sm text-[var(--md-inverse-on-surface)] mb-2">OUR PARTNERS</h4>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.name}
                className="group flex justify-center items-center transition-opacity duration-300 cursor-not-allowed"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  width={100}
                  height={50}
                  className="object-contain filter grayscale-0 transition-all duration-300"
                  style={{ maxWidth: '100px', maxHeight: '50px' }}
                  onError={(e) => {
                    e.currentTarget.style.border = '1px solid red';
                    e.currentTarget.style.backgroundColor = '#ffebee';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="py-4 text-sm text-[var(--md-inverse-on-surface)]/80">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <div className="cursor-not-allowed">
              Privacy Policy
            </div>
            <div className="cursor-not-allowed">
              Terms of Service
            </div>
            <div className="cursor-not-allowed">
              Manage Cookie Preferences
            </div>
          </div>
          <div>
            © {new Date().getFullYear()} North Eastern Football League
          </div>
        </div>
      </div>
    </footer>
  );
}
