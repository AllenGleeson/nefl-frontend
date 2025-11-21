"use client";

import Image from "next/image";

const sponsors = [
  {
    name: "FAI",
    url: "https://www.fai.ie/",
    logo: "/images/logos/fai.webp", // put these in /public/logos
  },
  {
    name: "Leinster FA",
    url: "http://www.leinsterfa.ie/",
    logo: "/images/logos/lfa.webp",
  },
  {
    name: "O’Neills",
    url: "https://www.oneills.com/shop-by-team/soccer.html",
    logo: "/images/logos/oneills_logo.webp",
  },
  {
    name: "Superior",
    url: "https://nefl.ie", // replace with actual site
    logo: "/images/logos/superior.webp",
  },
  {
    name: "Conrad",
    url: "https://nefl.ie", // replace with actual site
    logo: "/images/logos/conrad.webp",
  },
  {
    name: "UHY",
    url: "https://nefl.ie", // replace with actual site
    logo: "/images/logos/UHY_Logo.webp",
  },
  {
    name: "PM Blinds",
    url: "https://nefl.ie", // replace with actual site
    logo: "/images/logos/pm-blinds.webp",
  }
];

export default function Sponsors() {
  return (
    <section className="sponsers bg-gradient-to-br from-[var(--md-surface-container-low)] to-[var(--md-surface-container)] py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-2">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-3xl font-bold text-[var(--md-on-surface)] mb-3">Our Partners</h2>
          <p className="text-[var(--md-on-surface-variant)] max-w-2xl mx-auto">
            We&apos;re proud to work with these amazing organizations that support our league and community
          </p>
        </div>
        {/* Sponsors Grid */}
        <div className="max-w-4xl mx-auto">
          {/* Mobile: Single Grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center sm:hidden">
            {sponsors.map((sponsor, index) => {
              const isLastItem = index === sponsors.length - 1;
              const shouldCenterMobile = isLastItem && sponsors.length % 3 === 1;
              
              return (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex justify-center items-center hover:opacity-80 transition-opacity duration-300 ${
                  shouldCenterMobile ? 'col-start-2' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="w-full h-12 flex items-center justify-center px-2 relative">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    fill
                    className="object-contain filter grayscale-0 group-hover:grayscale transition-all duration-300"
                    onError={(e) => {
                      console.log('Image failed to load:', sponsor.logo);
                      e.currentTarget.style.border = `2px solid var(--md-error)`;
                      e.currentTarget.style.backgroundColor = 'var(--md-error-container)';
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', sponsor.logo);
                    }}
                  />
                </div>
              </a>
              );
            })}
          </div>

          {/* Desktop: Split into two rows */}
          <div className="hidden sm:block">
            {/* First Row: First 4 items */}
            <div className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center mb-4 sm:mb-6 md:mb-8">
              {sponsors.slice(0, 4).map((sponsor, index) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center hover:opacity-80 transition-opacity duration-300"
                  style={{ 
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-full h-20 md:h-24 flex items-center justify-center px-2 relative">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      className="object-contain filter grayscale-0 group-hover:grayscale transition-all duration-300"
                      onError={(e) => {
                        console.log('Image failed to load:', sponsor.logo);
                        e.currentTarget.style.border = `2px solid var(--md-error)`;
                        e.currentTarget.style.backgroundColor = 'var(--md-error-container)';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', sponsor.logo);
                      }}
                    />
                  </div>
                </a>
              ))}
            </div>

            {/* Second Row: Last 3 items centered */}
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
              {sponsors.slice(4).map((sponsor, index) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center hover:opacity-80 transition-opacity duration-300"
                  style={{ 
                    animationDelay: `${(index + 4) * 100}ms`,
                    width: 'calc(25% - 0.75rem)'
                  }}
                >
                  <div className="w-full h-20 md:h-24 flex items-center justify-center px-2 relative">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      className="object-contain filter grayscale-0 group-hover:grayscale transition-all duration-300"
                      onError={(e) => {
                        console.log('Image failed to load:', sponsor.logo);
                        e.currentTarget.style.border = `2px solid var(--md-error)`;
                        e.currentTarget.style.backgroundColor = 'var(--md-error-container)';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', sponsor.logo);
                      }}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6 sm:mt-12">
          <p className="text-[var(--md-on-surface-variant)] mb-4">
            Interested in becoming a partner?
          </p>
          <a
            href="mailto:info@nefl.ie?subject=Partnership Inquiry"
            className="inline-flex items-center px-6 py-3 bg-[var(--md-primary)] text-[var(--md-on-primary)] font-medium rounded-lg hover:bg-[var(--md-primary-fixed-dim)] transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}