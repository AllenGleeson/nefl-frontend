"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    id: 0,
    roofline: "North East Football League",
    title: "Premier Football Experience",
    desc: "The premier football league in the North East. Follow your favorite teams, check fixtures, and stay updated with the latest results.",
    cta1: "View Fixtures",
    cta2: "Latest Results",
    img: "/images/news/news-1.jpg",
  },
  {
    id: 1,
    roofline: "Matchday Preview",
    title: "Upcoming Big Clash",
    desc: "Don't miss this weekend's big clash — get your tickets now and support your team!",
    cta1: "Buy Tickets",
    cta2: "Match Preview",
    img: "/images/news/news-2.jpg",
  },
  {
    id: 2,
    roofline: "League Highlights",
    title: "Weekly Action Recap",
    desc: "Catch up with last week's goals, saves, and key moments in our highlights reel.",
    cta1: "Watch Highlights",
    cta2: "Read Report",
    img: "/images/news/news-3.jpg",
  },
  {
    id: 3,
    roofline: "Player Spotlight",
    title: "Rising Star of the Month",
    desc: "Meet the young talent making waves in the league. Discover their journey from academy to first team.",
    cta1: "Read Profile",
    cta2: "View Stats",
    img: "/images/news/news-4.jpg",
  },
  {
    id: 4,
    roofline: "Transfer News",
    title: "January Window Updates",
    desc: "Stay informed about all the latest transfers, signings, and contract renewals across the league.",
    cta1: "View Transfers",
    cta2: "Rumors",
    img: "/images/news/news-5.jpg",
  },
  {
    id: 5,
    roofline: "Match Analysis",
    title: "Tactical Breakdown",
    desc: "Deep dive into the strategies, formations, and key moments that shaped this week's biggest matches.",
    cta1: "Read Analysis",
    cta2: "Watch Video",
    img: "/images/news/news-6.jpg",
  },
  {
    id: 6,
    roofline: "Fan Zone",
    title: "Community Stories",
    desc: "Celebrate the passionate fans, local heroes, and community initiatives that make our league special.",
    cta1: "Share Story",
    cta2: "Join Community",
    img: "/images/news/news-1.jpg",
  },
  {
    id: 7,
    roofline: "Youth Development",
    title: "Academy Excellence",
    desc: "Discover how our youth academies are developing the next generation of football stars.",
    cta1: "Academy Info",
    cta2: "Apply Now",
    img: "/images/news/news-2.jpg",
  },
  {
    id: 8,
    roofline: "Referee Corner",
    title: "Fair Play Focus",
    desc: "Learn about the latest rule changes, VAR updates, and how we're improving the game experience.",
    cta1: "Rule Changes",
    cta2: "Referee Training",
    img: "/images/news/news-3.jpg",
  },
  {
    id: 9,
    roofline: "Season Review",
    title: "Championship Race",
    desc: "Follow the thrilling title race as teams battle for glory in the most competitive season yet.",
    cta1: "League Table",
    cta2: "Fixtures",
    img: "/images/news/news-4.jpg",
  },
];


export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [navStartIndex, setNavStartIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const visibleTabs = 4; // Number of tabs visible at once
  const maxStartIndex = Math.max(0, slides.length - visibleTabs);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-scroll navigation when active tab goes out of view
  useEffect(() => {
    if (active < navStartIndex) {
      setNavStartIndex(active);
    } else if (active >= navStartIndex + visibleTabs) {
      setNavStartIndex(active - visibleTabs + 1);
    }
  }, [active, navStartIndex, visibleTabs]);

  const scrollNavLeft = () => {
    setNavStartIndex(prev => Math.max(0, prev - 1));
  };

  const scrollNavRight = () => {
    setNavStartIndex(prev => Math.min(maxStartIndex, prev + 1));
  };

  const nextSlide = (active + 1) % slides.length;

  return (
    <section
    className="relative w-full max-w-full sm:max-w-[calc(100vw-2rem)] mx-auto md:mt-3 mb-3 sm:mt-6 sm:mb-6 px-0 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="bg-[var(--md-primary)] shadow-xl sm:shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row-reverse min-h-[60vh] bg-[var(--md-primary)] text-[var(--md-on-primary)] overflow-hidden">
          {/* RIGHT - IMAGE */}
          <div className="w-full md:w-1/2 relative h-80 sm:h-96 md:h-[60vh]">
            <Image
              src={slides[active].img}
              alt={slides[active].title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-in-out"
            />
            <div className="hidden sm:block absolute bottom-4 right-4 w-24 sm:w-32 h-16 sm:h-20 border-2 border-white rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
              <Image
                src={slides[nextSlide].img}
                alt="Next preview"
                fill
                className="object-cover"
                onClick={() => setActive(nextSlide)}
              />
            </div>
          </div>

          {/* LEFT - TEXT */}
          <div className="w-full md:w-1/2 p-3 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-start pt-6 sm:pt-12 md:pt-20 lg:pt-32">
            <div className="text-base sm:text-xl md:text-2xl font-medium mb-2 sm:mb-3 text-[var(--md-primary-container)] text-center md:text-left">
              {slides[active].roofline}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-center md:text-left">
              {slides[active].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 text-[var(--md-on-primary)]/90 text-center md:text-left">
              {slides[active].desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <button className="bg-[var(--md-surface-container-lowest)] text-[var(--md-primary)] px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-[var(--md-surface-container-low)] transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                {slides[active].cta1}
              </button>
              <button className="border-2 border-[var(--md-on-primary)] text-[var(--md-on-primary)] px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-[var(--md-on-primary)] hover:text-[var(--md-primary)] transition-all duration-200 text-sm sm:text-base">
                {slides[active].cta2}
              </button>
            </div>
          </div>
        </div>

         {/* NAVIGATION */}
          <div className="bg-[var(--md-primary)] px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-[var(--md-outline-variant)]">
           {/* Mobile: Bar indicators for all slides */}
           <div className="flex items-center justify-center gap-2 sm:hidden">
             {slides.map((s, index) => (
               <button
                 key={s.id}
                 onClick={() => setActive(index)}
                 className="flex-1 max-w-[60px] flex flex-col items-center gap-1"
                 aria-label={`Go to slide ${index + 1}`}
               >
                 <div
                   className={`w-full rounded-full transition-all duration-300 ${
                     index === active
                       ? "h-1.5 bg-[var(--md-on-primary)]"
                       : "h-1 bg-[var(--md-on-primary)]/40 hover:bg-[var(--md-on-primary)]/60"
                   }`}
                 />
               </button>
             ))}
           </div>

           {/* Desktop: Navigation tabs with arrows */}
           <div className="hidden sm:flex items-center justify-center gap-2">
             {/* Left Arrow */}
             {navStartIndex > 0 && (
               <button
                 onClick={scrollNavLeft}
                 className="p-2 rounded-full transition-all duration-200 text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)]"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>
             )}

             {/* Navigation Tabs */}
             <div className="relative flex flex-row gap-0 overflow-hidden flex-1">
               {slides.slice(navStartIndex, navStartIndex + visibleTabs).map((s, i) => {
                 const actualIndex = navStartIndex + i;
                 return (
                   <button
                     key={s.id}
                     onClick={() => setActive(actualIndex)}
                     className={`relative px-6 py-3 text-left transition-all duration-200 flex-1 ${
                       actualIndex === active ? "text-[var(--md-on-primary)]" : "text-[var(--md-on-primary)]/70 hover:text-[var(--md-on-primary)]"
                     }`}
                   >
                     <div
                       className={`text-base font-medium mb-1 ${
                         actualIndex === active ? "text-[var(--md-primary-container)]" : "text-[var(--md-on-primary)]/60"
                       }`}
                     >
                       {s.roofline}
                     </div>
                     <div className="font-semibold text-lg leading-tight">
                       {s.title}
                     </div>
                     <div className="mt-2 h-0.5 bg-[var(--md-outline-variant)]/30 rounded-full overflow-hidden">
                       {actualIndex === active ? (
                         <div
                           key={actualIndex}
                           className="h-full bg-[var(--md-on-primary)] animate-progress"
                         />
                       ) : (
                         <div className="h-full bg-[var(--md-outline-variant)]/50" />
                       )}
                     </div>
                   </button>
                 );
               })}
             </div>

             {/* Right Arrow */}
             {navStartIndex < maxStartIndex && (
               <button
                 onClick={scrollNavRight}
                 className="p-2 rounded-full transition-all duration-200 text-[var(--md-on-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)]"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </button>
             )}
           </div>
         </div>
      </div>
    </section>
  );
}