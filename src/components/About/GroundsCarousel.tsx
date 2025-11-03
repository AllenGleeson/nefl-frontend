"use client"

import { useState } from "react"
import Image from "next/image"

const images = [
    {
        src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/12/muller-on-tractor-1170x650.jpg",
        title: "Muller on Tractor",
    },
    {
        src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/12/Fifaone-day-one-1024x650.jpg",
        title: "Fifaone Day One",
    },
    {
        src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/12/mdl-FOF-1170x650.jpg",
        title: "MDL FOF",
    },
    {
        src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/12/martino-neil-visit-1170x650.jpg",
        title: "Martino Neil Visit",
    },
]

export default function GroundsCarousel() {
    const [current, setCurrent] = useState(0)

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto mt-6 mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4 lg:px-8">
            {/* Images Container */}
            <div className="relative overflow-hidden border border-[var(--md-outline-variant)] shadow-xl bg-[var(--md-surface-container-low)]">
                <div className="relative w-full aspect-video">
                    <Image
                        src={images[current].src}
                        alt={images[current].title}
                        fill
                        className="object-cover transition-all duration-500 ease-in-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1152px"
                        unoptimized
                    />
                </div>

                {/* Controls and Counter */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                    <button
                        onClick={prevSlide}
                        className="bg-[var(--md-primary)] hover:bg-[var(--md-primary-fixed-dim)] text-[var(--md-on-primary)] rounded-full p-2 sm:p-2.5 shadow-lg transition-all duration-200 hover:scale-110 border border-[var(--md-primary)]"
                        aria-label="Previous slide"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-[var(--md-primary)] hover:bg-[var(--md-primary-fixed-dim)] text-[var(--md-on-primary)] rounded-full p-2 sm:p-2.5 shadow-lg transition-all duration-200 hover:scale-110 border border-[var(--md-primary)]"
                        aria-label="Next slide"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div className="bg-[var(--md-surface-container)]/95 backdrop-blur-sm text-[var(--md-on-surface-variant)] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-[var(--md-outline-variant)]">
                        {current + 1} / {images.length}
                    </div>
                </div>
            </div>

            {/* Title */}
            <div className="text-center mt-4 sm:mt-6 font-semibold text-sm sm:text-base text-[var(--md-on-surface)] bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] p-3 sm:p-4">
                {images[current].title}
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-200 ${i === current
                                ? "w-8 h-2.5 sm:w-10 sm:h-3 bg-[var(--md-primary)] shadow-md"
                                : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[var(--md-outline-variant)] hover:bg-[var(--md-primary)]/50"
                            } rounded-full`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
