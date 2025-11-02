"use client"

import { useState } from "react"
import Image from "next/image"

const images = [
    {
        src: "/images/img4.webp",
        title: "Dressing Room and Club House",
    },
    {
        src: "/images/img4.webp",
        title: "Pitch 1 Grass and Pitch 2 Fifa One Astro",
    },
    {
        src: "/images/img4.webp",
        title: "Small Astros 1,2,4 and 5",
    },
    {
        src: "/images/img4.webp",
        title: "Astro Pitches 2,4,3,6 and 7",
    },
    {
        src: "/images/img4.webp",
        title: "Pitches 2,3 and 4",
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
        <div className="relative w-full max-w-4xl mx-auto mt-6 sm:mt-8">
            {/* ✅ Heading */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 relative inline-block text-[var(--md-on-surface)]">
                Gallery MDL Grounds
                <span className="block w-12 sm:w-16 h-1 bg-[var(--md-primary)] mx-auto mt-2"></span>
            </h2>

            {/* Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden shadow-lg">
                <Image
                    src={images[current].src}
                    alt={images[current].title}
                    fill
                    className="object-cover transition-all duration-500"
                />
            </div>

            {/* Title */}
            <div className="text-center mt-3 sm:mt-4 font-semibold text-sm sm:text-base text-[var(--md-on-surface)]">
                {images[current].title}
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-[var(--md-surface-container)]/90 hover:bg-[var(--md-surface-container)] text-[var(--md-on-surface)] p-2 sm:p-2.5 rounded-full shadow-lg transition-all duration-200"
                aria-label="Previous slide"
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-[var(--md-surface-container)]/90 hover:bg-[var(--md-surface-container)] text-[var(--md-on-surface)] p-2 sm:p-2.5 rounded-full shadow-lg transition-all duration-200"
                aria-label="Next slide"
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-3 sm:mt-4 gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                            i === current ? "bg-[var(--md-primary)]" : "bg-[var(--md-outline-variant)]"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
