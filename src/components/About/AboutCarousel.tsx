"use client"
import { useState } from "react"
import Image from "next/image"

export default function AboutCarousel() {
    const images = [
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Presention-to-Cathal-1987-1170x650.jpg",
            alt: "Presentation to Cathal 1987",
        },
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1980-1097x650.jpg",
            alt: "1980",
        },
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Shambo-87-1170x650.jpg",
            alt: "Shambo 87",
        },
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1990-pic-1-1170x650.jpg",
            alt: "1990 -1",
        },
        {
            src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/dunderry-panle-90s-1170x650.jpg",
            alt: "Dunderry Panel 90s",
        },
    ]

    const [current, setCurrent] = useState(0)

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1)
    }

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1)
    }

    return (
        <section className="relative w-full max-w-6xl mx-auto mt-0 mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4 lg:px-8">
            {/* Images Container */}
            <div className="relative overflow-hidden border border-[var(--md-outline-variant)] shadow-xl bg-[var(--md-surface-container-low)]">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <div key={index} className="w-full flex-shrink-0 relative aspect-video">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1152px"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-[var(--md-primary)] hover:bg-[var(--md-primary-fixed-dim)] text-[var(--md-on-primary)] rounded-full p-2.5 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10 border border-[var(--md-primary)]"
                    aria-label="Previous slide"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-[var(--md-primary)] hover:bg-[var(--md-primary-fixed-dim)] text-[var(--md-on-primary)] rounded-full p-2.5 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10 border border-[var(--md-primary)]"
                    aria-label="Next slide"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Image Counter Overlay */}
                <div className="absolute bottom-4 right-4 bg-[var(--md-surface-container)]/95 backdrop-blur-sm text-[var(--md-on-surface-variant)] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-[var(--md-outline-variant)]">
                    {current + 1} / {images.length}
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`transition-all duration-200 ${
                            current === index 
                                ? "w-8 h-2.5 sm:w-10 sm:h-3 bg-[var(--md-primary)] shadow-md" 
                                : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[var(--md-outline-variant)] hover:bg-[var(--md-primary)]/50"
                        } rounded-full`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}