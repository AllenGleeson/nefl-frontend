"use client"

import { useState } from "react"
import Image from "next/image"

const slides = [
    {
        src: "/images/img4.webp",
        alt: "muller on tractor",
    },
    {
        src: "/images/img4.webp",
        alt: "Fifaone day one",
    },
    {
        src: "/images/img4.webp",
        alt: "mdl FOF",
    },
    {
        src: "/images/img4.webp",
        alt: "martino neil visit",
    },
]

export default function MDLGallery() {
    const [current, setCurrent] = useState(0)

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="relative w-full max-w-5xl mx-auto">
            {/* Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[400px] xl:h-[500px] overflow-hidden shadow-lg">
                <Image
                    src={slides[current].src}
                    alt={slides[current].alt}
                    fill
                    className="object-cover transition-all duration-500"
                />
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
                {slides.map((_, i) => (
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